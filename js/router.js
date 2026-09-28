import { renderizarPets } from "./template.js";
import { restaurarDadosFormularios } from "./events.js";

const rotas = {
    home: "./html/templates/home.html",
    projetos: "./html/templates/projetos.html",
    cadastro: "./html/templates/cadastro.html"
};

const conteudoPrincipal =
    document.getElementById("conteudo-principal");


async function carregarRota(rota) {
    const rotaAtual = rotas[rota] ? rota : "home";
    const caminho = rotas[rotaAtual];

    try {
        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar a página.");
        }

        const html = await resposta.text();

        conteudoPrincipal.innerHTML = html;

        if (rotaAtual === "home") {
            renderizarPets();
        }
        if (rotaAtual === "cadastro") {
    restaurarDadosFormularios();
        }

    } catch (erro) {

        conteudoPrincipal.innerHTML = `
            <h1>Erro</h1>
            <p>Não foi possível carregar este conteúdo.</p>
        `;

        console.error(erro);
    }
}


export function iniciarRouter() {

    document.addEventListener("click", function(event) {

        const link = event.target.closest("a.link-rota");

        if (!link) {
            return;
        }

        event.preventDefault();

        const rota = link
            .getAttribute("href")
            .substring(1);

        window.location.hash = rota;
    });


    window.addEventListener("hashchange", function() {

        const rota =
            window.location.hash.substring(1) || "home";

        carregarRota(rota);
    });


    const rotaInicial =
        window.location.hash.substring(1) || "home";

    carregarRota(rotaInicial);
}