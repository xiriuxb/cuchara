export function ProfileSkeleton() {
  return (
    <section className="container mx-auto py-2 max-w-4xl">
      <div className="bg-muted p-4 rounded-lg overflow-auto flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:gap-4 place-items-center sm:place-items-start">
          <div className="size-20 bg-gray-200 rounded-full animate-pulse" />
          <section className="flex flex-col justify-between py-3">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </section>
          <section className="flex-1 grid gap-2 justify-items-center sm:justify-items-end">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-4">
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
          </section>
        </div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
      </div>
    </section>
  );
} 