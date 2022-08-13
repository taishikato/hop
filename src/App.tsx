import { lazy } from "solid-js";
import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Layout from "./components/Layout";
import AppTop from "./pages/app/app-top";
const Profile = lazy(() => import("./pages/profile/profile"));

const App: Component = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/app" component={AppTop} />
        <Route path="/profile" component={Profile} />
      </Routes>
    </Layout>
  );
};

export default App;
