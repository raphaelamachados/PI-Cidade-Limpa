
module.exports = (sequelize, DataTypes) => {
    const material = sequelize.define(
      "Material",
      {
        tipo: DataTypes.STRING,
        pontos_por_peso: DataTypes.NUMBER,
      },
      {
        tableName: "material",
        timestamps: false,
      }
    );
    material.associate = (models) => {
      material.hasMany(models.Item, {
      foreignKey: "meterial_id",
      
    })
  }
  
    return material
}