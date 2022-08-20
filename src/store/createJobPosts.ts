import { createSignal, createRoot } from "solid-js";
import type { JobPosts } from "../types/JobPosts";

const createJobPosts = () => {
  const [jobPosts, setJobPosts] = createSignal<JobPosts[]>([]);

  return { jobPosts, setJobPosts };
};

export default createRoot(createJobPosts);
