const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Ad = require("./modal/modal");

const app = express();

app.use(express.json());
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

const adData = [
  {
    companyId: "1",
    company: "Levi's",
    primaryText: "We like where you’re going with this.",
    headline: "Relaxed Fit Men's Jeans",
    description: "",
    CTA: "Shop Now",
    imageUrl:
      "https://imageio.forbes.com/specials-images/dam/imageserve/43382149/960x0.jpg?format=jpg&width=960",
  },
  {
    companyId: "3",
    company: "Salesforce",
    primaryText:
      "The world’s leading CRM is ready to help you simplify the business part of your small business.",
    headline: "Salesforce for Small Business",
    description: "",
    CTA: "Sign Up",
    imageUrl:
      "https://bap-software.net/wp-content/uploads/2022/08/what-is-salesforce.jpg",
  },
  {
    companyId: "6",
    company: "Cotopaxi",
    primaryText:
      "Teva x Cotopaxi is back! Celebrate eternal summer with limited-edition Teva x Cotopaxi Original Universal sandals in bold new colors.",
    headline: "Made With Recycled Plastic",
    description: "Shop Back to School",
    CTA: "Shop Now",
    imageUrl:
      "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/8e/29/2b.jpg",
  },
  {
    companyId: "7",
    company: "Netflix",
    primaryText:
      "The Emmy-nominated Netflix comedy special from the late Norm Macdonald is his last gift to the world of comedy he helped shape.",
    headline:
      "Norm Macdonald's Nothing Special gives one last dose of the late comic",
    description: "",
    CTA: "Learn More",
    imageUrl:
    "https://cdn.arstechnica.net/wp-content/uploads/2022/07/netflix.jpg",
  },
  {
    companyId: "9",
    company: "Valentino",
    primaryText: "Visit Valentino.com, discover the new products and shop now!",
    headline: "Valentino Hexagonal Metal Frame With Crystal Studs",
    description: "",
    CTA: "Shop Now",
    imageUrl:
      "https://assets.vogue.in/photos/62d982129cd85e999b24da81/master/w_4000,h_2666,c_limit/VALENTINO%20PINK%20PP_FINALE%20SFILATA.JPG.JPG",
  },
  {
    companyId: "11",
    company: "Purple",
    primaryText:
      "Say ‘goodnight’ to sleeping hot 🔥 with Purple products—designed to dissipate heat.",
    headline: "Cooler Summers Start Here",
    description: "Shop Purple products, designed to help you sleep cool.",
    CTA: "Shop Now",
    imageUrl:
      "https://i.ytimg.com/vi/jZsuBAueLSc/maxresdefault.jpg",
  },

  {
    companyId: "10",
    company: "Curology",
    primaryText:
      "Dark spots. Breakouts. Rosacea. Dull skin. Fine lines. Our formulas are custom-mixed for YOUR skin concerns.",
    headline: "Personalized skincare for dark spots, acne, and more.",
    description:
      "Personalized skincare for dark spots, acne, and more. Results may vary.",
    CTA: "Order Now",
    imageUrl:
      "https://reviewed-com-res.cloudinary.com/image/fetch/s--x_P0iNto--/b_white,c_limit,cs_srgb,f_auto,fl_progressive.strip_profile,g_center,q_auto,w_972/https://reviewed-production.s3.amazonaws.com/1568130549351/HeroBug.jpg",
  },
];

mongoose
  .connect("mongodb://127.0.0.1:27017/mern-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected To DB"))
  .catch(console.error);

async function addData() {
  try {
    await Ad.insertMany(adData);
    console.log("data added successfully");
  } catch (err) {
    console.log(err);
  }
}

addData();

app.get("/" , async(req, res) => {
    const ads = await Ad.find();
    res.json(ads);
})


app.get("/:searchQuery", async (req, res) => {
  const keyword = req.params.searchQuery;
  const regex = new RegExp(keyword, "i");
  const results = await Ad.aggregate([
    {
      $match: {
        $or: [
          { company: { $regex: regex } },
          { primaryText: { $regex: regex } },
          { headline: { $regex: regex } },
          { description: { $regex: regex } },
        ],
      },
    },
    {
      $group: {
        _id: "$company",
        ads:{$push: "$$ROOT"}
      }
    }
  ]);
  res.json(results);
});

app.listen(3001, () => console.log("server is running on port 3001"));
