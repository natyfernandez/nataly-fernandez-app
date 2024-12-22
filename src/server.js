import express from "express";
import { productRouter } from "./routes/product.routes.js";
import { cartRouter } from "./routes/cart.routes.js";

const app = express();
const PORT = 5050;

// Express configuration 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// App listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})