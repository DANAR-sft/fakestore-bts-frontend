import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { productService } from '../services/productService';
import toast from 'react-hot-toast';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Search, Filter & Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Load initial products and categories
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getProducts(),
        productService.getCategories(),
      ]);

      setProducts(Array.isArray(productsData) ? productsData : []);
      // Filter out invalid/empty categories
      const validCategories = Array.isArray(categoriesData)
        ? categoriesData.filter((cat) => cat && cat.id && cat.name)
        : [];
      setCategories(validCategories);
    } catch (err) {
      console.error('Error fetching catalog data:', err);
      setError('Gagal memuat data produk. Pastikan koneksi internet stabil.');
      toast.error('Gagal memuat produk dari server.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset pagination to page 1 whenever search query or category filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategoryId]);

  // Filtered products based on search term and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!product) return false;

      // Filter by category
      if (selectedCategoryId !== 'all') {
        const productCatId = product.category?.id || product.categoryId;
        if (productCatId !== Number(selectedCategoryId)) {
          return false;
        }
      }

      // Filter by search query
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase().trim();
        const titleMatch = product.title ? product.title.toLowerCase().includes(query) : false;
        const descMatch = product.description ? product.description.toLowerCase().includes(query) : false;
        const categoryMatch = product.category?.name ? product.category.name.toLowerCase().includes(query) : false;
        return titleMatch || descMatch || categoryMatch;
      }

      return true;
    });
  }, [products, searchTerm, selectedCategoryId]);

  // Paginated slice of products for current view
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  /**
   * Add a new product and immediately update local state without reloading the page
   */
  const addProduct = async (productData) => {
    setIsSubmitting(true);
    try {
      const createdProduct = await productService.createProduct(productData);

      // Populate category details if returned without full category object
      let completeProduct = createdProduct;
      if (!completeProduct.category && completeProduct.categoryId) {
        const matchedCategory = categories.find((c) => c.id === Number(completeProduct.categoryId));
        completeProduct = {
          ...completeProduct,
          category: matchedCategory || { id: Number(completeProduct.categoryId), name: 'Custom' },
        };
      }

      // Prepend to products state
      setProducts((prev) => [completeProduct, ...prev]);

      // Reset filters so the new product is visible at top of page 1
      setSearchTerm('');
      setSelectedCategoryId('all');
      setCurrentPage(1);

      toast.success('Produk baru berhasil ditambahkan!');
      return { success: true, product: completeProduct };
    } catch (err) {
      console.error('Error adding product:', err);
      const msg = err.response?.data?.message || 'Gagal menambahkan produk. Silakan periksa kembali input Anda.';
      toast.error(typeof msg === 'string' ? msg : 'Gagal menambahkan produk');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const value = {
    products,
    categories,
    filteredProducts,
    paginatedProducts,
    isLoading,
    isSubmitting,
    error,
    searchTerm,
    setSearchTerm,
    selectedCategoryId,
    setSelectedCategoryId,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    fetchData,
    addProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
