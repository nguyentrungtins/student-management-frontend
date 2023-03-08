"use client";
export default function SheetItem({ className = "", room = "" }) {
  return (
    <div className="flex flex-col justify-center items-start rounded-r-lg mr-2 my-2 p-5 bg-green-100 border-l-4 border-solid border-green-700 flex-col h-40">
      <span className="text-base font-semibold leading-tight mb-3">
        {className}
      </span>
      <span className="text-sm text-gray-600">{room}</span>
      <span className="text-sm text-gray-400">3 credit</span>
    </div>
  );
}
