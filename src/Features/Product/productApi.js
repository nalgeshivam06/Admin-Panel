const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export function fetchAllProducts() {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/products`);
        const data = await response.json();
        resolve({ data });
    })
}

export function fetchAllCategories() {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/categories`);
        const data = await response.json();
        resolve({ data });
    })
}

export function fetchAllLabels() {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/labels`);
        const data = await response.json();
        resolve({ data });
    })
}

// export function fetchAllColors() {
//     return new Promise(async (resolve) => {
//         const response = await fetch(`${baseUrl}/colors`);
//         const data = await response.json();
//         resolve({ data });
//     })
// }

// export function fetchAllSizes() {
//     return new Promise(async (resolve) => {
//         const response = await fetch(`${baseUrl}/sizes`);
//         const data = await response.json();
//         resolve({ data });
//     })
// }

export function fetchProductsByFilters(filter) {
    // filter = {"category":"smartphone"}
    // TODO : on server we will support multi values
    let queryString = '';
    for (let key in filter) {
        queryString += `${key}=${filter[key]}&`
    }

    return new Promise(async (resolve) => {
        //TODO: we will not hard-code server URL here
        const response = await fetch(`${baseUrl}/products?${queryString}`);
        const data = await response.json()
        resolve({ data })
    }
    );
}

export function fetchProductById(id) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${baseUrl}/getSingleProduct?id=${id}`);
        const data = await response.json();
        resolve({ data });
    })
}