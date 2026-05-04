const express = require("express");
const app = express();
const testRoute = require("./routes/testroute.js");

const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// dot env config
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1/test", testRoute);

app.get("/", (req, res) => {
  res.send("Hello World sfgjh dahddf dh ");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
