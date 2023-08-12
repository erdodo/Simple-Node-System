import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";

function App({ children }) {
  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider>{children}</NextUIProvider>;
}
