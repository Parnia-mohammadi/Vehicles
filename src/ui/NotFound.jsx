import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

function NotFound() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/vehicles");
  };
  return (
    <div className="self-container rounded-lg items-center shadow-2xl dark:text-white">
      <p className="text-xl">⚠ Vehicle not found</p>
      <BackButton onClick={handleBack} />
    </div>
  );
}

export default NotFound;
