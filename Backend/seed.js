
require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Templete = require("./Model/templeteModel");

const seedData = [
  {
    name: "Portfolio Template",
    description: "A clean and modern personal portfolio website.",
    thumbnail_url: "https://placehold.co/600x400?text=Portfolio",
    category: "Portfolio"
  },
  {
    name: "E-commerce Template",
    description: "An online shopping website with product listings.",
    thumbnail_url: "https://placehold.co/600x400?text=Ecommerce",
    category: "E-commerce"
  },
  {
    name: "Blog Template",
    description: "A responsive blog layout for articles and stories.",
    thumbnail_url: "https://placehold.co/600x400?text=Blog",
    category: "Blog"
  },
  {
    name: "Restaurant Template",
    description: "A restaurant website with menu and contact details.",
    thumbnail_url: "https://placehold.co/600x400?text=Restaurant",
    category: "Business"
  },
  {
    name: "Resume Template",
    description: "A professional resume and CV website template.",
    thumbnail_url: "https://placehold.co/600x400?text=Resume",
    category: "Resume"
  }
];

async function seedTemplates() {
  try {
    await connectDB();

    await Templete.insertMany(seedData);

    console.log("Seed templates inserted successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

seedTemplates();
