"use client";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function SheetItem({ className = "", room = "" }) {
  return (
    <div
      className={classNames(
        `bg-blue-100`,
        `border-blue-500`,
        "flex flex-col justify-center items-start rounded-r-lg mr-2 my-2 p-5 border-l-4 border-solid flex-col h-40"
      )}
    >
      <span className="text-base font-semibold leading-tight mb-3">
        {className}
      </span>
      <span className="text-sm text-gray-600">{room}</span>
      <span className="text-sm text-gray-400">3 credit</span>
    </div>
  );
}
