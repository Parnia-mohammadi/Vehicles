import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <p className="flex flex-col items-center gap-1 justify-center text-xl font-semibold text-gray-700">
      Loading ... <LoaderCircle size={30} className="animate-spin" />
    </p>
  );
}

export default Loader;
