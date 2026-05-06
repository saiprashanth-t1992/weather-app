export const LoadingSpinner = () => {
  return (
    <div className="w-full space-y-4 animate-pulse">
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 h-64 flex flex-col gap-4">
        <div className="h-8 bg-white/20 rounded-lg w-1/3"></div>
        <div className="flex gap-6 my-6">
          <div className="h-24 w-24 bg-white/20 rounded-full"></div>
          <div className="h-32 bg-white/20 rounded-lg flex-1"></div>
        </div>
        <div className="h-6 bg-white/20 rounded-lg w-2/3"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/10 rounded-2xl h-28"></div>
        <div className="bg-white/10 rounded-2xl h-28"></div>
        <div className="bg-white/10 rounded-2xl h-28"></div>
        <div className="bg-white/10 rounded-2xl h-28"></div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white/10 rounded-2xl h-20 min-w-[80px]"></div>
        ))}
      </div>
    </div>
  );
};
