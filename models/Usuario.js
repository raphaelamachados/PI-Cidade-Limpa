
module.exports = (sequelize, DataTypes) => {
    const usuario = sequelize.define(
      "Usuario",
      {
        nome: DataTypes.STRING,
        cpf: {
          type: DataTypes.STRING,
          unique: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        senha: DataTypes.STRING,
        imagem: DataTypes.STRING,
        pontuacao: DataTypes.NUMBER,
     
      },
      {
        tableName: "usuario",
        timestamps: true,
      }
    );

    usuario.associate = (models) => {
      usuario.hasMany(models.Pedido, {
      foreignKey: "usuario_id",
      
    })
      usuario.hasMany(models.Voucher, {
      foreignKey: "usuario_id",
      
    })
  }
  
    return usuario
}