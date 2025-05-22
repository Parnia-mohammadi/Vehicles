import { LoaderCircle, X } from "lucide-react";

function Error({ error }) {
  return (
    <p className="flex flex-col items-center gap-1 justify-center h-[60vh] rounded-3xl shadow-2xl text-xl font-semibold text-red-500">
      <X size={30} />
      You have problem in :{error}
    </p>
  );
}

export default Error;
