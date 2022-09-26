import { describe, expect, test } from "@jest/globals";
import { startServer, killServer } from "../main";
import http from "http";

const port = 3001;

beforeAll(() => {
  startServer(port);
});

afterAll(() => {
  killServer();
});

describe("Hello World", () => {
  test('should call "/" and return "Hello World"', () => {
    let body = "";

    http.get(`http://localhost:${port}`, (res) => {
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        expect(body.toString().length > 0);
      });
    });
  });
});
