import { Router } from "express";
import { productService } from "../services/product.service.js";

export const viewsRoutes = Router()

viewsRoutes.get("/", async (req, res) => {
    const products = await productService.getAll();
    res.render("home", {products});
});

viewsRoutes.get("/products", async (req, res) => {
    res.render("realTimeProducts");
});