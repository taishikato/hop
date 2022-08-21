import { createSignal, createRoot } from "solid-js";
import type { JobPosts } from "../types/JobPosts";

const createJobPosts = () => {
  const [jobPosts, setJobPosts] = createSignal<
    { isDone: boolean; post: JobPosts }[]
  >([]);

  const initJobPosts = () => setJobPosts([]);

  return { jobPosts, setJobPosts, initJobPosts };
};

export default createRoot(createJobPosts);
