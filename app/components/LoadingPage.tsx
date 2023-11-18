export default function LoadingPage() {
  return (
    <div className="bg-gray-100 w-full min-h-full flex justify-center items-center">
      <div className="flex gap-3 min-h-screen w-full items-center justify-center bg-gray-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
        </div>
        <p className="text-lg font-bold text-slate-600">Loading...</p>
      </div>
    </div>
  );
}
