import { Link } from "react-router-dom";

export const ButtonToProductPage = ({
  destination,
  children,
}: {
  destination: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <Link to={`${destination}`}>
        <button className="hover:scale-105 p-2 rounded-[50px] text-[#262626] text-[16px] font-[600] text-center bg-[#FCD20A] hover:opacity-90">
          {children}
        </button>
      </Link>
    </>
  );
};
