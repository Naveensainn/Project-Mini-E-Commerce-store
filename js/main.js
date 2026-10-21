const API = "https://dummyjson.com/products?limit=0";
const CATEGORY_API = "https://dummyjson.com/products/categories";

const productsContainer = document.querySelector("#products-container");
const categoryFilters = document.querySelector("#category-filters");

// let allProducts = []
// let allCategories = []

function formatCategory(category) {
  return category.replace("-", " ")
}

// function findAllCategories() {
//   // allProducts.forEach(p => {
//   //   p.category
//   // })

//   allProducts.forEach(({category}) => {
//     if(!allCategories.includes(category)){
//       allCategories.push(category)
//     }
//   })
//   console.log(allCategories);
// }



async function fetchProducts() {
  const response = await fetch(API);
  const data = await response.json();
  // allProducts = data.products
  // console.log(allProducts);
  // findAllCategories;
  // console.log(data);
  renderProducts(data.products)
}

function renderProducts(products) {
  productsContainer.innerHTML = ""
 products.forEach(p => {

    let article = document.createElement("article")
    article.className = "bg-white border border-slate-200 rounded-lg p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-sm transition"

    let card = `
     <div class="h-48 w-full flex items-center justify-center p-3 mb-4 bg-white">
          <img src=${p.thumbnail}
            alt="Calvin Klein CK One" class="max-h-full max-w-full object-contain" loading="lazy">
        </div>
        <div class="flex-grow flex flex-col">
          <span class="text-xs font-semibold text-teal-700 uppercase tracking-wider mb-1">
           ${formatCategory(p.category)}
          </span>
          <h2 class="font-semibold text-slate-900 text-sm mb-2 line-clamp-2" title=${p.title}>
          ${p.title}
          </h2>
          <div class="mt-auto pt-2">
            <span class="text-lg font-bold text-slate-900">
              ₹${(p.price * 90).toFixed(2)}
            </span>
          </div>
          <a href="product-details.html"
            class="mt-4 block w-full text-center bg-teal-700 hover:bg-teal-800 text-white text-sm font-medium py-2 px-4 rounded transition">
            View Details
          </a>
        </div>
        `

    article.innerHTML = card
    productsContainer.append(article)
  })
}

async function fetchCategories() {
  const response = await fetch(CATEGORY_API);
  const data = await response.json();
  // console.log(data);
  renderCategories(data)
}

function renderCategories(categories) {
  categoryFilters.innerHTML = "";
  [{ name: "all", slug: "all" }, ...categories].forEach(c => {
    let button = document.createElement("button")
    button.className = "px-4 py-1.5 rounded-md text-sm font-medium bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 capitalize transition"
    button.type = "button";
    button.textContent = c.name;
    button.dataset.category = c.slug
    categoryFilters.append(button)
  })


}

fetchProducts()
fetchCategories()

categoryFilters.addEventListener("click", (e) => {
  e.stopPropagation();

  const element = e.target

  if(element.type) {
    const text = element.dataset.category;
    console.log(text);
  }
})
function inti() {

}

2.25.40