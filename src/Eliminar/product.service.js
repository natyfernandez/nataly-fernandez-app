import fs from "fs"
import { v4 as uuid } from "uuid"

class ProductService {
    path;
    products;

    constructor({ path }) {
        this.path = path;

        if(fs.existsSync(path)) {
            try{
                this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.products = [];
            }
        } else {
            this.products = [];
        }
    }

    async getAll() {
        return this.products;
    }
    
    async getById({ id }){
        const product = this.products.find((products) => product.id === id);
        return product;
    }
    
    async create({ title, description, code, price, status, stock, category, thumbnail }){
        const id = uuid();

        if (this.products.some((product) => product.id === id)) {
            throw new Error("Ya existe un producto con ese id");
        }

        const product = {
            id,
            title,
            description,
            code, 
            price,
            status,
            stock,
            category,
            thumbnail,
        };

        this.products.push(product);

        try {
            await this.saveOnFile();
            return product;
        } catch (error) {
            console.error("Error al guardar el producto:", error.message);
            throw new Error("Error al guardar el producto");
        }
    }
    
    async update({ id, title, description, code, price, status, stock, category, thumbnail }){
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            return null;
        }
    
        product.title = title ?? product.title;
        product.description = description ?? product.description;
        product.code = code ?? product.code;
        product.price = price ?? product.price;
        product.status = status ?? product.status;
        product.stock = stock ?? product.stock;
        product.category = category ?? product.category;
        product.thumbnail = thumbnail ?? product.thumbnail;

        const index = this.products.findIndex((product) => product.id === id);

        this.products[index] = product;

        try {
            await this.saveOnFile();
            return product;
        } catch (error) {
            console.error("Error al actualizar el producto:", error.message);
            throw new Error("Error al actualizar el producto");
        }
    }
    
    async delete({ id }){
        const product = this.products.find((product) => product.id === id);

        if (!product) {
            return null;
        }

        const index = this.products.findIndex((product) => product.id === id);

        this.products.splice(index, 1);

        try {
            await this.saveOnFile();
            return product;
        } catch (error) {
            console.error("Error al eliminar el producto:", error.message);
            throw new Error("Error al eliminar el producto");
        }
    }

    async saveOnFile() {
        try {
            await fs.promises.writeFile(
                this.path, 
                JSON.stringify(this.products, null, 2)
            );
        } catch (error) {
            console.error("Error al guardar el producto:", error.message);
            throw new Error("Error al guardar el producto");
        }
    }
}

export const productService = new ProductService({
    path: './src/db/products.json',
})