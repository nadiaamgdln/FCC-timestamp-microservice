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

// Timestamp API route (optional parameter)
app.get("/api/:date?", function(req, res) {
  let dateParam = req.params.date;

  // If no date parameter, use current time
  if (!dateParam) {
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // If dateParam is numeric (timestamp)
  if (/^\d{5,}$/.test(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);

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
