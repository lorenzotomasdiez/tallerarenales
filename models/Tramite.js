const { Schema, model } = require('mongoose')
const TramitesSchema = Schema({
    name:{
        type: String
    },
    plate:{
        type: String
    },
    description:{
        type: String
    },
    amount:{
        type: Number
    },
    prepay:{
        type: Number
    },
    topay:{
        type: Number
    },
    phone:{
        type: String
    },
    date:{
        type: Date
    },
    isComplete:{
        type: Boolean
    },
    isPaid:{
        type:Boolean
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    isImportant:{
        type:Boolean
    },
    links:{
        type:Array
    }
})

//Modifying toJSON method
TramitesSchema.method('toJSON', function(){
    const { __v , _id, ...object} = this.toObject()
    object.id = _id
    return object
})

module.exports = model('Tramite', TramitesSchema)