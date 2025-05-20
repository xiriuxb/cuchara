export function RecipeGridSkeleton() {
  return (
    <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-[900px]">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mx-auto relative min-h-auto min-w-36">
          <div className="aspect-square w-full bg-gray-200 rounded-xl animate-pulse" />
          <div className="absolute top-0 w-full py-3 px-2 rounded-t-xl bg-gray-200 animate-pulse" />
        </div>
      ))}
    </section>
  );
} 