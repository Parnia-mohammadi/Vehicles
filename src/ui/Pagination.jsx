function Pagination({
  currentPage,
  handlePageChange,
  totalVehicles,
  vehiclesPerPage,
}) {
  return (
    <div className="flex justify-center items-center my-6 space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
        >
          &lt;
        </button>
      )}

      <span className="px-4 py-2 bg-blue-200 text-gray-900 rounded-md shadow-md">
        Page {currentPage}
      </span>

      {currentPage < Math.ceil(totalVehicles / vehiclesPerPage) && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
        >
          &gt;
        </button>
      )}
    </div>
  );
}

export default Pagination;
