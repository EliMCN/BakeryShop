const BASE_URL = "https://6900b6e6ff8d792314bb1a76.mockapi.io/api/products";

// CREATE
const createProduct = async (product) => {

    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Error al crear el producto");
    }
    
  const data = await response.json();
  return data;
};

// READ ALL
const getProducts = async (category) => {

    let url = BASE_URL;

    // Si se proporciona una categoría, la añadimos como un parámetro de búsqueda a la URL.
    if (category) {
        url += `?category=${category}`;
    }
 
    const response = await fetch(url); // Usamos la URL modificada
    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }
    const data = await response.json();
    return data;
};

// READ ONE
const getProductById = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }
    const data = await response.json();
    return data;

}

// UPDATE
const updateProduct = async (id, product) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el producto");
    }
    
  const data = await response.json();
  return data;
};

// DELETE
const deleteProduct = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el producto");
    }
    
  const data = await response.json();
  return data;
};

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct };