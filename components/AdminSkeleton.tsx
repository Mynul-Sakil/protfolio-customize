export default function AdminSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Top Form Skeleton */}
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <div className="h-6 bg-slate/20 rounded w-1/4 mb-6"></div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-12 bg-slate/10 rounded"></div>
            <div className="h-12 bg-slate/10 rounded"></div>
          </div>
          <div className="h-24 bg-slate/10 rounded"></div>
          <div className="h-10 bg-slate/20 rounded w-40 mt-4"></div>
        </div>
      </div>

      {/* Bottom List/Grid Skeleton */}
      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <div className="h-6 bg-slate/20 rounded w-1/4 mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="h-48 bg-slate/10 rounded border border-line"></div>
          <div className="h-48 bg-slate/10 rounded border border-line"></div>
          <div className="h-48 bg-slate/10 rounded border border-line"></div>
        </div>
      </div>
    </div>
  );
}
