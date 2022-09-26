import express from "express";
import { Server } from "http";
import path from "path";

const app = express();
const port = 3001;
let server: Server<any, any>;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  const msg: string = "Hello World!";
  res.setHeader("content-type", "text/html"); //to force html
  res.send(msg);
});

app.get("/about", (_req, res) => {
  const msg: string = "this is my about page";
  res.send(msg);
});

app.get("/signup/my-name-is/:name", (req, res) => {
  const name: string = req.params.name;
  const msg: string = `You're all signed up for the big convention ${name}`;
  res.send(msg);
});

function startServer(port: number) {
  server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

function killServer() {
  console.log("Kill server properly");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
}

startServer(port);

export { startServer, killServer };
