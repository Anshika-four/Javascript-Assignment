let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Wireless Mouse", category: "Electronics", price: 899, stock: 25 },
  { name: "Mechanical Keyboard", category: "Electronics", price: 3499, stock: 12 },
  { name: "USB-C Charger", category: "Electronics", price: 1199, stock: 30 },
  { name: "Bluetooth Headphones", category: "Electronics", price: 2799, stock: 18 },
  { name: "24-inch LED Monitor", category: "Electronics", price: 8999, stock: 10 },
  { name: "Laptop Backpack", category: "Accessories", price: 1599, stock: 22 },
  { name: "Travel Duffel Bag", category: "Accessories", price: 2199, stock: 14 },
  { name: "Smartphone Stand", category: "Accessories", price: 299, stock: 40 },
  { name: "Portable Speaker", category: "Electronics", price: 1999, stock: 16 },
  { name: "Gaming Controller", category: "Electronics", price: 2499, stock: 9 },
  { name: "Running Shoes", category: "Footwear", price: 2799, stock: 20 },
  { name: "Cotton T-Shirt", category: "Clothing", price: 499, stock: 35 },
  { name: "Denim Jeans", category: "Clothing", price: 1599, stock: 15 },
  { name: "Sports Watch", category: "Accessories", price: 1899, stock: 11 },
  { name: "Yoga Mat", category: "Sports & Fitness", price: 799, stock: 28 },
  { name: "Water Bottle (Steel)", category: "Home & Kitchen", price: 599, stock: 32 },
  { name: "Coffee Maker", category: "Home & Kitchen", price: 4599, stock: 6 },
  { name: "Electric Kettle", category: "Home & Kitchen", price: 1399, stock: 17 },
  { name: "Non-Stick Frying Pan", category: "Home & Kitchen", price: 999, stock: 19 },
  { name: "Study Lamp", category: "Home & Lighting", price: 799, stock: 24 },
  { name: "Office Chair", category: "Furniture", price: 7499, stock: 7 },
  { name: "Wall Clock", category: "Home Decor", price: 699, stock: 21 },
  { name: "Ceramic Vase", category: "Home Decor", price: 899, stock: 13 },
  { name: "Desk Plant (Artificial)", category: "Home Decor", price: 499, stock: 27 },
  { name: "Notebook Pack (Set of 3)", category: "Stationery", price: 299, stock: 45 },
  { name: "Fiction Novel", category: "Books", price: 399, stock: 26 },
  { name: "Science Textbook", category: "Books", price: 899, stock: 8 },
  { name: "Coloring Book", category: "Books", price: 249, stock: 33 },
  { name: "External Hard Drive 1TB", category: "Electronics", price: 5299, stock: 5 }
];

let currentList = [...products];

const table = document.getElementById("product-table");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const sortprice = document.getElementById("price-sort");
const categoryfilter = document.getElementById("category-filter");
const form = document.getElementById("add-items");

function updateCategoryFilter(list) {
  if (!categoryfilter) return;

  const categories = [...new Set(list.map(p => p.category))];
  categoryfilter.innerHTML = `<option value="">All Categories</option>`;

  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categoryfilter.appendChild(opt);
  });
}

function render(list = products) {
  if (!table) return;

  currentList = [...list];
  table.innerHTML = `
    <tr>
      <th>Product Name</th>
      <th>Category</th>
      <th>Price</th>
      <th>Stock</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  `;

  list.forEach((ele, index) => {
    table.innerHTML += `
      <tr>
        <td>${ele.name}</td>
        <td>${ele.category}</td>
        <td>${ele.price}</td>
        <td>${ele.stock}</td>
        <td><button class="edit-btn" data-index="${index}">Edit</button></td>
        <td><button class="delete-btn" data-index="${index}">Delete</button></td>
      </tr>
    `;
  });

  updateCategoryFilter(products);

  // attach delete buttons after rendering
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = function () {
      const idx = Number(this.dataset.index);
      const prod = currentList[idx];
      const actualIndex = products.indexOf(prod);
      if (actualIndex > -1) products.splice(actualIndex, 1);

      localStorage.setItem("products", JSON.stringify(products));
      render(products);
    };
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.onclick = function () {
    const idx = Number(this.dataset.index);

    // store index in localStorage so edit.html can read it
    localStorage.setItem("editIndex", idx);

    // go to edit page
    window.location.href = "edit.html";
  };
});

}

render();

/* ---------- ADD PRODUCT PAGE ---------- */
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const product = {
      name: document.getElementById("name").value,
      category: document.getElementById("category").value,
      price: Number(document.getElementById("price").value),
      stock: Number(document.getElementById("stock").value)
    };

    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added!");
    window.location.href = "index.html";
  });
}

/* ------ UPDATE PRODUCT PAGE ------- */
const editForm = document.getElementById("edit-form");

if (editForm) {

  const editIndex = Number(localStorage.getItem("editIndex"));
  const product = products[editIndex];

  // prefill form
  document.getElementById("edit-name").value = product.name;
  document.getElementById("edit-category").value = product.category;
  document.getElementById("edit-price").value = product.price;
  document.getElementById("edit-stock").value = product.stock;

  editForm.addEventListener("submit", e => {
    e.preventDefault();

    // update values
    products[editIndex] = {
      name: document.getElementById("edit-name").value,
      category: document.getElementById("edit-category").value,
      price: Number(document.getElementById("edit-price").value),
      stock: Number(document.getElementById("edit-stock").value)
    };

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product updated successfully!");

    window.location.href = "index.html";
  });
}
 

/* ---------- SEARCH ---------- */
if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value.toLowerCase().trim();
    if (!keyword) return render(products);

    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(keyword)
    );
    render(filtered);
  });

  searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") searchBtn.click();
  });
}

/* ---------- CATEGORY FILTER ---------- */
if (categoryfilter) {
  categoryfilter.addEventListener("change", function () {
    if (!this.value) return render(products);
    render(products.filter(p => p.category === this.value));
  });
}

/* ---------- PRICE SORT ---------- */
if (sortprice) {
  sortprice.addEventListener("change", function () {
    if (!this.value) return render(currentList);

    const sorted = [...currentList].sort((a, b) =>
      this.value === "lowToHigh" ? a.price - b.price : b.price - a.price
    );
    render(sorted);
  });
}



