import { Router } from "express";
import { cartService } from "../services/cart.service.js";

export const cartRouter = Router();

cartRouter.post("/", async (req, res) => {
    try {
        const newCart = await cartService.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el carrito" });
    }
});

cartRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartService.getById(cid);

        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        res.status(200).json(cart.products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el carrito" });
    }
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const updatedCart = await cartService.addProductToCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});