export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  /** Slug of the product this article leads to. */
  product: string;
  body: BlogBlock[];
};

export const posts: BlogPost[] = [
  {
    slug: "choosing-upvc-windows",
    title: "How to Choose the Right uPVC Window for Your Home",
    excerpt: "Sliding, casement or tilt & turn? Here is how the main window styles differ and where each one works best.",
    category: "Doors & Windows",
    image: "/images/sbm/gallery-04.jpg",
    imageAlt: "Bright living room with large windows looking onto a garden",
    product: "upvc-windows-doors",
    body: [
      {
        type: "p",
        text: "A window is one of the few parts of a home you use every day and rarely replace. The right style depends on the room, the space around the opening and how much air you want to let in.",
      },
      { type: "h2", text: "Sliding windows" },
      {
        type: "p",
        text: "Sliding windows move along a track, so they never swing into the room or out over a walkway. That makes them a practical choice for balconies, wide openings and rooms where space near the window is limited.",
      },
      { type: "h2", text: "Casement windows" },
      {
        type: "p",
        text: "Casement windows are hinged at the side and open like a door. Because the whole sash swings clear, they let in plenty of fresh air. They do need clear space to open, so check what sits around the window first.",
      },
      { type: "h2", text: "Tilt & turn windows" },
      {
        type: "p",
        text: "Tilt & turn windows work in two ways. Tilt the top inward for ventilation, or turn the whole window inward to open it fully. Opening inward also makes the outside of the glass easy to reach for cleaning, which helps on upper floors.",
      },
      { type: "h2", text: "What to check before you decide" },
      {
        type: "ul",
        items: [
          "How much space there is to open the window, inside and outside",
          "How much ventilation the room needs",
          "How easily you can reach the glass for cleaning",
          "Whether the room faces a busy road or strong afternoon sun",
        ],
      },
      {
        type: "p",
        text: "All SBM GOLD uPVC windows are built on multi-chambered profiles designed to European standards, with insulation against heat and outdoor noise. Our range also includes villa windows, and our team can help you work out which style suits each room.",
      },
    ],
  },
  {
    slug: "hdpe-or-upvc-pipes",
    title: "HDPE or uPVC Pipes: How to Decide Which You Need",
    excerpt: "Both carry water reliably, but they are made for different jobs. A simple guide to choosing the right pipe.",
    category: "Pipes",
    image: "/images/sbm/emblem-01.jpg",
    imageAlt: "Pipe extrusion line at the SBM GOLD manufacturing plant",
    product: "hdpe-pipes",
    body: [
      {
        type: "p",
        text: "HDPE and uPVC pipes are often mentioned together, but they do different jobs. Choosing well comes down to where the pipe is going and what it needs to carry.",
      },
      { type: "h2", text: "When to choose HDPE" },
      {
        type: "p",
        text: "HDPE pipes suit water supply, industrial and infrastructure work. SBM GOLD makes them from 20mm to 630mm to IS:4984. Sections are butt-welded, which gives a seamless joint and a leak-free line, and that is especially useful on long runs.",
      },
      { type: "h2", text: "When to choose uPVC" },
      {
        type: "p",
        text: "uPVC is a common choice for plumbing in homes and buildings. Our high-pressure solvent weld pipes are made to IS:4985 and are MCGM approved for potable water. They also cost 40–50% less than G.I., which makes a real difference across a whole building.",
      },
      { type: "h2", text: "What about farms?" },
      {
        type: "p",
        text: "For agricultural use, look at pipes made for the job. Our range includes agri, boring and drip irrigation pipes.",
      },
      { type: "h2", text: "A quick way to decide" },
      {
        type: "ul",
        items: [
          "Plumbing inside a home or building: uPVC",
          "Water supply lines, industrial or infrastructure work: HDPE",
          "Fields, borewells and drip systems: agri, boring and drip irrigation pipes",
        ],
      },
      {
        type: "p",
        text: "Every project is different, so share your requirements with our team and we will help you choose the right pipe and size.",
      },
    ],
  },
  {
    slug: "choosing-a-water-tank",
    title: "Choosing a Water Tank: Capacity, Layers and Colour",
    excerpt: "Three simple questions that help you pick a tank that suits your home or building.",
    category: "Water Tanks",
    image: "/images/sbm/feature-02.jpg?v=2",
    imageAlt: "Green SBM GOLD water tank with pipes",
    product: "water-tanks",
    body: [
      {
        type: "p",
        text: "A water tank is easy to overlook until it causes a problem. Before you buy, it helps to answer three questions: how much water you need, how the tank is built, and where it will sit.",
      },
      { type: "h2", text: "How much capacity do you need?" },
      {
        type: "p",
        text: "Think about how many people use the water each day, how often your supply refills the tank, and how much space and support you have on site. SBM GOLD tanks range from 100L to 10,000L, so there are options from small homes to larger buildings.",
      },
      { type: "h2", text: "How many layers?" },
      {
        type: "p",
        text: "Our roto-moulded tanks come in 2, 3 and 4 layers. If you are unsure which suits your site, our team can talk you through the options.",
      },
      { type: "h2", text: "Which colour?" },
      {
        type: "p",
        text: "Our tanks are available in green, blue, black and white, so you can choose what suits your building.",
      },
      { type: "h2", text: "What to look for in any tank" },
      {
        type: "ul",
        items: [
          "Food-grade material for storing water",
          "Anti-bacterial properties",
          "UV resistance if the tank will sit in direct sun",
          "A capacity that suits your daily use and supply",
        ],
      },
      {
        type: "p",
        text: "SBM GOLD water tanks are food-grade, UV-resistant and anti-bacterial. Tell us about your building and we will help you choose the right size.",
      },
    ],
  },
  {
    slug: "why-wpc-door-frames",
    title: "Why Choose WPC Door Frames?",
    excerpt: "Damp and termites are two of the biggest problems for door frames. Here is how WPC helps with both.",
    category: "Doors & Windows",
    image: "/images/sbm/product-02.jpg",
    imageAlt: "SBM GOLD WPC door frame",
    product: "wpc-door-frames",
    body: [
      {
        type: "p",
        text: "A door frame has to stay strong and straight for years, often in places that see plenty of moisture. Damp and termites are two common problems for frames, which is why many builders and homeowners look at Wood Plastic Composite, or WPC.",
      },
      { type: "h2", text: "Made for damp areas" },
      {
        type: "p",
        text: "SBM GOLD WPC door frames are 100% waterproof, which makes them a sensible choice wherever moisture is a concern, such as bathrooms, kitchens and ground-floor rooms.",
      },
      { type: "h2", text: "Termite-proof" },
      {
        type: "p",
        text: "Termites can quietly damage a frame long before you notice. Our WPC frames are termite-proof, so that is one less thing to worry about.",
      },
      { type: "h2", text: "Ready to install and paint" },
      {
        type: "p",
        text: "The frames arrive ready to install and ready to paint, so you can match them to the rest of the room.",
      },
      { type: "h2", text: "Choosing a size" },
      {
        type: "ul",
        items: ["5×2.5 inches", "4×2.5 inches", "3×2 inches"],
      },
      {
        type: "p",
        text: "Not sure which size suits your opening? Our team can help you choose before you order.",
      },
    ],
  },
  {
    slug: "wall-putty-before-painting",
    title: "Why Wall Putty Matters Before You Paint",
    excerpt: "A good paint finish starts with the surface underneath. Here is what wall putty does and what to look for.",
    category: "Wall Putty",
    image: "/images/sbm/product-wall-putty.jpg",
    imageAlt: "SBM GOLD wall putty bags",
    product: "wall-putty",
    body: [
      {
        type: "p",
        text: "Paint shows what is underneath it. Small dents, rough patches and uneven plaster can all remain visible after the final coat. Wall putty fills and smooths the surface first, so the paint has an even base.",
      },
      { type: "h2", text: "What to look for in a wall putty" },
      {
        type: "ul",
        items: [
          "A smooth, refined finish",
          "Good spread, so it is easy to work with",
          "Strong adhesion to the wall",
          "Suitability for the wall you are working on, interior or exterior",
        ],
      },
      { type: "h2", text: "Prepare the wall first" },
      {
        type: "p",
        text: "Putty works best on a clean surface. Remove dust, loose material and old flaking paint before you start, then follow the instructions on the pack for mixing, coats and drying time.",
      },
      { type: "h2", text: "About SBM GOLD Wall Putty" },
      {
        type: "p",
        text: "SBM GOLD Wall Putty is white cement based and made for both interior and exterior walls. It is scratch, UV and water resistant, and helps reduce cracking. From rough to refined.",
      },
    ],
  },
  {
    slug: "inside-quality-control",
    title: "Inside SBM GOLD Quality Control",
    excerpt: "Certification, automated extrusion and batch checks: how we keep every profile true to spec.",
    category: "Inside SBM GOLD",
    image: "/images/sbm/quality-01.jpg",
    imageAlt: "SBM GOLD quality inspector measuring a uPVC profile with a caliper",
    product: "upvc-windows-doors",
    body: [
      {
        type: "p",
        text: "Windows and pipes are expected to perform for years, so consistency matters from the very first metre. Here are some of the ways we hold our products to spec.",
      },
      { type: "h2", text: "Certified processes" },
      {
        type: "p",
        text: "SBM GOLD is ISO and BIS certified, including ISO 9001:2015 and ISO 4427.",
      },
      { type: "h2", text: "Checks on every batch" },
      {
        type: "p",
        text: "Caliper and wall-thickness checks on every batch keep each profile true to spec.",
      },
      { type: "h2", text: "Automated extrusion" },
      {
        type: "p",
        text: "PLC-controlled lines hold every profile wall uniform, metre after metre.",
      },
      { type: "h2", text: "Protected on the way to site" },
      {
        type: "p",
        text: "A factory-applied protective film keeps profiles scratch-free from our plant to your site.",
      },
      {
        type: "p",
        text: "All of this happens at our 2,25,000 sq ft manufacturing facility, which has a capacity of 22,000 MT a year and supplies a network of 300+ dealers.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

export const getOtherPosts = (post: BlogPost, count = 3) => posts.filter((p) => p.slug !== post.slug).slice(0, count);

export function readingTime(post: BlogPost) {
  const words = post.body
    .flatMap((block) => (block.type === "ul" ? block.items : [block.text]))
    .join(" ")
    .split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
