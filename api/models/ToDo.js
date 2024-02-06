const mongoose = require('mongoose');

const ToDoSchema = mongoose.Schema(
    {
        name : String
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('ToDo' , ToDoSchema );