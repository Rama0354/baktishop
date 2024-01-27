export default function LoadingPage() {
  return (
    <div className="bg-secondary/25 w-full min-h-full flex justify-center items-center">
      <div className="flex gap-3 min-h-screen w-full items-center justify-center bg-secondary/25">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
          <div className="h-8 w-8 rounded-full bg-secondary"></div>
        </div>
        <p className="text-lg font-bold ">Loading...</p>
      </div>
    </div>
  );
}
