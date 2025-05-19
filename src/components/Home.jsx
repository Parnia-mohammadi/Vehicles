import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div>
      WELCOME
      <NavLink to={`/vehicles`}>Vehicle lists</NavLink>
    </div>
  );
}

export default Home;
