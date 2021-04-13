const { DataTypes } = require('sequelize');
const sequelize = require('./index')

const Product = sequelize.define("product", {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
    }

});


module.exports = Product
