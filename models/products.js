import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  imagen: { type: String },
  descripcion: { type: String },
  precio: { type: Number },
  talles: [{ type: String }], // array de talles
  envio: { type: String },
  mediosDePago: [{ type: String }], // array de medios de pago

  categories: [{type: Schema.Types.ObjectId, ref: "Category"}]
});

export default mongoose.model("Product", productSchema, "Products");