const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const https = require("https");
const fs = require("fs");
const path = require("path");
const connectDB = require("./config/database");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());

require("./middlewares/validate.token")(passport);

const PORT = process.env.PORT;
connectDB();

app.get("/", (req, res) => res.status(200).send("SSD"));

app.use("/api/users", require("./routes/login_register.route"));
app.use("/api/protected", require("./routes/protected.route"));

module.exports = app;

const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "certificate.pem")),
  },
  app
);

sslServer.listen(PORT, () => {
  console.log(`Secure app listening on port ${PORT}`);
});

// app.listen(PORT, () => {
//   console.log(`App listening at http://localhost:${PORT}`);
// });
