import { NavLink } from "react-router-dom";

export const NavButton = ({
  param,
  children,
}: {
  param: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={`/${param}`}
      className={({ isActive }) => (isActive ? "text-green-600" : "text-black")}
    >
      {children}
    </NavLink>
  );
};
