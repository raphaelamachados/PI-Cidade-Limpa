const { Usuario } = require('../models')
const Bcrypt = require('bcrypt')
const fs = require('fs')

const userController = {
    create: async (_req, res) => {
        res.render("cadastro")
    },
   
    store: async(req,res) => {
        const {file } = req

        if (req.body.cadastroEmpresa){
            return res.send(req.body)
        }else{
            return res.send(req.body)
        }
        // const { name, cpf, email, password, } = req.body
        
        // const usuario = await Usuario.create({
        //     nome: name,
        //     cpf: cpf,
        //     email: email,
        //     senha: Bcrypt.hashSync(password, 10),
        //     imagem: file.filename, 
        // })

        // if (email === usuario.email){
        //     return alert("Usuário já cadastrado")
        //     // return res.send("Email já cadastrado")
            
        // }

        // if(!usuario) {
        //     fs.unlinkSync(file.path)
        //     return res.send("houve um erro ao salvar o usuario")
        // } 

       
        // return res.redirect("/login")
    },
}

module.exports = userController