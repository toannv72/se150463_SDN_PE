const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.plugin(slug)

const User = new Schema({
    username: { type: String, unique: true},
    password: { type: String },
  
},
     {
        timestamps: true
    }
)

module.exports = mongoose.model('members', User);

