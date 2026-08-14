import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">404</h1>
          <h2 className="text-lg font-bold text-slate-800">Halaman Tidak Ditemukan</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Halaman yang Anda tuju tidak ditemukan atau URL mungkin telah dipindahkan.
          </p>
        </div>
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold shadow transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ke Katalog Produk</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
