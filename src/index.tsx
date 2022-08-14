/* @refresh reload */
import "./index.css";
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import {
  HopeProvider,
  NotificationsProvider,
  HopeThemeConfig,
} from "@hope-ui/solid";

import App from "./App";

const config: HopeThemeConfig = {
  initialColorMode: "dark",
};

render(
  () => (
    <Router>
      <HopeProvider config={config}>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </HopeProvider>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
);
