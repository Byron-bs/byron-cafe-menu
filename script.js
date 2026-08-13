const buttons = document.querySelectorAll("button[data-category]");
const home = document.getElementById("home");
const products = document.getElementById("products");

let menuData = null;

fetch("menu.json?v=20260813-definitivo2")
.then(response => response.json())
.then(menu => {

    menuData = menu;

    const initialCategory = window.location.hash.replace("#", "");

    if(initialCategory && menu.categorie[initialCategory]) {
        showCategory(initialCategory, menu);
    }

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.category;

            // Aggiunge la categoria alla cronologia del browser
            history.pushState(
                { category: category },
                "",
                `#${category}`
            );

            showCategory(category, menu);

        });

    });

});

function showCategory(category, menu) {

    document.body.classList.toggle("panini-page", category === "panini");

    home.style.display = "none";
    products.classList.remove("hidden");

    let html = `

    <div class="category-title">

        <div class="music">
            ♪
        </div>

        <h2>${category}</h2>

    </div>

    `;

    if(menu.categorie[category]) {

        menu.categorie[category].forEach(product => {

            if(category === "panini") {

                html += `

                <article class="panino-card">

                    <img class="panino-image" src="${product.immagine}" alt="${product.nome}">

                    <div class="panino-transition"></div>

                    <div class="panino-content">

                        <div class="panino-year">
                            Opera · ${product.anno || ""}
                        </div>

                        <h3 class="${product.nome.length >= 11 ? "panino-name-long" : ""}${product.nome.split(" ").some(parola => parola.length >= 10) ? " panino-name-compact" : ""}">${product.nome}</h3>

                        ${product.riferimento ? `<p class="panino-reference">${product.riferimento}</p>` : ""}

                        <p class="panino-ingredients">${product.descrizione}</p>

                        <div class="panino-price">
                            ${product.prezzo}
                        </div>

                    </div>

                </article>

                `;

            } else if(category === "caffetteria") {

                html += `

                <div class="product-card coffee-card">

                    <div class="product-content coffee-content">

                        <h3>${product.nome}</h3>

                        <div class="price">
                            ${product.prezzo}
                        </div>

                    </div>

                </div>

                `;

            } else {

                html += `

                <div class="product-card">

                    <div class="product-image">

                        ${
                            product.immagine
                            ? `<img src="${product.immagine}" alt="${product.nome}">`
                            : `Foto prodotto`
                        }

                    </div>

                    <div class="product-content">

                        <h3>${product.nome}</h3>

                        ${product.descrizione ? `<p>${product.descrizione}</p>` : ""}

                        <div class="price">
                            ${product.prezzo}
                        </div>

                    </div>

                </div>

                `;

            }

        });

    }

    html += `

    <button class="back-button" id="back">
        ← Torna al menù
    </button>

    `;

    products.innerHTML = html;

    document
    .getElementById("back")
    .addEventListener("click", () => {

        // Usa la cronologia invece di mostrare
        // direttamente la home
        history.back();

    });

}


/* TORNA ALLA HOME */

function showHome() {

    document.body.classList.remove("panini-page");

    products.classList.add("hidden");
    home.style.display = "block";

    // Torna in cima alla pagina
    window.scrollTo(0, 0);

}


/* GESTIONE TASTO INDIETRO DEL BROWSER / TELEFONO */

window.addEventListener("popstate", event => {

    if(event.state && event.state.category && menuData) {

        showCategory(event.state.category, menuData);

    } else {

        showHome();

    }

});


/* SE LA PAGINA VIENE APERTA CON UNA CATEGORIA NELL'URL */

window.addEventListener("load", () => {

    const category = window.location.hash.replace("#", "");

    if(category && menuData && menuData.categorie[category]) {

        showCategory(category, menuData);

    }

});
