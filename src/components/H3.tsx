import { children } from "solid-js";

const H3 = (props) => {
  const c = children(() => props.children);

  return <h3 class="text-lg font-semibold">{c()}</h3>;
};

export default H3;
