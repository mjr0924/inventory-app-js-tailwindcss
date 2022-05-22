import Storage from "./Storage.js";

const addNewProductBtn = document.querySelector("#add-new-product");
const searchInput = document.querySelector("#search-input");
const selectedSort = document.querySelector("#sort-products");

class ProductView {
  constructor() {
    addNewProductBtn.addEventListener("click", (e) => this.addNewProduct(e));
    searchInput.addEventListener("input", (e) => this.searchProducts(e));
    selectedSort.addEventListener("change", (e) => this.sortProducts(e));
    this.products = [];
  }

  setApp() {
    this.products = Storage.getAllProducts();
  }

  setYear() {
    const year = document.querySelector(".year");
    let x = new Date().getFullYear();
    year.innerHTML = x;
  }

  countProduct() {
    const countProduct = document.querySelector("#count-product");
    countProduct.innerHTML = Storage.getAllProducts().length;
  }

  addNewProduct(e) {
    e.preventDefault();
    const title = document.querySelector("#product-title").value;
    const quantity = document.querySelector("#product-quantity").value;
    const category = document.querySelector("#product-category").value;
    const time = new Date().toLocaleDateString("fa-IR");

    if (!title || !quantity || !category || !time) return;
    Storage.saveProducts({ title, quantity, category, time });
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
    document.querySelector("#product-title").value = "";
    document.querySelector("#product-quantity").value = "";
  }

  createProductsList(products) {
    let result = "";
    products.forEach((item) => {
      const selectedCategory = Storage.getAllCategories().find(
        (c) => c.id == item.category
      );
      result += `
      <div class="flex justify-between items-center mb-2">
      <span class="text-slate-400">${item.title}</span>
      <div class="flex items-center gap-x-3">
        <span class="text-slate-400">${item.time}
       </span>
        <span
          class="block px-3 py-0.5 text-slate-400 border border-slate-400 text-sm rounded-2xl"
          >${selectedCategory.title}</span
        >
        <span
          class="flex justify-center items-center w-7 h-7 rounded-full text-xs bg-slate-500 border-2 border-slate-300 text-slate-300"
          >${item.quantity}</span
        >
        <button 
          class="delete-product border px-2 py-0.5 rounded-2xl border-red-400 text-red-400"
          data-product-id="${item.id}"
        >
          delete
        </button>
      </div>
    </div>
      `;
    });
    const productsDOM = document.querySelector("#products-list");
    productsDOM.innerHTML = result;
    const deleteBtns = [...document.querySelectorAll(".delete-product")];
    deleteBtns.forEach((item) => {
      item.addEventListener("click", (e) => this.deleteProduct(e));
    });
  }

  searchProducts(e) {
    const value = e.target.value.trim().toLowerCase();
    const filteredProducts = this.products.filter((p) =>
      p.title.toLowerCase().includes(value)
    );
    this.createProductsList(filteredProducts);
  }

  sortProducts(e) {
    const value = e.target.value;
    this.products = Storage.getAllProducts(value);
    this.createProductsList(this.products);
  }

  deleteProduct(e) {
    const productId = e.target.dataset.productId;
    Storage.deleteProduct(productId);
    this.products = Storage.getAllProducts();
    this.createProductsList(this.products);
  }
}
export default new ProductView();
