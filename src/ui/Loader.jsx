import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <p
      data-testid="loader"
      className="flex flex-col h-[60vh] rounded-3xl shadow-2xl items-center gap-1 justify-center text-xl font-semibold text-gray-700 dark:text-white"
    >
      Loading ... <LoaderCircle size={30} className="animate-spin" />
    </p>
  );
}

export default Loader;
