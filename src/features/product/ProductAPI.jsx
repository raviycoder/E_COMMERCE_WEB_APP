/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
import axios from 'axios';
export function fetchAllProducts() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/products")
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
  let queryString = " ";
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

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products?${queryString}`
      );
      const data = await response.json();
      const totalItems = response.headers.get("X-Total-Count");
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      console.error("Error fetching products by filters:", error);
      reject(error);
    }
  });
}


