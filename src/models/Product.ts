import mongoose, { Schema, models } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const ProductSchema = new Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        title: {
            type: String,
            required: [true, "El título es obligatorio"],
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: [true, "El precio es obligatorio"],
        },
        stock: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            required: [true, "La imagen es obligatoria"],
        },
        category: {
            type: String,
            default: "general",
        },
    },
    {
        timestamps: true,
    }
);

export default models.Product || mongoose.model("Product", ProductSchema);
