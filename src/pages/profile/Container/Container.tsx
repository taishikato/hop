import { children } from "solid-js";

const Container = (props) => {
  const c = children(() => props.children);

  return <div class="p-5 rounded-3xl w-full bg-slate-900">{c()}</div>;
};

export default Container;
