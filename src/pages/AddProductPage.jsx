import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { validateProductData, cleanImageUrl, FALLBACK_IMAGE } from '../utils/helpers';
import { 
  PlusCircle, 
  ArrowLeft, 
  Tag, 
  DollarSign, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  Sparkles,
  CheckCircle2,
  Layers
} from 'lucide-react';
import toast from 'react-hot-toast';

const AddProductPage = () => {
  const { categories, addProduct, isSubmitting } = useProducts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    categoryId: categories.length > 0 ? categories[0].id : '',
    description: '',
    imageUrl: '',
  });

  const [errors, setErrors] = useState({});
  const [imgPreviewError, setImgPreviewError] = useState(false);

  // If categories are loaded after mount and categoryId is empty, select the first category
  React.useEffect(() => {
    if (!formData.categoryId && categories.length > 0) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset error when user modifies field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    if (name === 'imageUrl') {
      setImgPreviewError(false);
    }
  };

  const handleFillSample = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    ];
    const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];

    setFormData({
      title: 'Smart Wireless Noise-Cancelling Headphones Pro',
      price: '199',
      categoryId: categories.length > 0 ? categories[0].id : '1',
      description: 'Pengalaman audio imersif kualitas studio dengan fitur active noise cancelling generasi terbaru dan daya tahan baterai hingga 40 jam pemakaian.',
      imageUrl: randomImage,
    });
    setErrors({});
    setImgPreviewError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateProductData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Silakan periksa kembali isian form Anda.');
      return;
    }

    try {
      const payload = {
        title: formData.title,
        price: Number(formData.price),
        categoryId: Number(formData.categoryId),
        description: formData.description,
        images: formData.imageUrl.trim() ? [formData.imageUrl.trim()] : [FALLBACK_IMAGE],
      };

      await addProduct(payload);
      navigate('/');
    } catch (err) {
      // Error toast is handled inside addProduct context
    }
  };

  const titleLength = formData.title.length;

  return (
    <div className="max-w-4xl mx-auto pb-16">
      {/* Header & Back Link */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tambah Produk Baru
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Lengkapi formulir di bawah ini untuk menambahkan produk baru ke katalog Fake Store.
          </p>
        </div>

        <button
          type="button"
          onClick={handleFillSample}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span>Isi Data Contoh (Demo)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6"
          >
            {/* Title Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Nama Produk (Title) <span className="text-rose-500">*</span>
                </label>
                <span
                  className={`text-[11px] font-medium ${
                    titleLength > 150 ? 'text-rose-500 font-bold' : 'text-slate-400'
                  }`}
                >
                  {titleLength}/150 karakter
                </span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={150}
                  placeholder="Contoh: Premium Wireless Headphone"
                  className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                    errors.title
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.title && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 font-medium pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Price & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Price Field */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Harga (Price in USD) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0.01"
                    step="any"
                    placeholder="Contoh: 49.99"
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                      errors.price
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-slate-200 focus:border-brand-500'
                    }`}
                  />
                </div>
                {errors.price && (
                  <p className="flex items-center gap-1 text-[11px] text-rose-500 font-medium pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Kategori <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Layers className="w-4 h-4" />
                  </div>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                      errors.categoryId
                        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                        : 'border-slate-200 focus:border-brand-500'
                    }`}
                  >
                    <option value="">Pilih Kategori Produk...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.categoryId && (
                  <p className="flex items-center gap-1 text-[11px] text-rose-500 font-medium pt-0.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.categoryId}
                  </p>
                )}
              </div>
            </div>

            {/* Description Field (Optional) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Deskripsi Produk <span className="text-slate-400 font-normal">(Opsional)</span>
                </label>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Tuliskan spesifikasi, keunggulan, atau rincian produk di sini..."
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
              />
            </div>

            {/* Image URL Field (Optional) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                URL Gambar Produk <span className="text-slate-400 font-normal">(Opsional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/product-image.jpg"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                    errors.imageUrl
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.imageUrl && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 font-medium pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.imageUrl}
                </p>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-brand-500/20 hover:shadow-lg transition-all"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menyimpan ke Server...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Publikasikan Produk</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div className="lg:col-span-1 space-y-4">
          <div className="sticky top-28">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span>Pratinjau Kartu Produk</span>
            </h3>

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
              {/* Preview Image */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <img
                  src={
                    imgPreviewError || !formData.imageUrl.trim()
                      ? FALLBACK_IMAGE
                      : formData.imageUrl.trim()
                  }
                  alt="Preview"
                  onError={() => setImgPreviewError(true)}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm">
                    <Tag className="w-3 h-3 text-brand-600" />
                    {categories.find((c) => String(c.id) === String(formData.categoryId))?.name || 'Kategori'}
                  </span>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-5 space-y-3">
                <h4 className="font-semibold text-sm text-slate-900 line-clamp-2">
                  {formData.title.trim() || 'Nama produk Anda akan muncul di sini'}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {formData.description.trim() || 'Deskripsi singkat produk akan ditampilkan di bagian ini.'}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-medium block">Harga</span>
                    <span className="text-base font-bold text-slate-900">
                      ${formData.price ? Number(formData.price).toFixed(2) : '0.00'}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                    Live Preview
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1.5">
              <p className="font-semibold text-slate-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Informasi Pengujian:
              </p>
              <p>
                Setelah menekan tombol <strong>Publikasikan Produk</strong>, produk akan langsung tersinkronisasi ke state utama tanpa reload halaman.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
