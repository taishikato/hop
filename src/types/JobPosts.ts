export type JobPosts = {
  id: number;
  title: string;
  tags: string[];
  city: string;
  url: string;
  company: {
    name: string;
    logo_url?: string;
  };
};
