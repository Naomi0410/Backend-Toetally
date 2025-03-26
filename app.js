// const express = require("express");

// const cors = require("cors");

// const morgan = require("morgan");

// const orderRoutes = require("./routes/orderRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
// const productRoutes = require("./routes/productRoutes");
// const authRoutes = require("./routes/authRoutes");
// const newsletterRoutes = require("./routes/newsletterRoutes");
// const cartRoutes = require("./routes/cartRoutes");

// const app = express();

// const corsOptions = {
//   origin: [
//     "https://toe-tally-frontend-lzmv.vercel.app",
//     "http://localhost:5173",
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

// app.use(cors(corsOptions));

// app.use(express.json());

// app.use(morgan("dev"));

// app.use("/api/products", productRoutes);

// app.use("/api/auth", authRoutes);

// app.use("/api/sub", newsletterRoutes);

// app.use("/api/cart", cartRoutes);

// app.use("/api/payment", paymentRoutes);

// app.use("/api/orders", orderRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);

//   res
//     .status(err.status || 500)
//     .json({ message: err.message || "Internal Server Error" });
// });

// app.use(express.static(path.join(__dirname, "public")));

// app.get("/logo", (req, res) => {
//   res.sendFile(path.join(__dirname, "products.json"));
// });

// module.exports = app;

// manuelokpodu
// vku2APPgDy5sEwMI
// mongodb+srv://manuelokpodu:vku2APPgDy5sEwMI@cluster0.dkbks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const contactRoutes = require("./routes/contactRoutes");
const subscriberRoutes = require("./routes/subscriberRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const newsletterRoutes = require("./routes/newsletterRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(express.json()); // Body parser

// Caching configuration
app.use((req, res, next) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  next();
});


// Routes
app.use("/contact", contactRoutes);
app.use("/subscribe", subscriberRoutes);

const allowedOrigins = [
  "https://toe-tally-bice.vercel.app/",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Ensures cookies and authorization headers work
};

app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sub", newsletterRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/logo", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "logo.png"));
});

module.exports = app;
