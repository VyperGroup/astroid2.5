import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});


app.get("/worksheets", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "worksheets/index.html"));
});

app.get("/practicetests", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "worksheets/emuindex.html"));
});

app.get("/practice", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "worksheets/emu-launcher.html"));
});

app.get("/go", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "worksheets/html-loader.html"));
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "worksheets/settings.html"));
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "worksheets/404.html"));
});

app.get("*", (req, res) => {
  res.redirect("/404");
});

// Bare Server
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Astroid is running at http://localhost:${process.env.PORT}`);
});

server.listen({
  port: process.env.PORT,
});
