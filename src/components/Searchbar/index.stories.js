import React from "react";
import { action } from "@storybook/addon-actions";
import Searchbar from "./index.tsx";


export default {
  title: "Components/Searchbar",
  component: Searchbar,
};

export const Normal = () => (
  <Searchbar
    onChange={action("clicked")}
    value={""}
    error={false}
    placeholder='placeholder'
  />
);