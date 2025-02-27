const express = require("express");
const tableRoutes = require("./routes/tableRoutes");

const app = express();
app.use(express.json());

// Use routes from tableRoutes.js
app.use("/api", tableRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});