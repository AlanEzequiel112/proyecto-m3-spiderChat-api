import { describe, it, expect } from "vitest";
import {
  formatMessage,
  isEmptyMessage,
  getLastMessage,
  addMessageToList,
  removeTypingMessage,
} from "../src/utils.js";

describe("utils", () => {
  it("formatMessage elimina espacios al inicio y al final", () => {
    expect(formatMessage(" hola ")).toBe("hola");
  });

  it("isEmptyMessage detecta mensajes vacíos", () => {
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

  it("addMessageToList agrega un mensaje sin mutar el array original", () => {
    const messages = [];

    const result = addMessageToList(messages, "user", "hola");

    expect(result.length).toBe(1);
    expect(messages.length).toBe(0);
    expect(result[0]).toEqual({
      role: "user",
      content: "hola",
    });
  });

  it("removeTypingMessage elimina el mensaje temporal de escribiendo", () => {
    const messages = [
      { role: "user", content: "hola" },
      { role: "bot", content: "Escribiendo..." },
    ];

    expect(removeTypingMessage(messages)).toEqual([
      { role: "user", content: "hola" },
    ]);
  });
});