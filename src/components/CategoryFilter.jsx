import React from 'react';
import { Layers } from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar scroll-smooth">
      <button
        onClick={() => onSelectCategory('all')}
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
          selectedCategory === 'all'
            ? 'bg-slate-900 text-white shadow-sm'
            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        <span>Semua Kategori</span>
      </button>

      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            Number(selectedCategory) === cat.id
              ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
