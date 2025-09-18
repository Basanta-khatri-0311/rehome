const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    hostel: { type: String },
    image: { type: String }, 
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
