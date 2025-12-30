export const PRODUCTS = [
  {
    id: "tech-v1",
    name: "Tech Lighter V1",
    price: 89.90,
    description: "A futuristic, custom 3D printed lighter case with neon aesthetics.",
    slug: "tech-v1",
    image: "/images/lighter-placeholder.png",
    colors: ["black", "stone"],
  },
];

export const getProductBySlug = (slug: string) => {
  return PRODUCTS.find((p) => p.slug === slug);
};
