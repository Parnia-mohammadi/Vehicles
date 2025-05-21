function BackButton({ className, onClick }) {
  return (
    <button
      className={`text-gray-700 my-0 px-2 py-0 dark:text-white dark:bg-gray-400 dark:hover:bg-gray-500 rounded-sm hover:bg-blue-200 ${className}`}
      onClick={onClick}
    >
      ← Back
    </button>
  );
}

export default BackButton;
