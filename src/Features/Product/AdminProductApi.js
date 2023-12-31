import { BASE_URL } from "../../../config";

export function createProduct(product) {
    return new Promise(async (resolve) => {
      const response = await fetch(`${BASE_URL}/api/createProduct`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  