import CategoryView from "./CategoryView.js";
import ProductView from "./ProductView.js";

document.addEventListener("DOMContentLoaded", () => {
  CategoryView.setApp();
  ProductView.setApp();
  console.log(ProductView);
  CategoryView.createCategoriesList();
  ProductView.createProductsList()
});
