export function iniciarEventos() {

    document.addEventListener("submit", function (event) {

        const formulario =
            event.target.closest("#form-doador, #form-adocao");

        if (!formulario) {
            return;
        }

        event.preventDefault();

        const campos =
            formulario.querySelectorAll("input, select, textarea");

        let formularioValido = true;

        campos.forEach(function (campo) {

            const valido = validarCampo(campo, true);

            if (!valido) {
                formularioValido = false;
            }
        });

        if (!formularioValido) {
            const primeiroCampoInvalido =
                formulario.querySelector('[aria-invalid="true"]');

            if (primeiroCampoInvalido) {
                primeiroCampoInvalido.focus();
            }

            return;
        }

        mostrarMensagem(
            formulario,
            "Dados validados com sucesso! Seu cadastro foi recebido."
        );

        salvarDadosFormulario(formulario);
    });


    document.addEventListener("input", function (event) {

        const campo = event.target;

        const formulario =
            campo.closest("#form-doador, #form-adocao");

        if (!formulario || !campo.matches("input, textarea")) {
            return;
        }

        validarCampo(campo, false);
    });


    document.addEventListener("change", function (event) {

        const campo = event.target;

        const formulario =
            campo.closest("#form-doador, #form-adocao");

        if (!formulario || !campo.matches("select")) {
            return;
        }

        validarCampo(campo, false);
    });
}


function validarCampo(campo, mostrarErro) {

    removerMensagemErro(campo);

    if (!campo.required && campo.value.trim() === "") {
        campo.classList.remove(
            "campo-valido",
            "campo-invalido"
        );

        campo.setAttribute("aria-invalid", "false");

        return true;
    }

    if (campo.checkValidity()) {

        campo.classList.remove("campo-invalido");
        campo.classList.add("campo-valido");

        campo.setAttribute("aria-invalid", "false");

        return true;
    }

    campo.classList.remove("campo-valido");
    campo.classList.add("campo-invalido");

    campo.setAttribute("aria-invalid", "true");

    if (mostrarErro) {
        criarMensagemErro(campo);
    }

    return false;
}


function criarMensagemErro(campo) {

    const mensagem =
        document.createElement("span");

    const idMensagem =
        `${campo.id}-erro`;

    mensagem.id = idMensagem;
    mensagem.className = "mensagem-erro";
    mensagem.setAttribute("role", "alert");

    if (campo.validity.valueMissing) {

        mensagem.textContent =
            "Este campo é obrigatório.";

    } else if (campo.validity.typeMismatch) {

        mensagem.textContent =
            "Digite uma informação em formato válido.";

    } else if (campo.validity.patternMismatch) {

        mensagem.textContent =
            "O formato informado está incorreto. Verifique o formato solicitado.";

    } else {

        mensagem.textContent =
            "Verifique a informação preenchida.";
    }

    campo.setAttribute(
        "aria-describedby",
        idMensagem
    );

    campo.insertAdjacentElement(
        "afterend",
        mensagem
    );
}


function removerMensagemErro(campo) {

    const idMensagem =
        `${campo.id}-erro`;

    const mensagem =
        document.getElementById(idMensagem);

    if (mensagem) {
        mensagem.remove();
    }

    campo.removeAttribute("aria-describedby");
}


function mostrarMensagem(formulario, texto) {

    const mensagemAnterior =
        formulario.querySelector(".mensagem-formulario");

    if (mensagemAnterior) {
        mensagemAnterior.remove();
    }

    const mensagem =
        document.createElement("div");

    mensagem.className =
        "alert alert-success mensagem-formulario";

    mensagem.textContent = texto;

    mensagem.setAttribute("role", "status");

    formulario.prepend(mensagem);
}


function salvarDadosFormulario(formulario) {

    const chave =
        formulario.id === "form-doador"
            ? "patasLarDoador"
            : "patasLarAdocao";

    const dados = {};

    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );

    campos.forEach(function (campo) {

        if (!campo.name || campo.id === "cpf-doador") {
            return;
        }

        dados[campo.name] = campo.value;
    });

    localStorage.setItem(
        chave,
        JSON.stringify(dados)
    );
}


export function restaurarDadosFormularios() {

    const formularios =
        document.querySelectorAll(
            "#form-doador, #form-adocao"
        );

    formularios.forEach(function (formulario) {

        const chave =
            formulario.id === "form-doador"
                ? "patasLarDoador"
                : "patasLarAdocao";

        const dadosSalvos =
            localStorage.getItem(chave);

        if (!dadosSalvos) {
            return;
        }

        try {

            const dados =
                JSON.parse(dadosSalvos);

            Object.entries(dados).forEach(
                function ([nome, valor]) {

                    const campo =
                        formulario.elements[nome];

                    if (campo) {
                        campo.value = valor;
                    }
                }
            );

        } catch (erro) {

            console.error(
                "Não foi possível restaurar os dados:",
                erro
            );
        }
    });
}