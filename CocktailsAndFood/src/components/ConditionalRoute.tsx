import { Navigate, Route } from "react-router-dom";

type ConditionalRouteProps = {
  path: string;
  checkIfTrue: any;
  elementIfTrue: JSX.Element;
  navigateIfFalse: string;
  replace?: boolean;
};

export const ConditionalRoute = ({
  path,
  checkIfTrue,
  elementIfTrue,
  navigateIfFalse,
  replace = true,
}: ConditionalRouteProps) => (
  <Route
    path={path}
    element={
      checkIfTrue ? (
        elementIfTrue
      ) : (
        <Navigate to={navigateIfFalse} replace={replace} />
      )
    }
  />
);
