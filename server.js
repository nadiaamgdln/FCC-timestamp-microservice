const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.use(express.static('public'));

// Root route
app.get("/", function(req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

// Easter egg
app.get("/api/easteregg", function(req, res) {
  res.json({ greeting: "Oh, you've found this! Well, congrats! :p" });
});

// Timestamp API route (universal for both empty and with date param)
app.get("/api/:date?", function(req, res) {
  let dateParam = req.params.date;

  // Jika tidak ada parameter, kirim waktu saat ini
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

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

// 404 fallback
app.use(function(req, res) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});

// Listen to port
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
