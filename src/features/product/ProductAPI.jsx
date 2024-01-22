/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
import axios from 'axios';
export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    axios.get("http://localhost:8080/products")
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => {
        console.error("Error fetching all products:", error);
        reject(error);
      });
  });
}

export function fetchProductsById(id) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/products/"+id)
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => {
        console.error("Error fetching all products:", error);
        reject(error);
      });
  });
}

export function createProduct(product) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/products/", {
      method: 'POST',
      body:JSON.stringify(product),
      headers:{'Content-Type':'application/json'}
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => {
        console.error("Error fetching all products:", error);
        reject(error);
      });
  });
}

export function updateProduct(update) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/products/"+update.id, {
      method: 'PATCH',
      body:JSON.stringify(update),
      headers:{'Content-Type':'application/json'}
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => {
        console.error("Error fetching all products:", error);
        reject(error);
      });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/categories') 
    const data = await response.json()
    resolve({data})})
}

export function fetchBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/brands') 
    const data = await response.json()
    resolve({data})
  }
  );
}

export function fetchProductsByFilters(filter, sort, pagination) {
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  console.log(pagination);

  if (queryString.endsWith('&')) {
    queryString = queryString.slice(0, -1);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        'http://localhost:8080/products?'+queryString
      );
      const data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count");
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      console.error("Error fetching products by filters:", error);
      reject(error);
    }
  });
}


