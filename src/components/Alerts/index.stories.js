import React from "react";
import { MemoryRouter } from "react-router-dom";
import Alert from "./index";

export default {
  title: "Components/Alert",
  component: Alert,
};

export const ConfirmedAlerts = () => (
  <MemoryRouter>
    <Alert confirmedCases={5} suspectedCases={2} safeCases={1} />
  </MemoryRouter>
);

export const SuspectedAlerts = () => (
  <MemoryRouter>
    <Alert confirmedCases={0} suspectedCases={2} safeCases={1} />
  </MemoryRouter>
);

export const SafeAlerts = () => (
  <MemoryRouter>
    <Alert confirmedCases={0} suspectedCases={0} safeCases={1} />
  </MemoryRouter>
);

export const NoAlerts = () => (
  <MemoryRouter>
    <Alert confirmedCases={0} suspectedCases={0} safeCases={0} />
  </MemoryRouter>
);
