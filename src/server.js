import { productService } from "./services/product.service";
import express from "express";
import { productRouter } from "./routes/product.routes";

const app = express();
const PORT = 8080;

// Express configuration 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/products", productRouter);

// App listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})