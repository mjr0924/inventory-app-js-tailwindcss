import Storage from "./Storage.js";

const categoryTitle = document.querySelector("#category-title");
const categoryDescription = document.querySelector("#category-description");
const addNewCategoryBtn = document.querySelector("#add-new-category");

class CategoryView {
  constructor() {
    addNewCategoryBtn.addEventListener("click", (e) => this.addNewCategory(e));
    this.categories = [];
  }

  addNewCategory(e) {
    e.preventDefault();
    const title = categoryTitle.value;
    const description = categoryDescription.value;
    if (!title || !description) return;
    Storage.saveCategory({ title, description });
    this.categories = Storage.getAllCategories();
    this.createCategoriesList();
    categoryDescription.value = "";
    categoryTitle.value = "";
  }
  setApp() {
    this.categories = Storage.getAllCategories();
  }
  createCategoriesList() {
    let result = `
    <option disabled value="" class="bg-slate-500 text-slate-300">select a category
    </option>`;
    this.categories.forEach((element) => {
      result += `
      <option value=${element.id} class="bg-slate-500 text-slate-300">
        ${element.title}
      </option>`;
    });
    const categoryDOM = document.querySelector("#product-category");
    categoryDOM.innerHTML = result;
  }
}
export default new CategoryView();
