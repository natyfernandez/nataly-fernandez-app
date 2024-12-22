import fs from "fs"
import { v4 as uuid } from "uuid"

class CartService {
    path;
    carts;

    constructor({ path }) {
        this.path = path;

        if(fs.existsSync(path)) {
            try{
                this.carts = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            } catch (error) {
                this.carts = [];
            }
        } else {
            this.carts = [];
        }
    }

    async getById(cid) {
        const cart = this.carts.find((cart) => cart.id === cid);
        return cart;
    }    

    async createCart() {
        const id = uuid();
    
        if (this.carts.some((cart) => cart.id === id)) {
            throw new Error("Ya existe un carrito con ese ID");
        }
    
        const newCart = {
            id,
            products: [],
        };
    
        this.carts.push(newCart);
    
        try {
            await this.saveOnFile();
            return newCart;
        } catch (error) {
            console.error("Error al guardar el carrito:", error.message);
            throw new Error("No se pudo guardar el carrito");
        }
    }    

    async addProductToCart(cid, pid) {
        const cart = this.carts.find((cart) => cart.id === cid);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const existingProduct = cart.products.find((p) => p.product === pid);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await this.saveOnFile();
        return cart;
    }

    async saveOnFile() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error("Error al guardar en el archivo:", error.message);
            throw new Error("Error al escribir en el archivo");
        }
    }    
}

export const cartService = new CartService({
    path: './src/db/carts.json',
})