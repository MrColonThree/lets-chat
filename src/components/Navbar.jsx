import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <h2 className="text-center text-2xl">This is Navbar</h2>
      <div>
        <ul>
          <li>
           <NavLink to="/">Home</NavLink>
          </li>
          <li >
          <NavLink to="/login">Login</NavLink>
          </li>
          <li >
          <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;