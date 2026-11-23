import test from "node:test";
import assert from "node:assert/strict";
import * as model from "../src/models/notification.model.js";
test("modelo notifications exporta lógica de validación", () => {
  assert.ok(Object.keys(model).length > 0);
});
