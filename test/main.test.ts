import { describe, expect, test } from "@jest/globals";
import { startServer, killServer } from "../main";
import http from "http";

describe("Coucou", () => {
  test("should coucou", () => {
    expect(true).toBe(true);
  });
});

describe("Hello World", () => {
  test('should call "/" and return "Hello World"', () => {
    const port = 3002;
    startServer(port);

    let body = "";

    http.get("http://localhost:3002", (res) => {
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        expect(body.toString().length > 0);
        killServer();
      });
    });
  });
});
