import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-square bg-slate-200" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-1 space-y-3">
        <div className="w-1/3 h-4 bg-slate-200 rounded" />
        <div className="w-4/5 h-5 bg-slate-200 rounded" />
        <div className="w-full h-3 bg-slate-200 rounded" />
        <div className="w-2/3 h-3 bg-slate-200 rounded" />

        <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
          <div className="w-16 h-6 bg-slate-200 rounded" />
          <div className="w-16 h-8 bg-slate-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
