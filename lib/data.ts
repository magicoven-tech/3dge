export const PRODUCTS = [
  {
    id: "phone-holder",
    name: "Suporte de Celular",
    price: 49.90,
    description: "Um suporte elegante e minimalista para o seu smartphone. Design geométrico para estabilidade e estilo.",
    slug: "suporte-celular",
    image: "/globe.svg", // Using placeholder for now, user can update
    model: "/assets/3d/phone.glb",
    colors: ["stone", "black", "orange"],
  },
  {
    id: "napkin-holder",
    name: "Porta Guardanapos",
    price: 39.90,
    description: "Organize sua mesa com este porta guardanapos moderno e funcional. Impresso em 3D com alta precisão.",
    slug: "porta-guardanapos",
    image: "/globe.svg",
    model: "/assets/3d/guardanapo.glb",
    colors: ["white", "stone", "black"],
  },
  {
    id: "carabiner",
    name: "Mosquetão Tático",
    price: 29.90,
    description: "Mosquetão robusto e leve para uso diário. Design utilitário com estética futurista.",
    slug: "mosquetao",
    image: "/globe.svg",
    model: "/assets/3d/mosquetao.glb",
    colors: ["black", "green", "orange"],
  },
  {
    id: "lunar-lighter",
    name: "Isqueiro Lunar",
    price: 89.90,
    description: "Capa para isqueiro com textura inspirada na superfície lunar. Ergonomia e estilo em uma peça única.",
    slug: "isqueiro-lunar",
    image: "/globe.svg",
    model: "/assets/3d/isquerio_lunar.glb",
    colors: ["stone", "grey", "white"],
  },
];

export const getProductBySlug = (slug: string) => {
  return PRODUCTS.find((p) => p.slug === slug);
};
