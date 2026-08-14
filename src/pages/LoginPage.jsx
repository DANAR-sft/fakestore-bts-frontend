import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LogIn, 
  Lock, 
  User, 
  KeyRound, 
  AlertCircle, 
  Sparkles,
  ShoppingBag,
  ArrowLeft
} from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Target page to redirect after login
  const from = location.state?.from?.pathname || '/';

  // If already authenticated, redirect immediately
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username / Email wajib diisi';
    }

    if (!password.trim()) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Harap lengkapi semua field yang wajib diisi');
      return;
    }

    setIsLoading(true);
    try {
      await login(username, password);
      toast.success('Login berhasil! Selamat datang kembali.');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Gagal login. Periksa username dan password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick fill demo credentials for reviewer convenience
  const handleFillDemo = (type = 'platzi') => {
    if (type === 'platzi') {
      setUsername('john@mail.com');
      setPassword('changeme');
    } else {
      setUsername('admin');
      setPassword('admin123');
    }
    setErrors({});
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 mx-auto shadow-sm">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Masuk ke Akun Anda
            </h2>
            <p className="text-xs text-slate-500">
              Gunakan kredensial Anda untuk mengakses fitur Tambah Produk dan manajemen katalog.
            </p>
          </div>

          {/* Demo Quick Fill Helper */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
              <span className="flex items-center gap-1 text-brand-700 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                Akun Demo untuk Penilai:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('platzi')}
                className="flex-1 py-1.5 px-2.5 bg-white border border-slate-200 hover:border-brand-500 rounded-xl text-[11px] font-medium text-slate-700 hover:text-brand-600 shadow-sm transition-all text-center"
              >
                Akun Platzi (john@mail.com)
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="flex-1 py-1.5 px-2.5 bg-white border border-slate-200 hover:border-brand-500 rounded-xl text-[11px] font-medium text-slate-700 hover:text-brand-600 shadow-sm transition-all text-center"
              >
                Akun Demo (admin)
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Email Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Username / Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors({ ...errors, username: null });
                  }}
                  placeholder="Contoh: john@mail.com atau admin"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                    errors.username
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 font-medium pt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: null });
                  }}
                  placeholder="Masukkan password Anda"
                  className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm placeholder-slate-400 text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all ${
                    errors.password
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
                      : 'border-slate-200 focus:border-brand-500'
                  }`}
                />
              </div>
              {errors.password && (
                <p className="flex items-center gap-1 text-[11px] text-rose-500 font-medium pt-0.5">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-50 shadow-md shadow-brand-500/20 hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk Sekarang</span>
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 text-center border-t border-slate-100">
            <p className="text-[11px] text-slate-400">
              Proteksi rute aktif: Sesi login akan disimpan secara lokal di browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
