import { Router } from "express";
import { productsModel } from "../models/products.model.js";

export const viewsRoutes = Router()

viewsRoutes.get("/", async (req, res) => {
    const products = await productsModel.find();
    res.render("home", {products, title: "Home", homeUrl: "#", productsUrl: "/realtimeproducts"});
});

viewsRoutes.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts", {title: "Products", homeUrl: "/", productsUrl: "#"});
});