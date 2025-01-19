import { Router } from "express";
import { productService } from "../services/product.service.js";
import { io } from './../server.js';
import { uploader } from './../middlewares/multer.middleware.js';

export const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const products = await productService.getAll();

    res.status(200).json(products);
});

productRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    const products = await productService.getById({ id });

    if (!products) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
});

productRouter.post("/", uploader.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Imagen requerida" });
    }

    console.log(req.file);

    const { title, description, code, price, status, stock, category} = req.body;
    const thumbnail = `/assets/img/${req.file.filename}`; 

    try {
        const product = await productService.create({ title, description, code, price, status, stock, category, thumbnail });

        res.status(201).json(product);
        io.emit("nuevoProducto:", product)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

productRouter.put("/:id", async (req, res) => {
    const { id } = req.params;

    const { title, description, code, price, status, stock, category, thumbnail } = req.body;

    try {
        const product = await productService.update({ id, title, description, code, price, status, stock, category, thumbnail });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

productRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const product = await productService.delete({ id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});