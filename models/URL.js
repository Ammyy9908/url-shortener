const {model,Schema} = require('mongoose');

const URLSchema = new Schema({
    url:{
        type: 'string',
        required: true,
    },
    shorten_id:{
        type: 'string',
        required: true,
    }
});


module.exports = model('url',URLSchema);