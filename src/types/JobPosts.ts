export type JobPosts = {
  title: string;
  tags: string[];
  city: string;
  url: string;
  company: {
    name: string;
    logo_url?: string;
  };
};
