import express from "express";
import { Server } from "http";

const port = 3001;
let server: Server<any, any>;

function startServer(port: number) {
  const app = express();

  app.get("/", (_req, res) => {
    const msg: string = "Hello World!";
    res.send(msg);
  });

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
