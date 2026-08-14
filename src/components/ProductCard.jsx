import React, { useState } from 'react';
import { cleanImageUrl, formatCurrency, FALLBACK_IMAGE } from '../utils/helpers';
import { Tag, ArrowUpRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onQuickView }) => {
  const [imgSrc, setImgSrc] = useState(() => cleanImageUrl(product?.images));
  const [isLoaded, setIsLoaded] = useState(false);

  const categoryName = product?.category?.name || 'Umum';

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image container */}
      <div className="relative w-full aspect-square bg-slate-100 overflow-hidden">
        {/* Shimmer Placeholder while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 animate-shimmer" />
        )}

        <img
          src={imgSrc}
          alt={product.title}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImgSrc(FALLBACK_IMAGE);
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-800 shadow-sm border border-white/50">
            <Tag className="w-3 h-3 text-brand-600" />
            {categoryName}
          </span>
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-sm text-slate-700 hover:text-brand-600 hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            title="Lihat Detail Cepat"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5">
        {/* Product Title */}
        <h3 className="font-semibold text-base text-slate-900 line-clamp-2 min-h-[3rem] group-hover:text-brand-600 transition-colors">
          {product.title}
        </h3>

        {/* Product Description */}
        <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">
          {product.description || 'Tidak ada deskripsi tersedia untuk produk ini.'}
        </p>

        {/* Price & Action */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
          <div>
            <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">Harga</span>
            <span className="text-lg font-bold text-slate-900 tracking-tight">
              {formatCurrency(product.price)}
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100/80 px-3 py-2 rounded-lg transition-colors"
          >
            <span>Detail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
