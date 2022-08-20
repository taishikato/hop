import { createSignal, createRoot } from "solid-js";
import type { JobPosts } from "../types/JobPosts";

const createJobPosts = () => {
  const [jobPosts, setJobPosts] = createSignal<
    { isDone: boolean; post: JobPosts }[]
  >([]);

  return { jobPosts, setJobPosts };
};

export default createRoot(createJobPosts);
