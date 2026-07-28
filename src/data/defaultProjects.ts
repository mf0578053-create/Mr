export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  images?: string[];
  year: string;
}

export const defaultProjects: Project[] = [
  {
    id: 1,
    title: "WeVersity Courses & Hiring Campaign Series",
    category: "Mobile & Graphic Design Series",
    image: "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163611/3c4249c5-78ca-4d5a-839e-21942bdc0ca1_vwrnnr.png",
    images: [
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163611/3c4249c5-78ca-4d5a-839e-21942bdc0ca1_vwrnnr.png",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163590/App_2_ct0lti.png",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785163586/App_3_offks3.png"
    ],
    year: "2024"
  },
  {
    id: 2,
    title: "Creative Brand & Social Media Campaign Series",
    category: "Graphic Design & Branding",
    image: "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166153/105_nfkffv.jpg",
    images: [
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166153/105_nfkffv.jpg",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166157/106_npocgv.jpg",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166156/107_xq09gc.jpg",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166166/108_co71vu.jpg",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166166/109_eh4mts.jpg",
      "https://res.cloudinary.com/dsacnpxmq/image/upload/v1785166159/110_yu8gt1.jpg"
    ],
    year: "2024"
  },
  {
    id: 3,
    title: "Nova Social Media Campaign Assets",
    category: "Social Media & Visual Creatives",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200"
    ],
    year: "2024"
  },
  {
    id: 4,
    title: "Velvet Luxury Packaging & Print",
    category: "Packaging & Product Branding",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200"
    ],
    year: "2024"
  }
];

export function getSavedProjects(): Project[] {
  try {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse portfolio_projects from localStorage', e);
  }
  localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
  return defaultProjects;
}
