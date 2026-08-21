const decodeMojibake = value => value
    .replaceAll("\u00c3\u00a1", "\u00e1")
    .replaceAll("\u00c3\u00a9", "\u00e9")
    .replaceAll("\u00c3\u00ad", "\u00ed")
    .replaceAll("\u00c3\u00b3", "\u00f3")
    .replaceAll("\u00c3\u00ba", "\u00fa")
    .replaceAll("\u00c3\u00b1", "\u00f1")
    .replaceAll("\u00c2\u00bf", "\u00bf")
    .replaceAll("\u00c2\u00a1", "\u00a1");

document.title = decodeMojibake(document.title);
document.querySelectorAll("body *").forEach(element => {
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) node.nodeValue = decodeMojibake(node.nodeValue);
    });
});

const personal = docentes.map((persona, index) => {
    const slug = persona.nombre
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .toLowerCase();

    const normalizedSlug = slug || `persona-${index}`;

    return {
        ...persona,
        id: persona.id || `personal-${normalizedSlug}-${index}`
    };
});

const staffContainer =
    document.getElementById("staffContainer");

const staffCount =
    document.getElementById("staffCount");

const searchInput =
    document.getElementById("staffSearch");


function obtenerEtiquetaCargo(persona) {
    const cargo = (persona.cargo || "").toLowerCase();

    if (/director|subdirector/.test(cargo)) {
        return "Dirección";
    }

    if (/docente|profesor|profesora/.test(cargo)) {
        return "Docente";
    }

    if (/secret|administr|conta|finanzas|secretaría/.test(cargo)) {
        return "Administración";
    }

    if (/vigil|aseo|mantenimiento|servicio/.test(cargo)) {
        return "Servicios";
    }

    return "Personal";
}


function mostrarPersonal(lista) {

    staffContainer.innerHTML = "";

    staffCount.textContent = lista.length;


    lista.forEach((persona, index) => {

        const card =
            document.createElement("article");

        card.className =
            "staff-person-card";


        card.innerHTML = `

            <div class="staff-person-photo">

                <img
                    src="${persona.foto}"
                    alt="${persona.nombre}"
                    onerror="this.style.display='none'"
                >

            </div>


            <div class="staff-person-info">

                <span>
                    ${obtenerEtiquetaCargo(persona)}
                </span>

                <h3>
                    ${persona.nombre}
                </h3>

                <button
                    class="profile-button"
                    onclick="abrirPerfil('${persona.id}')">
                    Ver perfil
                    <span>→</span>
                </button>

            </div>

        `;


        staffContainer.appendChild(card);

    });

}


function abrirPerfil(personaId) {

    const persona =
        personal.find(item => item.id === personaId);

    if (!persona) {
        return;
    }

    document.getElementById("modalPhoto").src =
        persona.foto;

    document.getElementById("modalNombre").textContent =
        persona.nombre;

    document.getElementById("modalCargo").textContent =
        persona.cargo;

    document.getElementById("modalResena").textContent =
        persona.resena ||
        "Información pendiente de completar.";

    document.getElementById("modalProyectos").textContent =
        persona.proyectos ||
        "Información pendiente de completar.";


    document
        .getElementById("profileModal")
        .classList.add("active");

}


document
    .getElementById("modalClose")
    .addEventListener("click", () => {

        document
            .getElementById("profileModal")
            .classList.remove("active");

    });


document
    .getElementById("profileModal")
    .addEventListener("click", event => {

        if (
            event.target.id === "profileModal"
        ) {

            event.currentTarget
                .classList.remove("active");

        }

    });


/* BUSCADOR */

searchInput.addEventListener(
    "input",
    function () {

        const texto =
            this.value.toLowerCase();


        const resultados =
            personal.filter(persona =>
                persona.nombre
                    .toLowerCase()
                    .includes(texto)
            );


        mostrarPersonal(resultados);

    }
);


/* FILTROS */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                this.classList.add("active");


                const filtro =
                    this.dataset.filter;


                if (filtro === "todos") {

                    mostrarPersonal(personal);

                    return;

                }


                const resultados =
                    personal.filter(persona => {

                        const cargo =
                            persona.cargo
                                .toLowerCase();


                        if (
                            filtro === "docente"
                        ) {

                            return (
                                cargo.includes("docente") ||
                                cargo.includes("profesor") ||
                                cargo.includes("profesora")
                            );

                        }


                        if (
                            filtro === "direccion"
                        ) {

                            return (
                                cargo.includes("director") ||
                                cargo.includes("subdirector")
                            );

                        }


                        if (
                            filtro === "administracion"
                        ) {

                            return (
                                cargo.includes("secret") ||
                                cargo.includes("administr")
                            );

                        }


                        if (
                            filtro === "servicios"
                        ) {

                            return (
                                cargo.includes("vigil") ||
                                cargo.includes("aseo") ||
                                cargo.includes("mantenimiento")
                            );

                        }


                        return false;

                    });


                mostrarPersonal(resultados);

            }
        );

    });


/* INICIAR */

mostrarPersonal(personal);