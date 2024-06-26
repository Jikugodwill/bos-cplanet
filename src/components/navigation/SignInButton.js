import React from "react";
import { GrayBorderButton } from "../common/buttons/GrayBorderButton";

export function SignInButton(props) {
  return (
    <GrayBorderButton
      {...props}
      className="nav-sign-in-btn"
      onClick={props.onSignIn}
    >
      Sign In
    </GrayBorderButton>
  );
}
