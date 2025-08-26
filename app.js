const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

// config dotenv
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // ⚡ important avant les routes

// Routes
app.use('/api/categories', require("./routes/categorie.route"));
app.use('/api/scategories', require("./routes/scategorie.route"));
app.use('/api/articles', require("./routes/article.route"));

// Connexion à la base de données
mongoose.connect(process.env.DATABASECLOUD)
  .then(() => console.log("✅ Database Successfully Connected"))
  .catch(err => {
    console.log("❌ Unable to connect to database", err);
    process.exit();
  });

// requête simple pour test
app.get("/", (req, res) => {
  res.send("bonjour 👋");
});

// Écoute du serveur (local uniquement)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

module.exports = app;
