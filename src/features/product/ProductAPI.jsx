/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
export function fetchProductsById(id) {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:8080/products/" + id)
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
      method: "POST",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => resolve({ data }))
      .catch((error) => {
        console.error("Error fetching all products:", error);
        reject(error);
      });
  });
}

export async function updateProduct(upadte) {
  const apiUrl = 'http://localhost:8080/products/';

  try {
    const response = await fetch(apiUrl + upadte.id, {
      method: 'PATCH',
      body: JSON.stringify(upadte),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update product.');
    }

    const updatedProduct = await response.json();
    return { data: updatedProduct };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error updating product:', error);
    return { error: 'Failed to update product.' };
  }
}
export async function updateStocks(upadtes) {
  const apiUrl = 'http://localhost:8080/stocks-update';

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body: JSON.stringify(upadtes),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to update product.');
    }

    const updatedProduct = await response.json();
    return { data: updatedProduct };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error updating Stocks:', error);
    return { error: 'Failed to update Stocks.' };
  }
}
export async function deleteProductImage(index) {
  const apiUrl = 'http://localhost:8080/products/image/';

  try {
    const response = await fetch(apiUrl + index, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete Image.');
    }

    const deleteProductImage = await response.json();
    return { data: deleteProductImage };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error delete product image:', error);
    return { error: 'Failed to delete product image.' };
  }
}
export async function deleteAllImage() {
  const apiUrl = 'http://localhost:8080/products/allimage';

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete Image.');
    }

    const deleteAllImage = await response.json();
    return { data: deleteAllImage };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error delete product image:', error);
    return { error: 'Failed to delete product image.' };
  }
}
export async function deleteOneImage(index, productId) {
  const apiUrl = 'http://localhost:8080/products/dimg/';

  try {
    const response = await fetch(apiUrl + index, {
      method: 'DELETE',
      body:JSON.stringify(productId),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete Image.');
    }

    const deleteAllImage = await response.json();
    return { data: deleteAllImage };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error delete product image:', error);
    return { error: 'Failed to delete product image.' };
  }
}
export async function checkedBrands(filter) {
  console.log('Checking', filter);
  const apiUrl = 'http://localhost:8080/brands/';

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body:JSON.stringify(filter),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete Image.');
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error delete product image:', error);
    return { error: 'Failed to delete product image.' };
  }
}
export async function checkedCategory(filter) {
  console.log('Checking', filter);
  const apiUrl = 'http://localhost:8080/categories/';

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      body:JSON.stringify(filter),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete Image.');
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    // Handle errors gracefully (you might want to log the error, throw a custom error, etc.)
    console.error('Error delete product image:', error);
    return { error: 'Failed to delete product image.' };
  }
}


export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductImages() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/images");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilters(filter, sort, pagination, admin, itemprice) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues.join(",")}&`;
    }
  }

  for (let key in itemprice) {
    queryString += `${key}=${itemprice[key]}&`
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  console.log(pagination);
  if (admin) {
    queryString += "admin=true";
  }

  if (queryString.endsWith("&")) {
    queryString = queryString.slice(0, -1);
  }

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/products?" + queryString
      );
      // localStorage.setItem('backendParams', JSON.stringify(response));
      const data = await response.json();
      const totalItems = await response.headers.get("X-Total-Count");
      resolve({ data: { products: data, totalItems: +totalItems } });
    } catch (error) {
      console.error("Error fetching products by filters:", error);
      reject(error);
    }
  });
}

export function SearchProducts(search) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/search?search=${search}`);
    const data = await response.json();
    resolve({ data });
  });
}
