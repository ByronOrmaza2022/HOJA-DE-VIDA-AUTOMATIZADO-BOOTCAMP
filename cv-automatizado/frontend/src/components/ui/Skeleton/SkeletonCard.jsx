import Skeleton from "./Skeleton";
// Skeleton Cards Genérico – Admin (Experiencia / Cursos / Reconocimientos)
export default function SkeletonCard({ delay = 0 }) {
  return (
    /*<div
      className="bg-white p-5 rounded-xl shadow space-y-3
                 animate-pulse opacity-0"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
        animationName: "fadeIn",
        animationDuration: "400ms",
        animationTimingFunction: "ease-out"
      }}
    >
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-3 w-full" />
      <div className="flex justify-end gap-3 pt-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>*/
    <div className="bg-white p-5 rounded-xl shadow animate-pulse animate-pulse opacity-0"
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "forwards",
        animationName: "fadeIn",
        animationDuration: "500ms",
        animationTimingFunction: "ease-out"
      }}>
      <div className="h-5 bg-gray-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/6"></div>
    </div>
  
    
  );
}
