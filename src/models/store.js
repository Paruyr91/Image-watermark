const { DataTypes } = require('sequelize');
const sequelize = require('./index')

const Store = sequelize.define("store", {
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    watermark_image: {
        type: DataTypes.STRING,
        allowNull: true,
    }

});


module.exports = Store

