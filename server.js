const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// Serve static files
app.use(express.static('public'));

// Root route
app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Easter egg route
app.get("/api/easteregg", function(req, res) {
  res.json({ greeting: "Oh, you've found this! Well, congrats! :p" });
});

// Untuk kasus "/api" tanpa parameter
app.get("/api", function(req, res) {
  const now = new Date();
  res.json({
    unix: now.getTime(),
    utc: now.toUTCString()
  });
});

// Untuk "/api/:date"
app.get("/api/:date", function(req, res) {
  let dateParam = req.params.date;

  // Jika parameter berupa angka panjang, parse jadi integer
  if (/^\d{5,}$/.test(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);

  // Cek validitas tanggal
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// 404 route fallback
app.use(function(req, res) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
