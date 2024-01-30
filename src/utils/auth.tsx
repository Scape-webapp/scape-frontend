import React from "react";
import { store } from "@/redux/store";
import { redirect } from "next/navigation";

export const auth = (WrappedComponent: any) => {
  const AuthComponent = ({ ...props }) => {
    if (!store.getState().user.accessToken) {
      // Redirect to login page if not authenticated
      return redirect("/login");
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
