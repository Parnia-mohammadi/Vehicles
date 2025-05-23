import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-300 via-gray-500 to-gray-900 text-white">
      <div className="text-center mx-10">
        <h1 className="text-2xl md:text-5xl font-extrabold tracking-wide">
          Welcome to Vehicle Tracking System
        </h1>
        <p className="mt-6 md:text-lg text-base opacity-80">
          A sleek and powerful system for managing vehicle locations, designed
          for efficiency.
        </p>
      </div>

      <div className="mt-10 bg-black p-4 md:px-6 md:py-4 rounded-lg shadow-lg animate-pulse">
        <p className="text-xl font-semibold tracking-wider">
          Developed by: PARNIA MOHAMMADI
        </p>
      </div>
      <Link
        to="/vehicles"
        className="mt-8 px-6 py-3 text-white text-lg border-b animate-bounce hover:text-black transition-all"
      >
        View Vehicles List 🚗
      </Link>
    </div>
  );
}

export default Home;
