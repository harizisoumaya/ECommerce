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

// Connexion à la base données (choix local ou cloud selon .env)
const dbUri = process.env.DATABASECLOUD || process.env.DATABASE;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`✅ Database connected: ${dbUri.includes('mongodb+srv') ? 'Cloud' : 'Local'}`))
  .catch(err => {
    console.log("❌ Unable to connect to database", err);
    process.exit();
  });

// requête simple pour test
app.get("/", (req, res) => {
  res.send("bonjour 👋");
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 Server is listening on port ${process.env.PORT || 3001}`);
});

module.exports = app;
