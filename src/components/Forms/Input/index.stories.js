import React from "react";
import { action } from "@storybook/addon-actions";
import Input from "./index.tsx";

export default {
  title: "Components/Input",
  component: Input,
};

export const NormalWithLabel = () => (
  <Input
    onChange={action("clicked")}
    label="With Label"
    value={""}
    error={false}
  />
);

export const WithInLineLabel = () => (
  <Input
    onChange={action("clicked")}
    label="With Label"
    value={""}
    inLineLabel={true}
  />
);

export const NormalRequired = () => (
  <Input
    onChange={action("clicked")}
    label="With Label"
    value={""}
    required={true}
  />
);

export const NormalWithError = () => (
  <Input
    onChange={action("clicked")}
    label="With Label"
    value={""}
    error="there is an error"
  />
);
