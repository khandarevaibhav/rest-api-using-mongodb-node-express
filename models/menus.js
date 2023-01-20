const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
},{ timestamps: true}); 

const Menu = mongoose.model('menus', menuSchema);
module.exports=Menu;