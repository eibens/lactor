/// <reference lib="dom"/>
import * as App from "./actors/app/mod.ts";

// Reload the page whenever a WebSocket message is received.
new WebSocket("ws://localhost:1234")
  .addEventListener("message", () => window.location.reload());

// Render the app.
const state = App.create();
App.behavior.render(state);
