export const productsModel = {
    products: [
        {
            id: 1,
            name: 'Macbook Air M1',
            price: 1999,
            description: 'Macbook Air M1',
            productImg: './src/img/mac.jpg',
            quantity: 1
        },
        {
            id: 2,
            name: 'Apple Magic Keyboard',
            price: 499,
            description: 'Apple Magic Keyboard',
            productImg: './src/img/keyboard.jpg',
            quantity: 1
        },
        {
            id: 3,
            name: 'Apple Magic Mouse',
            price: 299,
            description: 'Apple Magic Mouse',
            productImg: './src/img/mouse.jpg',
            quantity: 1
        },

    ],
    getAllProducts: function () {
        return this.products;
    },
    getProductById: function (id) {
        return this.products.find(product => product.id === id);
    }
}

