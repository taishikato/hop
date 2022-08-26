export type JobPosts = {
  id: number;
  commitment: string;
  title: string;
  tags: string[];
  city: string;
  country: string;
  remote: boolean;
  url: string;
  company: {
    name: string;
    logo_url?: string;
  };
};
