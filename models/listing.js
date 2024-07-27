const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: {
            type: String,
            //required: true,
        },
        url: {
            type: String,
            //required: true,
            default: "https://www.istockphoto.com/photo/the-beach-gm157579910-12329108",
            set: (v) => v === "" ? "https://www.istockphoto.com/photo/the-beach-gm157579910-12329108" : v,
        }
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', ListingSchema);
module.exports = Listing;
