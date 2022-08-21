export type JobPosts = {
  id: number;
  commitment: string;
  title: string;
  tags: string[];
  city: string;
  country: string;
  url: string;
  company: {
    name: string;
    logo_url?: string;
  };
};
