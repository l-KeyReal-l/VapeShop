class ProductPage {
    constructor() {
        this.productId = this.getProductIdFromURL();
        this.products = products; // Из products.js
        this.init();
    }

    getProductIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return parseInt(urlParams.get('id')) || 1;
    }

    init() {
        this.loadProduct();
        this.setupEventListeners();
    }

    loadProduct() {
        const product = this.products.find(p => p.id === this.productId);
        if (!product) {
            window.location.href = 'index.html';
            return;
        }

        // Заполняем информацию о товаре
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productPrice').textContent = product.price + ' руб.';
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productImage').src = product.image;
        document.getElementById('productImage').alt = product.name;

        // Характеристики
        this.renderSpecs(product);
        
        // Похожие товары
        this.renderSimilarProducts(product);
        
        // Настройка кнопок
        document.getElementById('addToCartBtn').onclick = () => this.addToCart(product);
    }

    renderSpecs(product) {
        const specs = {
            'Бренд': product.brand,
            'Категория': this.getCategoryName(product.category),
            'Артикул': `VAPE-${product.id.toString().padStart(3, '0')}`,
            'Наличие': 'В наличии'
        };

        const specsGrid = document.getElementById('productSpecs');
        specsGrid.innerHTML = Object.entries(specs).map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-key">${key}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');
    }

    getCategoryName(category) {
        const categories = {
            'vape': 'Электронные сигареты',
            'liquid': 'Жидкости', 
            'mod': 'Моды',
            'atomizer': 'Атомайзеры',
            'accessory': 'Аксессуары'
        };
        return categories[category] || category;
    }

    renderSimilarProducts(currentProduct) {
        const similar = this.products
            .filter(p => p.id !== currentProduct.id && p.category === currentProduct.category)
            .slice(0, 4); // Макс 4 похожих товара

        const similarGrid = document.getElementById('similarGrid');
        similarGrid.innerHTML = similar.map(product => `
            <div class="similar-card" onclick="window.location.href='product.html?id=${product.id}'">
                <div class="similar-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="similar-info">
                    <h4>${product.name}</h4>
                    <div class="similar-price">${product.price} руб.</div>
                </div>
            </div>
        `).join('');
    }

    addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`);
    }

    setupEventListeners() {
        // Карусель похожих товаров
        document.getElementById('similarPrev').addEventListener('click', () => this.scrollSimilar(-1));
        document.getElementById('similarNext').addEventListener('click', () => this.scrollSimilar(1));
    }

    scrollSimilar(direction) {
        const grid = document.getElementById('similarGrid');
        const scrollAmount = 300;
        grid.scrollLeft += direction * scrollAmount;
    }
}

// Инициализация
const productPage = new ProductPage();
