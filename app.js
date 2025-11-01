
// Основное приложение //NEW PIECE
class VapeShop {
    constructor() {
    this.products = products;
    this.filteredProducts = [...products];
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    this.currentPage = 1;
    this.productsPerPage = 8;
    this.currentSort = 'default';
    this.currentLang = localStorage.getItem('language') || 'ru';
    this.filters = {
        categories: [],
        brands: [],
        minPrice: 0,
        maxPrice: Number.MAX_SAFE_INTEGER
    };

    this.init();
}

translate(key) {
    return translations[this.currentLang][key] || key;
}

changeLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updateUI();
}

updateUI() {
    // Header
    document.getElementById('search').placeholder = this.translate('searchPlaceholder');
    document.getElementById('authBtn').textContent = this.translate('login');
    document.getElementById('registerBtn').textContent = this.translate('register');
    
    // Обновляем выпадающее меню
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems[0].textContent = this.translate('catalog');
    dropdownItems[1].textContent = this.translate('orders');
    dropdownItems[2].textContent = this.translate('favorites');
    dropdownItems[3].textContent = this.translate('profile');
    
    // Sidebar
    document.querySelectorAll('.filter-section h4')[0].textContent = this.translate('categories');
    document.querySelectorAll('.filter-section h4')[1].textContent = this.translate('brands');
    document.querySelectorAll('.filter-section h4')[2].textContent = this.translate('price');
    document.getElementById('applyFilters').textContent = this.translate('apply');
    document.getElementById('clearFilters').textContent = this.translate('clear');
    document.getElementById('minPrice').placeholder = this.translate('minPrice');
    document.getElementById('maxPrice').placeholder = this.translate('maxPrice');
    
    // Toolbar
    document.querySelector('.toolbar div strong').textContent = this.translate('found');
    document.querySelector('label').innerHTML = this.translate('sort') + ': <select id="sort">...</select>';
    
    // Обновляем селект сортировки
    const sortSelect = document.getElementById('sort');
    sortSelect.innerHTML = `
        <option value="default">${this.translate('sortDefault')}</option>
        <option value="price-asc">${this.translate('sortPriceAsc')}</option>
        <option value="price-desc">${this.translate('sortPriceDesc')}</option>
        <option value="name">${this.translate('sortName')}</option>
    `;
    
    // Модальные окна
    document.querySelector('#authModal h2').textContent = this.translate('loginTitle');
    document.querySelector('#registerModal h2').textContent = this.translate('registerTitle');
    document.querySelector('#cartModal h2').textContent = this.translate('cart');
    
    // Перерендериваем товары чтобы обновить кнопки
    this.renderProducts();
    this.renderCart();

    
}





    init() {
    this.renderBrandFilters();
    this.renderProducts();
    this.setupEventListeners();
    this.updateCartCount();
    this.startCarousel();
    this.updateUI(); // Добавь эту строку!
    
    // Установка выбранного языка
    document.getElementById('languageSelect').value = this.currentLang;
}

    // Рендер фильтров брендов
    renderBrandFilters() {
        const brandFilters = document.getElementById('brandFilters');
        brandFilters.innerHTML = brands.map(brand => `
            <label>
                <input type="checkbox" value="${brand}"> ${brand}
            </label>
        `).join('');
    }

    // Рендер товаров
    renderProducts() {
        const grid = document.getElementById('productGrid');
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

        if (productsToShow.length === 0) {
            grid.innerHTML = `
                <div class="empty" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                    <h3>Товары не найдены</h3>
                    <p>Попробуйте изменить параметры фильтрации</p>
                </div>
            `;
        } else {
            grid.innerHTML = productsToShow.map(product => `
                <div class="card" data-product-id="${product.id}">
                    <div class="media">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badges.map(badge => `<span class="badge ${badge}">${badge}</span>`).join('')}
                    </div>
                    <div class="body">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <div class="price">${product.price} руб.</div>
                        <div class="actions">
                            <button class="btn btn-primary" onclick="shop.addToCart(${product.id})">
                                В корзину
                            </button>
                            
<button class="btn btn-ghost" onclick="shop.quickView(${product.id})">
    Быстрый просмотр
</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        this.updateResultsCount();
        this.renderPagination();
    }

    // Пагинация
    renderPagination() {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        const pagination = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';
        
        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" onclick="shop.changePage(${this.currentPage - 1})">‹</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="page-btn active">${i}</button>`;
            } else {
                paginationHTML += `<button class="page-btn" onclick="shop.changePage(${i})">${i}</button>`;
            }
        }

        // Next button
        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" onclick="shop.changePage(${this.currentPage + 1})">›</button>`;
        }

        pagination.innerHTML = paginationHTML;
    }
    changePage(page) {
        this.currentPage = page;
        this.renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Обновление счетчика результатов
    updateResultsCount() {
        document.getElementById('resultsCount').textContent = this.filteredProducts.length;
    }

    // Поиск и фильтрация
    setupEventListeners() {
        // Поиск
        document.getElementById('search').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Добавь в setupEventListeners():NEW PIECE
document.getElementById('languageSelect').addEventListener('change', (e) => {
    this.changeLanguage(e.target.value);
});

        // Фильтры категорий
        document.querySelectorAll('#catFilters input').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Фильтры брендов
        document.querySelectorAll('#brandFilters input').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.applyFilters());
        });

        // Фильтры цены
        document.getElementById('applyFilters').addEventListener('click', () => this.applyFilters());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());

        // Сортировка
        document.getElementById('sort').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.applySorting();
            this.renderProducts();
        });

        // Корзина
        document.getElementById('cartFab').addEventListener('click', () => this.openCart());
        document.getElementById('cartClose').addEventListener('click', () => this.closeCart());
        document.getElementById('clearCartBtn').addEventListener('click', () => this.clearCart());

        // Авторизация
        document.getElementById('authBtn').addEventListener('click', () => this.openAuthModal());
        document.getElementById('authClose').addEventListener('click', () => this.closeAuthModal());
        document.getElementById('registerBtn').addEventListener('click', () => this.openRegisterModal());
        document.getElementById('registerClose').addEventListener('click', () => this.closeRegisterModal());

        // Выпадающее меню
        document.querySelector('.dots-menu button').addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelector('.dropdown-content').classList.toggle('show');
        });

        // Закрытие выпадающего меню при клике вне
        document.addEventListener('click', () => {
            document.querySelector('.dropdown-content').classList.remove('show');
        });

        // Карусель
        document.getElementById('prev').addEventListener('click', () => this.prevSlide());
        document.getElementById('next').addEventListener('click', () => this.nextSlide());
    }

    handleSearch(searchTerm) {
        if (searchTerm.length === 0) {
            this.filteredProducts = [...this.products];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredProducts = this.products.filter(product => 
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term) ||
                product.brand.toLowerCase().includes(term)
            );
        }
        this.currentPage = 1;
        this.applySorting();
        this.renderProducts();
    }

    applyFilters() { // NEW PIECE 
    // Сбор выбранных категорий
    const selectedCategories = [];
    document.querySelectorAll('#catFilters input:checked').forEach(checkbox => {
        selectedCategories.push(checkbox.value);
        
    });
    

    // Сбор выбранных брендов
    const selectedBrands = [];
    document.querySelectorAll('#brandFilters input:checked').forEach(checkbox => {
        selectedBrands.push(checkbox.value);
    });

    // Цены
    const minPrice = document.getElementById('minPrice').value ? 
        parseInt(document.getElementById('minPrice').value) : 0;
    const maxPrice = document.getElementById('maxPrice').value ? 
        parseInt(document.getElementById('maxPrice').value) : Number.MAX_SAFE_INTEGER;

    this.filters = {
        categories: selectedCategories,
        brands: selectedBrands,
        minPrice,
        maxPrice
    };

    this.filteredProducts = this.products.filter(product => {
        // Фильтр по категориям
        if (this.filters.categories.length > 0 && !this.filters.categories.includes(product.category)) {
            return false;
        }

        // Фильтр по брендам
        if (this.filters.brands.length > 0 && !this.filters.brands.includes(product.brand)) {
            return false;
        }

        // Фильтр по цене - ФИКС
        if (product.price < this.filters.minPrice) {
            return false;
        }
        if (product.price > this.filters.maxPrice) {
            return false;
        }

        return true;
    });

    this.currentPage = 1;
    this.applySorting();
    this.renderProducts();
    
    // ФИКС: Прокрутка к верху контента, а не всего сайта
    document.querySelector('.content').scrollIntoView({ behavior: 'smooth' });
}

//NEW PIECE
showCatalog() {
    // Прокрутка к фильтрам каталога
    document.querySelector('.sidebar').scrollIntoView({ behavior: 'smooth' });
    // Можно добавить анимацию или подсветку
    document.querySelector('.sidebar').style.boxShadow = '0 0 0 2px #e74c3c';
    setTimeout(() => {
        document.querySelector('.sidebar').style.boxShadow = '';
    }, 2000);
}
    clearFilters() {
        // Сброс чекбоксов
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Сброс цен
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';

        // Сброс фильтров
        this.filters = {
            categories: [],
            brands: [],
            minPrice: null,
            maxPrice: null
        };

        this.filteredProducts = [...this.products];
        this.currentPage = 1;
        this.applySorting();
        this.renderProducts();
    }

    applySorting() {
        switch (this.currentSort) {
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // По умолчанию - оригинальный порядок
                break;
        }
    }

    // Корзина
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} добавлен в корзину!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        if (document.getElementById('cartModal').style.display === 'flex') {
            this.renderCart();
        }
    }

    updateQuantity(productId, change) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.saveCart();
                this.updateCartCount();
                this.renderCart();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.renderCart();
        this.showNotification('Корзина очищена');
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    updateCartCount() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cartCount').textContent = totalItems;
    }

    openCart() {
        this.renderCart();
        document.getElementById('cartModal').style.display = 'flex';
    }

    closeCart() {
        document.getElementById('cartModal').style.display = 'none';
    }

    renderCart() {
        const cartItems = document.getElementById('cartItems');
        
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p class="empty">Корзина пуста</p>';
            document.getElementById('cartTotal').textContent = '0';
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartItems.innerHTML = this.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${item.price} руб. × ${item.quantity}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-btn" onclick="shop.updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="shop.updateQuantity(${item.id}, 1)">+</button>
                    <button class="btn btn-ghost" onclick="shop.removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        `).join('');

        document.getElementById('cartTotal').textContent = total;
    }

    // Модальные окна
    openAuthModal() {
        document.getElementById('authModal').style.display = 'flex';
    }

    closeAuthModal() {
        document.getElementById('authModal').style.display = 'none';
    }

    openRegisterModal() {
        document.getElementById('registerModal').style.display = 'flex';
    }

    closeRegisterModal() {
        document.getElementById('registerModal').style.display = 'none';
    }

    // Просмотр товара
    viewProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        // Здесь можно добавить модальное окно с деталями товара
        this.showNotification(`Просмотр товара: ${product.name}`);
    }

    // Карусель
    startCarousel() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel .slide');
        this.showSlide(0);
        setInterval(() => this.nextSlide(), 5000);
    }

    showSlide(n) {
        this.slides.forEach(slide => slide.style.display = 'none');
        this.slides[n].style.display = 'block';
        this.currentSlide = n;
    }

    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.slides.length) next = 0;
        this.showSlide(next);
    }

    prevSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) prev = this.slides.length - 1;
        this.showSlide(prev);
    }

    // Уведомления
    showNotification(message) {
        // Создаем временное уведомление
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
        
    }

    quickView(productId) {
    const product = this.products.find(p => p.id === productId);
    const modalContent = `
        <div class="quick-view">
            <div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
                <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 200px; object-fit: contain; border-radius: 8px; background: #f8f9fa; padding: 20px;">
                <div style="flex: 1; min-width: 250px;">
                    <h3 style="margin: 0 0 10px 0; color: #2d3748;">${product.name}</h3>
                    <p style="color: #718096; margin-bottom: 15px;">${product.description}</p>
                    <div style="font-size: 24px; color: #2b6cb0; margin: 10px 0; font-weight: bold;">${product.price} руб.</div>
                    <div style="margin: 15px 0;">
                        <strong>Бренд:</strong> ${product.brand}<br>
                        <strong>Категория:</strong> ${this.getCategoryName(product.category)}
                    </div>
                    <div class="quick-actions" style="display: flex; gap: 10px; margin-top: 20px;">
                        <button class="btn btn-primary" onclick="shop.addToCart(${product.id}); shop.closeQuickView()">
                            Добавить в корзину
                        </button>
                        <button class="btn btn-ghost" onclick="shop.closeQuickView()">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    this.showCustomModal(modalContent);
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

showCustomModal(content) {
    // Закрываем предыдущие модалки
    const existingModal = document.querySelector('.modal-backdrop.quick-view-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop quick-view-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width: 700px;">
            <button class="close" onclick="shop.closeQuickView()">✕</button>
            ${content}
        </div>
    `;
    document.body.appendChild(modal);
}

closeQuickView() {
    const modal = document.querySelector('.modal-backdrop.quick-view-modal');
    if (modal) {
        modal.remove();
    }
}

}

// Инициализация приложения
const shop = new VapeShop();

// Закрытие модальных окон при клике вне
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        e.target.style.display = 'none';
    }
});
// Предотвращение закрытия при клике на само модальное окно
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    

});

