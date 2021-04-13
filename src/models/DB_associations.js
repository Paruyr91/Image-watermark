const Product= require('./product')
const Store=require('./store')

Store.hasMany(Product,{
    foreignKey: {
        name: 'store_id',
        allowNull: false
    }, 
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    });

Product.belongsTo(Store,{
    foreignKey: {
    name: 'store_id',
    allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


const DB = {
    Store,
    Product,
}

module.exports = DB