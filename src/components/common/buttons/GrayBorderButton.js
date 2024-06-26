import React from "react";
import { Button } from "./Button";
import styled from "styled-components";

const StyledButton = styled(Button)`
  display: flex;
  width: 155px;
  height: 40px;
  padding: 8px 15px 8px 14px;
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background: ${(props) =>
    props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
      ? "transparent"
      : "#fff"};
  border: 1px solid
    ${(props) =>
      props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
        ? "#fff"
        : "#000"};
  color: ${(props) =>
    props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
      ? "#fff"
      : "#000"};
  &:hover {
    background: ${(props) =>
      props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
        ? "#fff"
        : "#000"};
    color: ${(props) =>
      props?.currentPage?.toLowerCase() === "home" && !props.scrolledYet
        ? "#000"
        : "#fff"};
  }
`;

export function GrayBorderButton(props) {
  return <StyledButton {...props}>{props.children}</StyledButton>;
}
