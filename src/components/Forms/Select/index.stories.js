import React from "react";
import { action } from "@storybook/addon-actions";
import Select from "./index.tsx";

export default {
  title: "Components/Select",
  component: Select,
};

export const NormalWithLabel = () => (
  <Select
    onChange={action("clicked")}
    label="With Label"
    value={""}
    error={false}
    options={[
      {
        id: "test",
        value: "test",
        option: "test text",
      },
    ]}
  />
);

export const NormalWithDefault = () => (
  <Select
    onChange={action("clicked")}
    label="With Label"
    value={""}
    hasDefaultValue={true}
    placeholder="-- this is default -- "
    options={[
      {
        id: "test",
        value: "test",
        option: "test text",
      },
    ]}
  />
);

export const WithInLineLabel = () => (
  <Select
    onChange={action("clicked")}
    label="With Label"
    value={""}
    inLineLabel={true}
    options={[
      {
        id: "test",
        value: "test",
        option: "test text",
      },
    ]}
  />
);

export const NormalRequired = () => (
  <Select
    onChange={action("clicked")}
    label="With Label"
    value={""}
    required={true}
    options={[
      {
        id: "test",
        value: "test",
        option: "test text",
      },
    ]}
  />
);

export const NormalWithError = () => (
  <Select
    onChange={action("clicked")}
    label="With Label"
    value={""}
    error="there is an error"
    options={[
      {
        id: "test",
        value: "test",
        option: "test text",
      },
    ]}
  />
);
