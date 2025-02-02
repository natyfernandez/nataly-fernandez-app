import path from "path";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import { Server } from "socket.io";

import { __dirname } from "./dirname.js";
import { viewsRoutes } from "./routes/views.routes.js";
import { productRouter } from "./routes/product.routes.js";
import { cartRouter } from "./routes/cart.routes.js";
import { productsModel } from "./models/products.model.js";
import { error } from "console";

const app = express();
const PORT = 5050;

// Express configuration 
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Handlebars config
app.engine(
    "hbs", 
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: "main",
    })
);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

// Routes
app.use("/", viewsRoutes)
app.use("/products", viewsRoutes)
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Websocket config
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

export const io = new Server(server);

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id)
    
    const handleProducts = async () => {
        try {
            const products = await productsModel.find();
            console.log("Productos obtenidos:", products);
            socket.emit("init", products);
        } catch (error) {
            console.error("Error al obtener los productos:", error);
            socket.emit("error", "No se pudieron obtener los productos");
        }
    };

    handleProducts();

    socket.on("addProduct", async (data) => {
        try {
            const newProduct = await productService.create(data);
            console.log("Producto agregado:", newProduct);

            io.emit("nuevoProducto", newProduct);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            socket.emit("error", "No se pudo agregar el producto");
        }
    });
})

mongoose.connect("mongodb+srv://natyayelenfernandez:Naty191002.@backednaty.7sfpl.mongodb.net/")
    .then(() => console.log("Nos conectamos a la BD correctamente"))
    .catch(() => console.log("Tenemos un error", error) )