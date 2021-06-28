import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useProfile } from "../context/profilecontext";
import { Loader } from "rsuite";

function PrivateRoute({ children, ...routeProp }) {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return <Loader center vertical size="md" sped="slow" content="Loading" />;
  }

  if (!profile && !isLoading) {
    return <Redirect push to="/signin"></Redirect>;
  }

  return <Route path={routeProp}>{children}</Route>;
}

export default PrivateRoute;
