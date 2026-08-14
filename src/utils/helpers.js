/**
 * Helper utility functions
 */

// Fallback image if product image URL is invalid or fails to load
export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80';

/**
 * Sanitize and clean image URLs that might come malformed from Fake Store / Platzi API
 * E.g., `["[\"https://...\"]"]` or corrupted JSON strings
 */
export function cleanImageUrl(images) {
  if (!images) return FALLBACK_IMAGE;

  let url = '';

  if (Array.isArray(images)) {
    if (images.length === 0) return FALLBACK_IMAGE;
    url = images[0];
  } else if (typeof images === 'string') {
    url = images;
  }

  if (!url || typeof url !== 'string') return FALLBACK_IMAGE;

  // Clean brackets, escaped quotes, and quotes often present in dirty mock data
  let cleaned = url.replace(/^\["?|"?\]$/g, '').replace(/\\"/g, '').replace(/["']/g, '').trim();

  // If after cleaning it contains another URL inside
  if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
    return cleaned;
  }

  // If it's a relative or invalid path, fallback to safe image
  return FALLBACK_IMAGE;
}

/**
 * Format numbers as USD currency
 */
export function formatCurrency(amount) {
  const num = Number(amount);
  if (isNaN(num)) return '$0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Truncate long text with ellipsis
 */
export function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Validate product form data according to requirements
 */
export function validateProductData(formData) {
  const errors = {};

  // Title: required, max 150 chars
  if (!formData.title || !formData.title.trim()) {
    errors.title = 'Nama produk (title) wajib diisi';
  } else if (formData.title.trim().length > 150) {
    errors.title = 'Nama produk tidak boleh melebihi 150 karakter';
  }

  // Price: required, must be number > 0
  if (formData.price === undefined || formData.price === null || formData.price === '') {
    errors.price = 'Harga (price) wajib diisi';
  } else {
    const numPrice = Number(formData.price);
    if (isNaN(numPrice) || numPrice <= 0) {
      errors.price = 'Harga harus berupa angka lebih besar dari 0';
    }
  }

  // CategoryId: required
  if (!formData.categoryId || formData.categoryId === '') {
    errors.categoryId = 'Kategori produk wajib dipilih';
  }

  // Images URL validation (optional)
  if (formData.imageUrl && formData.imageUrl.trim()) {
    const urlPattern = /^(https?:\/\/)/i;
    if (!urlPattern.test(formData.imageUrl.trim())) {
      errors.imageUrl = 'URL gambar harus diawali dengan http:// atau https://';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
