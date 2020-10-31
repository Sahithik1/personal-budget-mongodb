const mongoose = require("mongoose")

const budgetSchema = new mongoose.Schema({
    title :{
        type: String,
        required : true,
        trim: true
    },
    budget :{
        type : Number,
        required : true,        
    },
    color:{
        type: String,
        required: true,
        match: [/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'Invalid Color']
    }   
}, { collection: 'myBudget'})

module.exports = mongoose.model('myBudget',budgetSchema)
