const products = [
  {
    id: 1,
    title: "React.js",
    category: "frontend",
    createdAt: "2022-05-13T12:01:28.000Z",
  },
  {
    id: 2,
    title: "Node.js",
    category: "backend",
    createdAt: "2022-04-13T12:01:28.000Z",
  },
  {
    id: 3,
    title: "javascript",
    category: "frontend",
    createdAt: "2022-03-13T12:01:28.000Z",
  },
];

const categories = [
  {
    id: 1,
    title: "frontend",
    description: "frontend of applications",
    createdAt: "2020-03-13T12:01:28.000Z",
  },
  {
    id: 2,
    title: "backend",
    description: "the backend of applications",
    createdAt: "2019-03-13T12:01:28.000Z",
  },
];

export default class Storage {
  static getAllCategories() {
    const savedCategories = JSON.parse(localStorage.getItem("category")) || [];

    const sortedCategories = savedCategories.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
    return sortedCategories;
  }

  static saveCategory(categoryToSave) {
    const savedCategories = Storage.getAllCategories();
    const existedItem = savedCategories.find((c) => c.id === categoryToSave.id);
    if (existedItem) {
      //edit
      existedItem.title = categoryToSave.title;
      existedItem.description = categoryToSave.description;
    } else {
      //new
      categoryToSave.id = new Date().getTime();
      categoryToSave.createdAt = new Date().toISOString();
      savedCategories.push(categoryToSave);
    }

    localStorage.setItem("category", JSON.stringify(savedCategories));
  }

  static getAllProducts() {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    return savedProducts.sort((a, b) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
    });
  }

  static saveProducts(productToSave) {
    const savedCategories = Storage.getAllProducts();
    const existedItem = savedCategories.find((c) => c.id === productToSave.id);
    if (existedItem) {
      //edit
      existedItem.title = productToSave.title;
      existedItem.quantity = productToSave.quantity;
      existedItem.category = productToSave.category;
    } else {
      //new
      productToSave.id = new Date().getTime();
      productToSave.createdAt = new Date().toISOString();
      savedCategories.push(productToSave);
    }

    localStorage.setItem("products", JSON.stringify(savedCategories));
  }
}
