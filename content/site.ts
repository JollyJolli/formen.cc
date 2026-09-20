export type Language = {
  name: string;
  level: string;
};

export type Personal = {
  name: string;
  title: string;
  focus: string;
  location: string;
  education: string;
  email: string;
  github: string;
  skills: string[];
  languages: Language[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
  category: "Data" | "Tool" | "Game" | "Visual" | "Contribution";
  type: string;
  status: "Live" | "New" | "Contribution";
};

export const personal: Personal = {
  name: "Formen",
  title: "Computer Science",
  focus: "I like web development. At university I also learn other parts of Computer Science, but building for the web is what I enjoy most.",
  location: "Germany",
  education: "Computer Science",
  email: "formen@duck.com",
  github: "https://github.com/JollyJolli",
  skills: [
    "JavaScript",
    "TypeScript",
    "Next.js",
    "Node.js",
    "HTML",
    "CSS",
    "C",
    "C++",
    "Problem solving",
    "Open-source work",
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "Portuguese", level: "Native" },
    { name: "English", level: "C1" },
    { name: "German", level: "A1" },
  ],
};

export const projects: Project[] = [
  {
    slug: "sports",
    title: "Sports",
    description: "Find information about players from different sports.",
    href: "https://sports.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "cocktails",
    title: "Cocktails",
    description: "Search cocktail information and details.",
    href: "https://cktls.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "guess-the-flag",
    title: "Guess the Flag",
    description: "A small game for guessing country flags.",
    href: "https://flag-game.formen.cc",
    category: "Game",
    type: "game",
    status: "Live",
  },
  {
    slug: "rick-and-morty-characters",
    title: "Rick and Morty Characters",
    description: "Search characters from Rick and Morty.",
    href: "https://rm.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "food",
    title: "Food",
    description: "Find basic information about food.",
    href: "https://food.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "disney",
    title: "Disney",
    description: "Search Disney characters.",
    href: "https://disney.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "the-office",
    title: "The Office",
    description: "Search characters from The Office.",
    href: "https://office.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "bitcoin",
    title: "Bitcoin",
    description: "Check the Bitcoin value in dollars.",
    href: "https://btc.formen.cc",
    category: "Data",
    type: "tracker",
    status: "Live",
  },
  {
    slug: "search-countries",
    title: "Search Countries",
    description: "Find information about countries.",
    href: "https://paises.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "qr-generator",
    title: "QR Generator",
    description: "Create a QR code from your own text or link.",
    href: "https://qr.formen.cc",
    category: "Tool",
    type: "generator",
    status: "Live",
  },
  {
    slug: "weather",
    title: "Weather",
    description: "Check the weather in a city.",
    href: "https://clima.formen.cc",
    category: "Data",
    type: "weather",
    status: "Live",
  },
  {
    slug: "tip-calculator",
    title: "Tip Calculator",
    description: "Calculate a tip for meals and services.",
    href: "https://tip.formen.cc",
    category: "Tool",
    type: "calculator",
    status: "Live",
  },
  {
    slug: "spacex",
    title: "SpaceX",
    description: "See SpaceX launch information and history.",
    href: "https://spacex.formen.cc",
    category: "Data",
    type: "explorer",
    status: "Live",
  },
  {
    slug: "us-presidents",
    title: "US Presidents",
    description: "Explore the list of U.S. presidents.",
    href: "https://usa.formen.cc",
    category: "Data",
    type: "reference",
    status: "Live",
  },
  {
    slug: "lastfm",
    title: "Last.fm",
    description: "Find information about a Last.fm user.",
    href: "https://lastfm.formen.cc",
    category: "Data",
    type: "lookup",
    status: "Live",
  },
  {
    slug: "taximeter",
    title: "Taximeter",
    description: "Calculate the final value on a taximeter.",
    href: "https://taximetro.formen.cc",
    category: "Tool",
    type: "calculator",
    status: "Live",
  },
  {
    slug: "contribution-cards",
    title: "Contribution Cards",
    description: "Explore and create contribution cards.",
    href: "https://contribution-cards.netlify.app/",
    category: "Contribution",
    type: "creator",
    status: "Contribution",
  },
  {
    slug: "emoji-finder",
    title: "Emoji Finder",
    description: "Search and explore emoji information.",
    href: "https://nmoji.netlify.app/",
    category: "Contribution",
    type: "lookup",
    status: "Contribution",
  },
  {
    slug: "information-and-games",
    title: "Information and Games",
    description: "A page with many small facts and games.",
    href: "https://jackpurrin.me/",
    category: "Contribution",
    type: "collection",
    status: "Contribution",
  },
  {
    slug: "retro-stopwatch",
    title: "Retro Stopwatch",
    description: "A stopwatch with an old digital style.",
    href: "https://cronometro.retro.formen.cc",
    category: "Tool",
    type: "timer",
    status: "Live",
  },
  {
    slug: "pass-requirement-calculator",
    title: "Pass Requirement Calculator",
    description: "Calculate the grade you need to pass a course.",
    href: "https://cnpa.formen.cc",
    category: "Tool",
    type: "calculator",
    status: "Live",
  },
  {
    slug: "invest-simulator",
    title: "Invest Simulator",
    description: "A clicker game about earning and investing money.",
    href: "https://invest.formen.cc",
    category: "Game",
    type: "game",
    status: "New",
  },
  {
    slug: "sorting-algorithm-visualizer",
    title: "Sorting Algorithm Visualizer",
    description: "See how sorting algorithms work step by step.",
    href: "https://sortviz.formen.cc/",
    category: "Visual",
    type: "algorithm",
    status: "Contribution",
  },
  {
    slug: "maze-solver-visualizer",
    title: "Maze Solver Visualizer",
    description: "See how maze-solving algorithms move through a grid.",
    href: "https://mazeviz.formen.cc/",
    category: "Visual",
    type: "algorithm",
    status: "Contribution",
  },
  {
    slug: "discount-calculator",
    title: "Discount Calculator",
    description: "Calculate discounts quickly.",
    href: "https://descuentos.formen.cc/",
    category: "Tool",
    type: "calculator",
    status: "Contribution",
  },
];
