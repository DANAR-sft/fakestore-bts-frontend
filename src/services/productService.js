import api from "./api.js";

export const productService = {
  async getProducts(params = {}) {
    const response = await api.get("/products", { params });
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async getCategories() {
    const response = await api.get("/categories");
    return response.data;
  },

  async createProduct(productData) {
    const payload = {
      title: productData.title.trim(),
      price: Number(productData.price),
      description:
        productData.description?.trim() || "No description provided.",
      categoryId: Number(productData.categoryId),
      images:
        productData.images && productData.images.length > 0
          ? productData.images
          : [
              "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
            ],
    };

    const response = await api.post("/products/", payload);
    return response.data;
  },
};
