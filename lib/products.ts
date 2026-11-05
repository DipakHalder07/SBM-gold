export type ProductCategory = "Doors & Windows" | "Pipes" | "Tanks & Finishes";

export const productCategories: ProductCategory[] = ["Doors & Windows", "Pipes", "Tanks & Finishes"];

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  /** Card text, shown on the home page and the product list. */
  short: string;
  /** Short line under the title on the detail page. */
  tagline: string;
  overview: string[];
  image: string;
  imageAlt: string;
  /** Extra photos for the detail page gallery. */
  gallery?: { src: string; alt: string }[];
  features: { title: string; text: string }[];
  specs: { label: string; value: string }[];
  /** Variants or uses, shown as tags. */
  range: { title: string; items: string[] };
  related: string[];
};

export const products: Product[] = [
  {
    slug: "upvc-windows-doors",
    name: "uPVC Windows & Doors",
    category: "Doors & Windows",
    short:
      "Sliding, casement, tilt & turn and villa windows, plus slide & fold, sliding and internal doors, built on our Sliding, Casement and Accessories profile series.",
    tagline:
      "Windows and doors on SBM GOLD profiles, crafted with German technology for quieter, cooler Indian homes.",
    overview: [
      "SBM GOLD uPVC windows and doors bring sleek aesthetics and robust engineering together. Our multi-chambered profiles are designed to European standards, work with European hardware systems and come with advanced locking for enhanced security.",
      "They are weather-sealed, termite-proof and low maintenance, made to resist sun, rain and humidity through every season, and backed by a 20-year warranty.",
    ],
    image: "/images/sbm/product-01.jpg",
    imageAlt: "SBM GOLD uPVC windows",
    gallery: [
      { src: "/images/sbm/feature-01.jpg?v=2", alt: "uPVC sliding door with profile samples" },
      { src: "/images/sbm/feature-03.jpg", alt: "Wood-finish uPVC window overlooking hills at sunset" },
      { src: "/images/sbm/feature-04.jpg", alt: "uPVC sliding doors opening onto a dining room" },
      { src: "/images/sbm/recruit-slide-01.jpg", alt: "SBM GOLD uPVC windows on a red background" },
    ],
    features: [
      {
        title: "Multi-Chambered Profiles",
        text: "Superior heat insulation and reduced outdoor noise keep rooms calm and comfortable.",
      },
      {
        title: "European Hardware",
        text: "Designed to European standards and compatible with European hardware systems.",
      },
      {
        title: "Advanced Locking",
        text: "Advanced locking systems add security to every window and door.",
      },
      {
        title: "All-Weather Durability",
        text: "Weather-sealed, termite-proof and low maintenance against sun, rain and humidity.",
      },
      {
        title: "Your Choice of Finish",
        text: "Customisable styles and finishes, with professional installation by our own team.",
      },
      {
        title: "Made to Last",
        text: "Eco-friendly, recyclable uPVC with a factory-applied protective film and reliable after-sales support.",
      },
    ],
    specs: [
      { label: "Window types", value: "Sliding, casement, tilt & turn, villa" },
      { label: "Door types", value: "Slide & fold, sliding, internal" },
      { label: "Profile series", value: "Sliding, Casement, Accessories" },
      { label: "Warranty", value: "20 years" },
      { label: "Installation", value: "By the SBM GOLD team" },
    ],
    range: {
      title: "Available styles",
      items: ["Sliding windows", "Casement windows", "Tilt & turn windows", "Villa windows", "Slide & fold doors", "Sliding doors", "Internal doors"],
    },
    related: ["wpc-door-frames", "wall-putty", "water-tanks"],
  },
  {
    slug: "wpc-door-frames",
    name: "WPC Door Frames",
    category: "Doors & Windows",
    short:
      "100% waterproof and termite-proof Wood Plastic Composite frames, ready to install and paint. Sizes 5×2.5, 4×2.5 and 3×2 inches.",
    tagline: "Wood Plastic Composite door frames that stay free of water and termite damage, ready to install and paint.",
    overview: [
      "SBM GOLD WPC door frames are made from Wood Plastic Composite, giving you a frame that is 100% waterproof and termite-proof.",
      "They arrive ready to install and paint, and come in three standard sizes to suit your opening.",
    ],
    image: "/images/sbm/product-02.jpg",
    imageAlt: "SBM GOLD WPC door frame",
    features: [
      {
        title: "100% Waterproof",
        text: "Wood Plastic Composite gives you a frame that is fully waterproof.",
      },
      {
        title: "Termite-Proof",
        text: "Built to keep termites out, so the frame stays sound over time.",
      },
      {
        title: "Ready to Finish",
        text: "Ready to install and ready to paint in the shade you choose.",
      },
    ],
    specs: [
      { label: "Material", value: "Wood Plastic Composite (WPC)" },
      { label: "Sizes", value: "5×2.5, 4×2.5 and 3×2 inches" },
      { label: "Water resistance", value: "100% waterproof" },
      { label: "Termite resistance", value: "Termite-proof" },
      { label: "Finish", value: "Paintable" },
    ],
    range: {
      title: "Available sizes",
      items: ["5×2.5 inches", "4×2.5 inches", "3×2 inches"],
    },
    related: ["upvc-windows-doors", "wall-putty", "hdpe-pipes"],
  },
  {
    slug: "hdpe-pipes",
    name: "HDPE Pipes",
    category: "Pipes",
    short:
      "Resilient, reliable and leak-free HDPE pipes from 20mm to 630mm (IS:4984), with butt-welded seamless joints for water supply, industry and infrastructure.",
    tagline: "Resilient, reliable and leak-free pipes from 20mm to 630mm for water supply, industry and infrastructure.",
    overview: [
      "SBM GOLD HDPE pipes are manufactured to IS:4984 in sizes from 20mm to 630mm. Butt-welded, seamless joints keep the line leak-free from end to end.",
      "In 2023, SBM GOLD became the first company in North East India to manufacture 450mm HDPE pipes.",
    ],
    image: "/images/sbm/product-hdpe-pipes.jpg",
    imageAlt: "SBM GOLD HDPE pipes",
    gallery: [
      { src: "/images/sbm/emblem-03.jpg", alt: "Inspector checking an SBM GOLD HDPE pipe with a caliper" },
      { src: "/images/sbm/emblem-02.jpg", alt: "SBM GOLD engineer with stacked HDPE pipes" },
      { src: "/images/sbm/emblem-01.jpg", alt: "HDPE pipe extrusion line at the SBM GOLD plant" },
    ],
    features: [
      {
        title: "Wide Size Range",
        text: "From 20mm to 630mm, including the 450mm size first made in North East India by SBM GOLD.",
      },
      {
        title: "Seamless Joints",
        text: "Butt-welded joints give a seamless, leak-free line.",
      },
      {
        title: "IS:4984 Standard",
        text: "Manufactured to the IS:4984 standard for dependable performance in the field.",
      },
    ],
    specs: [
      { label: "Size range", value: "20mm to 630mm" },
      { label: "Standard", value: "IS:4984" },
      { label: "Jointing", value: "Butt-welded, seamless" },
      { label: "Applications", value: "Water supply, industry, infrastructure" },
    ],
    range: {
      title: "Used for",
      items: ["Water supply", "Industry", "Infrastructure"],
    },
    related: ["upvc-agri-pipes", "water-tanks", "upvc-windows-doors"],
  },
  {
    slug: "upvc-agri-pipes",
    name: "uPVC & Agri Pipes",
    category: "Pipes",
    short:
      "High-pressure solvent weld plumbing (IS:4985), MCGM approved for potable water and 40–50% cheaper than G.I. Plus agri, boring and drip irrigation pipes.",
    tagline: "High-pressure plumbing approved for potable water, plus pipes for agriculture, boring and drip irrigation.",
    overview: [
      "SBM GOLD uPVC pipes are high-pressure solvent weld plumbing pipes made to IS:4985. They are MCGM approved for potable water and cost 40–50% less than G.I.",
      "The range also covers the field, with agri, boring and drip irrigation pipes.",
    ],
    image: "/images/sbm/product-upvc-pipes.jpg",
    imageAlt: "SBM GOLD uPVC pipes",
    gallery: [
      { src: "/images/sbm/recruit-slide-06.jpg", alt: "Drip irrigation line watering seedlings" },
      { src: "/images/sbm/recruit-slide-05.jpg", alt: "Bundles of SBM GOLD pipes in blue packaging" },
    ],
    features: [
      {
        title: "Approved for Potable Water",
        text: "MCGM approved for carrying potable water.",
      },
      {
        title: "High-Pressure Plumbing",
        text: "Solvent weld pipes made to IS:4985 for high-pressure plumbing.",
      },
      {
        title: "40–50% Cheaper Than G.I.",
        text: "A cost-effective alternative to galvanised iron plumbing.",
      },
    ],
    specs: [
      { label: "Standard", value: "IS:4985" },
      { label: "Jointing", value: "Solvent weld" },
      { label: "Approval", value: "MCGM approved for potable water" },
      { label: "Cost against G.I.", value: "40–50% cheaper" },
    ],
    range: {
      title: "Available types",
      items: ["Plumbing pipes", "Agri pipes", "Boring pipes", "Drip irrigation pipes"],
    },
    related: ["hdpe-pipes", "water-tanks", "wall-putty"],
  },
  {
    slug: "water-tanks",
    name: "Water Tanks",
    category: "Tanks & Finishes",
    short:
      "Roto-moulded, food-grade, UV-resistant and anti-bacterial tanks from 100L to 10,000L in 2, 3 and 4 layers. Green, blue, black and white.",
    tagline: "Roto-moulded, food-grade tanks from 100L to 10,000L in 2, 3 and 4 layers.",
    overview: [
      "SBM GOLD water tanks are roto-moulded from food-grade material, with UV-resistant and anti-bacterial properties.",
      "Choose a capacity from 100L to 10,000L, in 2, 3 or 4 layers, and in green, blue, black or white.",
    ],
    image: "/images/sbm/product-water-tank.jpg",
    imageAlt: "SBM GOLD water tanks in green, blue, black and white",
    gallery: [
      { src: "/images/sbm/feature-02.jpg?v=2", alt: "Green SBM GOLD water tank with pipes" },
      { src: "/images/sbm/emblem-04.jpg", alt: "SBM GOLD engineer with finished water tanks" },
    ],
    features: [
      {
        title: "Food-Grade",
        text: "Food-grade and anti-bacterial, made for storing water.",
      },
      {
        title: "UV-Resistant",
        text: "UV-resistant construction made for life under the sun.",
      },
      {
        title: "2, 3 or 4 Layers",
        text: "Roto-moulded tanks in a choice of 2, 3 or 4 layers.",
      },
    ],
    specs: [
      { label: "Capacity", value: "100L to 10,000L" },
      { label: "Layers", value: "2, 3 and 4" },
      { label: "Manufacturing", value: "Roto-moulded" },
      { label: "Material", value: "Food-grade, anti-bacterial" },
      { label: "UV protection", value: "UV-resistant" },
    ],
    range: {
      title: "Available colours",
      items: ["Green", "Blue", "Black", "White"],
    },
    related: ["upvc-agri-pipes", "hdpe-pipes", "wall-putty"],
  },
  {
    slug: "wall-putty",
    name: "Wall Putty",
    category: "Tanks & Finishes",
    short:
      "White cement based putty for interior and exterior walls: a smooth, refined finish with excellent spread and adhesion. From rough to refined.",
    tagline: "White cement based putty for interior and exterior walls. From rough to refined.",
    overview: [
      "SBM GOLD Wall Putty is a white cement based putty for interior and exterior walls. It gives a smooth, refined finish with excellent spread and adhesion.",
      "It is scratch, UV and water resistant, and helps reduce cracking.",
    ],
    image: "/images/sbm/product-wall-putty.jpg",
    imageAlt: "SBM GOLD wall putty bags",
    gallery: [{ src: "/images/sbm/recruit-slide-03.jpg", alt: "SBM GOLD wall putty bags" }],
    features: [
      {
        title: "Smooth, Refined Finish",
        text: "Takes rough walls to a smooth, refined surface.",
      },
      {
        title: "Spread & Adhesion",
        text: "Excellent spread and adhesion on interior and exterior walls.",
      },
      {
        title: "Built-In Resistance",
        text: "Scratch, UV and water resistant, and helps reduce cracking.",
      },
    ],
    specs: [
      { label: "Base", value: "White cement" },
      { label: "Use", value: "Interior and exterior walls" },
      { label: "Finish", value: "Smooth, refined" },
      { label: "Resistance", value: "Scratch, UV and water" },
      { label: "Cracking", value: "Helps reduce cracking" },
    ],
    range: {
      title: "Used on",
      items: ["Interior walls", "Exterior walls"],
    },
    related: ["upvc-windows-doors", "wpc-door-frames", "water-tanks"],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const getRelated = (product: Product) =>
  product.related.map(getProduct).filter((p): p is Product => Boolean(p));
