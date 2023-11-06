import React from "react";

export function SkeletonCard() {
  return (
    <>
      <div
        role="status"
        className="w-full p-4 border border-gray-200 rounded shadow animate-pulse md:p-6"
      >
        <div className="flex items-center justify-center h-36 mb-4 bg-gray-300 rounded">
          <svg
            className="w-10 h-10 text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}
export function SkeletonCatCard() {
  return (
    <>
      <div
        role="status"
        className="w-24 p-2 border border-gray-200 rounded shadow animate-pulse"
      >
        <div className="flex shrink items-center justify-center h-20 mb-4 bg-gray-300 rounded">
          <svg
            className="w-10 h-10 text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export function SkeletonComments() {
  return (
    <div role="status" className="animate-pulse py-3">
      <div className="flex items-center justify-start mb-4">
        <svg
          className="w-8 h-8 text-gray-200 mr-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="flex flex-col">
          <div className="w-20 h-2.5 bg-gray-200 rounded-full mb-3"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full max-w-[640px] mb-2.5"></div>
      <div className="h-2.5 bg-gray-300 rounded-full max-w-[540px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
