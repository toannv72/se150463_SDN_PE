const mongoose = require('mongoose');
const MongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const productsSchema = new Schema({
    productName: { type: String, require: true ,unique: true,},
    price: { type: Number, require: true },
    image: { type: String, require: true },
    description: { type: String, require: true },
    bestseller: { type: Boolean, default: false },
    rating: { type: Number, min: 1, max: 5, require: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Categories", require: true },
}, { timestamps: true, });

productsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('products', productsSchema);

