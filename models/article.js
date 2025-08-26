const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  designation: { type: String, required: true, unique: true },
  prix: { type: Number },
  marque: { type: String, required: true },
  qtestock: { type: Number },
  imageart: { type: String },
  scategorieID: { type: mongoose.Schema.Types.ObjectId, ref: "scategorie" } // ✅
}, { timestamps: true });

module.exports = mongoose.model('article', articleSchema);
