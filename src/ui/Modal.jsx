import { XCircle } from "lucide-react";

function Modal({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null;
  return (
    <div className="z-50">
      <div
        className="w-full h-screen fixed inset-0 bg-blue-950 opacity-70"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="xl:w-1/2 md:w-[60%] w-3/4 rounded-2xl xl:px-10 xl:py-6 p-4 h-fit absolute top-1/2 left-1/2 -translate-1/2 bg-slate-900 shadow-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <p className="text-slate-200 text-xl">Search and Filter Vehicles:</p>
          <button onClick={() => setIsOpen(false)}>
            <XCircle className="text-rose-400" size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
