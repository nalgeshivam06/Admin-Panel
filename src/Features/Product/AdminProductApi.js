const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export function createProduct(product) {
    return new Promise(async (resolve) => {
      const response = await fetch(`${baseUrl}/api/products/`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  export function updateProduct(update) {
    return new Promise(async (resolve) => {
      const response = await fetch(
        `${baseUrl}/products?id=${update.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(update),
          headers: { 'content-type': 'application/json' },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }

  export function deleteProduct(id) {
    return new Promise(async (resolve) => {
      const response = await fetch(
        `${baseUrl}/products?id=${id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      resolve({ data });
    });
  }