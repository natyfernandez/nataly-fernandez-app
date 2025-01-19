import { Router } from "express";
import { productService } from "../services/product.service.js";

export const viewsRoutes = Router()

viewsRoutes.get("/", async (req, res) => {
    const products = await productService.getAll();
    res.render("home", {products, title: "Home", homeUrl: "#", productsUrl: "/realtimeproducts"});
});

viewsRoutes.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {title: "Products", homeUrl: "/", productsUrl: "#"});
});