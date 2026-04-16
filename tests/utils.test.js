import { describe, it, expect } from "vitest";
import {
  formatMessage,
  isEmptyMessage,
  getLastMessage,
  addMessage,
} from "../public/src/utils.js";

describe("utils", () => {
  it("formatMessage elimina espacios", () => {
    expect(formatMessage(" hola ")).toBe("hola");
  });

  it("isEmptyMessage detecta vacío", () => {
    expect(isEmptyMessage("   ")).toBe(true);
  });

  it("getLastMessage devuelve el último mensaje", () => {
    const messages = [
      { role: "user", content: "hola" },
      { role: "bot", content: "hey" },
    ];

    expect(getLastMessage(messages)).toEqual({
      role: "bot",
      content: "hey",
    });
  });

  it("addMessage agrega un mensaje", () => {
    const messages = [];

    const result = addMessage(messages, "user", "hola");

    expect(result.length).toBe(1);
    expect(result[0]).toEqual({
      role: "user",
      content: "hola",
    });
  });
});