import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { cleanImageUrl, formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';
import { 
  ArrowLeft, 
  Tag, 
  Calendar, 
  CheckCircle, 
  ShieldCheck, 
  Truck, 
  ShoppingBag,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        const mainImg = cleanImageUrl(data.images);
        setActiveImage(mainImg);
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Produk tidak ditemukan atau telah dihapus.');
        toast.error('Gagal mengambil data detail produk.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 space-y-8 animate-pulse">
        <div className="w-32 h-4 bg-slate-200 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="w-full aspect-square bg-slate-200 rounded-3xl" />
          <div className="space-y-4">
            <div className="w-1/4 h-5 bg-slate-200 rounded-full" />
            <div className="w-3/4 h-8 bg-slate-200 rounded" />
            <div className="w-1/3 h-6 bg-slate-200 rounded" />
            <div className="w-full h-24 bg-slate-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Detail Produk Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500">{error || 'ID produk tidak valid.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Katalog</span>
        </Link>
      </div>
    );
  }

  const imagesList = Array.isArray(product.images) && product.images.length > 0
    ? product.images.map((img) => cleanImageUrl(img))
    : [FALLBACK_IMAGE];

  return (
    <div className="max-w-6xl mx-auto pb-16 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-brand-600 transition-colors">
          Beranda
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/" className="hover:text-brand-600 transition-colors">
          Katalog
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Gallery Column */}
          <div className="space-y-4">
            {/* Active Image */}
            <div className="relative aspect-square rounded-2xl bg-slate-100 overflow-hidden border border-slate-100 shadow-inner">
              <img
                src={activeImage || cleanImageUrl(product.images)}
                alt={product.title}
                onError={() => setActiveImage(FALLBACK_IMAGE)}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm text-slate-800 shadow-sm border border-slate-100">
                  <Tag className="w-3.5 h-3.5 text-brand-600" />
                  {product.category?.name || 'Umum'}
                </span>
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {imagesList.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === img
                        ? 'border-brand-600 ring-2 ring-brand-500/20 scale-105'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                <span>Product ID: #{product.id}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 pt-1 pb-4 border-b border-slate-100">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Tersedia
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Deskripsi Produk
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description || 'Tidak ada deskripsi detail untuk produk ini.'}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Pengiriman Cepat</p>
                    <p className="text-[10px] text-slate-500">Siap kirim ke seluruh area</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800">Garansi Kualitas</p>
                    <p className="text-[10px] text-slate-500">100% Original Fake Store</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back action */}
            <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Lihat Produk Lainnya</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
