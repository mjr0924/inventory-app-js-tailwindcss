import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();
  ProductView.setYear();
  ProductView.countProduct();
  CategoryView.createCategoriesList();
  ProductView.createProductsList(ProductView.products);
});
