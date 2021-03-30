const {Item, Usuario, Material, Pedido} = require('../models')
const fs = require('fs')




const empresaController = {
 
  create: async (req, res) => {

    // recebendo o cpf do front para ligar com o ID do cliente que está no banco de dados 
    const {cpf} = req.query
    let usuario 
    if(cpf){
      usuario = await Usuario.findOne({ 
        where: {
          cpf: cpf,
        }
      })
    }
    // buscanco o material do banco de dados para e exportando para o front para apresentar no cadastro de pedido no furmulário
    const materiais = await Material.findAll()
    res.render("perfilEmpresa", {materiais, usuario})

  },

  store: async (req, res) => {
    const {idCliente, material, peso, listMateriais, listPeso } = req.body
    console.log(listMateriais, listPeso)

    
    
    const pedido = await Pedido.create({
      usuario_id: idCliente
    })

    const itens = listMateriais.map( (material, index) => {
      return {material_id: material, peso: listPeso[index],  pedido_id: pedido.id }
    })

    console.log(itens)
    const item = await Item.bulkCreate(itens)

    let pontosPorPeso = []
   

    listMateriais.forEach (async material => {
      const tabelaMaterial = await Material.findByPk(material) 
      pontosPorPeso.push(tabelaMaterial.pontos_por_peso)
    })

    let pontuacao = 0

    listPeso.forEach((peso, index)=> {
      pontuacao += pontosPorPeso[index] * peso
    })

    const tabelaUsuario = await Usuario.findByPk(idCliente) 


    await Usuario.update({
      pontuacao: tabelaUsuario.pontuacao + pontuacao
      
    }, {
      where: {
        id: idCliente
      }
    }) 


    if(!item){
      return res.send('Houve um erro ao cadastrar o pedido')
    }
    return res.redirect('/perfilEmpresa')
    console.log(item)
  },
  
};



module.exports = empresaController;