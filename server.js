const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));

// Root route
app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Easter egg route
app.get("/api/easteregg", function(req, res) {
  res.json({ greeting: "Oh, you've found this! Well, congrats! :p" });
});

// Timestamp API
app.get("/api/:date?", function(req, res) {
  let { date } = req.params;

  // Jika parameter tidak diberikan, kirim waktu saat ini
  if (!date) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Jika parameter berupa unix timestamp (angka panjang), parse jadi integer
  if (/^\d{5,}$/.test(date)) {
    date = parseInt(date);
  }

  const parsedDate = new Date(date);

  // Cek validitas
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString()
  });
});

// 404 fallback
app.use(function(req, res) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});

// Listen on the assigned port
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
