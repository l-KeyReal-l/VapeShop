// База данных товаров
const products = [
    {
        id: 1,
        name: "Vape Pro 2000",
        price: 2999,
        category: "vape",
        brand: "VapeMaster",
        image: "https://via.placeholder.com/300x300/ecf0f1/2c3e50?text=Vape+Pro",
        description: "Современная электронная сигарета с длительным сроком службы",
        badges: ["new", "popular"]
    },
    {
        id: 2,
        name: "Fruit Mix Liquid",
        price: 499,
        category: "liquid",
        brand: "JuiceBox",
        image: "https://via.placeholder.com/300x300/e74c3c/fff?text=Fruit+Liquid",
        description: "Фруктовая смесь с насыщенным вкусом",
        badges: ["sale"]
    },
    {
        id: 3,
        name: "Power Mod X",
        price: 4599,
        category: "mod",
        brand: "VapeTech",
        image: "https://via.placeholder.com/300x300/3498db/fff?text=Power+Mod",
        description: "Мощный мод с регулируемой мощностью",
        badges: ["new"]
    },
    {
        id: 4,
        name: "Cloud Atomizer",
        price: 1299,
        category: "atomizer",
        brand: "CloudMaster",
        image: "https://via.placeholder.com/300x300/2ecc71/fff?text=Cloud+Atom",
        description: "Атомайзер для плотного пара",
        badges: []
    },
    {
        id: 5,
        name: "Starter Kit Basic",
        price: 1999,
        category: "vape",
        brand: "VapeMaster",
        image: "https://via.placeholder.com/300x300/9b59b6/fff?text=Starter+Kit",
        description: "Набор для начинающих",
        badges: ["sale"]
    },
    {
        id: 6,
        name: "Menthol Ice Liquid",
        price: 449,
        category: "liquid",
        brand: "IceFlow",
        image: "https://via.placeholder.com/300x300/1abc9c/fff?text=Menthol+Ice",
        description: "Освежающий ментол с ледяным эффектом",
        badges: []
    },
    {
        id: 7,
        name: "Advanced Mod Pro",
        price: 5999,
        category: "mod",
        brand: "VapeTech",
        image: "https://via.placeholder.com/300x300/e67e22/fff?text=Advanced+Mod",
        description: "Профессиональный мод с расширенными настройками",
        badges: ["new"]
    },
    {
        id: 8,
        name: "Charging Cable",
        price: 299,
        category: "accessory",
        brand: "VapeMaster",
        image: "https://via.placeholder.com/300x300/95a5a6/fff?text=USB+Cable",
        description: "USB кабель для зарядки",
        badges: []
    }
];

// Бренды для фильтров
const brands = ["VapeMaster", "JuiceBox", "VapeTech", "CloudMaster", "IceFlow"];

// Категории для фильтров
const categories = [
    { value: "vape", label: "Электронные сигареты" },
    { value: "liquid", label: "Жидкости" },
    { value: "mod", label: "Моды" },
    { value: "atomizer", label: "Атомайзеры" },
    { value: "accessory", label: "Аксессуары" }
];
