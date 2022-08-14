import { createSignal, createRoot } from "solid-js";

const createLoginStatus = () => {
  const [isLogin, setIsLogin] = createSignal(false);
  const login = () => setIsLogin(true);
  const logout = () => setIsLogin(false);

  return { login, logout, isLogin };
};

export default createRoot(createLoginStatus);
