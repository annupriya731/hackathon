// Simulating fetching product ID from URL query parameters
const queryParams = new URLSearchParams(window.location.search);
const productId = queryParams.get('id');

// Fetch product details from backend
async function fetchProductDetails(id) {
  try {
    const res = await fetch(`/api/products/${id}`);
    const product = await res.json();
    displayProductDetails(product);
    fetchSimilarProducts(product.category);
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
}

// Display product details on the page
function displayProductDetails(product) {
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-price').textContent = `$${product.price}`;
}

// Fetch similar products based on category
async function fetchSimilarProducts(category) {
  try {
    const res = await fetch(`/api/products?category=${category}`);
    const products = await res.json();
    displaySimilarProducts(products);
  } catch (error) {
    console.error('Error fetching similar products:', error);
  }
}

// Display similar products
function displaySimilarProducts(products) {
  const similarProductsContainer = document.getElementById('similar-products');
  similarProductsContainer.innerHTML = ''; // Clear any existing content

  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <a href="product.html?id=${product._id}">View Details</a>
    `;
    similarProductsContainer.appendChild(productDiv);
  });
}

// Load product details on page load
fetchProductDetails(productId);
