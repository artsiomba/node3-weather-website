const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "ARtsiom",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "ARtsiom",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help message",
    helpMessage: "LALALALALALALALALALALALALALALAL",
    name: "ARtsiom",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, response) => {
    if (error) {
      return res.send({ error });
    }
    forecast(response, (error, forecastData) => {
      let data = {};
      if (error) {
        data = error;
      } else {
        data = forecastData;
        data.address = req.query.address;
      }
      res.send(data);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404page", {
    title: "404 page",
    errorMessage: "Help article not found",
    name: "ARtsiom",
  });
});
app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 page",
    errorMessage: "Page not found",
    name: "ARtsiom",
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000");
});
