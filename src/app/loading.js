function Loading() {
  return (
    <div class="flex min-h-screen items-center justify-center bg-white">
      <div class="flex gap-5">
        <div class="relative w-72 space-y-3 overflow-hidden rounded-md bg-gray-300 p-3 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]">
          <div class="h-36 w-full rounded-lg bg-gray-100"></div>
          <div class="space-y-3">
            <div class="h-5 w-8/12 rounded-full bg-gray-100"></div>
            <div class="space-y-1">
              <div class="h-4 w-full rounded-full bg-gray-100 shadow"></div>
              <div class="h-4 w-full rounded-full bg-gray-100 shadow"></div>
              <div class="h-4 w-full rounded-full bg-gray-100 shadow"></div>
              <div class="h-4 w-7/12 rounded-full bg-gray-100 shadow"></div>
            </div>
            <div class="flex gap-2">
              <div class="h-5 w-16 rounded-full bg-gray-100"></div>
              <div class="h-5 w-12 rounded-full bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
