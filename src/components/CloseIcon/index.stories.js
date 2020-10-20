import React from "react";
import CloseIcon from "./index.tsx";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/CloseIcon",
  component: CloseIcon,
};

export const Normal = () => {
  return (
    <CloseIcon onClick={action("clicked")}/>
  )
};