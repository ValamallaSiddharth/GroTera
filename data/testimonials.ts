export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  impact: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

// Publish only customer-approved testimonials with verified names, roles, and images.
export const testimonials: Testimonial[] = [];
