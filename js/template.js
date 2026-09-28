const pets = [
    {
        nome: "Bento",
        imagem: "img/Bento.jpg",
        alt: "Bento, cachorro vira-lata de porte médio disponível para adoção",
        status: "Disponível para adoção"
    },
    {
        nome: "Mel",
        imagem: "img/Mel.jpg",
        alt: "Mel, filhote de cachorro de porte pequeno disponível para adoção",
        status: "Disponível para adoção"
    },
    {
        nome: "Thor",
        imagem: "img/Thor.jpg",
        alt: "Thor, cachorro de porte grande disponível para adoção",
        status: "Disponível para adoção"
    }
];

function criarCardPet(pet) {
    return `
        <article>
            <h3>${pet.nome}</h3>
            <img
                src="${pet.imagem}"
                alt="${pet.alt}"
                width="200"
            >
            <span class="badge badge-info">
                ${pet.status}
            </span>
        </article>
    `;
}

export function renderizarPets() {
    const listaPets =
        document.getElementById("lista-pets");

    if (!listaPets) {
        return;
    }

    listaPets.innerHTML =
        pets.map(criarCardPet).join("");
}