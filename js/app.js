import { iniciarRouter } from "./router.js";
import { iniciarEventos } from "./events.js";

document.addEventListener("DOMContentLoaded", function () {
    iniciarRouter();
    iniciarEventos();
});