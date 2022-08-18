import { lazy } from "solid-js";
import type { Component } from "solid-js";
import { Routes, Route } from "@solidjs/router";
import Layout from "./components/Layout";
import Home from "./pages/home/home";
import AppTop from "./pages/app/app-top";
const Profile = lazy(() => import("./pages/profile/profile"));
const Welcome = lazy(() => import("./pages/welcome/welcome"));

const App: Component = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" component={Home} />
        <Route path="/app" component={AppTop} />
        <Route path="/profile" component={Profile} />
        <Route path="/welcome" component={Welcome} />
      </Routes>
    </Layout>
  );
};

export default App;
