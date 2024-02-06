import React from "react";
import { store } from "@/redux/store";
import { redirect } from "next/navigation";

export const AuthComponent = (props: any) => {
  if (!store.getState().user.accessToken) {
    // Redirect to login page if not authenticated
    return redirect("/login");
  }

  return props.children;
};
