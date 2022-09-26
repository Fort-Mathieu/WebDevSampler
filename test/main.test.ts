import { describe, expect, test } from "@jest/globals";
import { startServer } from "../main";
import http from "http";

const port = 3005;

beforeAll(() => {
  startServer(port);
});

afterAll(() => {
  //killServer();
});

describe("Main Test", () => {
  test('should call "/" and return "Hello World!"', () => {
    let body = "";

    http.get(`http://localhost:${port}`, (res) => {
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        expect(body.toString().length > 0);
        expect(body.toString()).toEqual("Hello World!");
      });
    });
  });

  test('should call "/about" and return the correct string', () => {
    let body = "";

    http.get(`http://localhost:${port}/about`, (res) => {
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        expect(body.toString().length > 0);
        expect(body.toString()).toEqual("this is my about page");
      });
    });
  });

  test('should call "/signup/my-name-is/Tom" and return "You\'re all signed up for the big convention Tom"', () => {
    let body = "";

    http.get(`http://localhost:${port}/signup/my-name-is/Tom`, (res) => {
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        expect(body.toString().length > 0);
        expect(body.toString()).toEqual(
          "You're all signed up for the big convention Tom"
        );
      });
    });
  });
});
