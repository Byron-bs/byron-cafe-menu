const home = document.getElementById("home");
const sectionMenu = document.getElementById("section-menu");
const products = document.getElementById("products");

const sectionConfig = {
    bar: {
        title: "IL BAR",
        subtitle: "Caffetteria, vini e bevande",
        items: [
            { label: "CAFFETTERIA", category: "caffetteria" },
            { label: "BEVANDE", category: "bevande" },
            { label: "VINI / APERITIVI", category: "aperitivi" },
            { label: "BIRRE", category: "birre" },
            { label: "LIQUORI", category: "liquori" }
        ]
    },
    cucina: {
        title: "LA CUCINA",
        subtitle: "Primi, secondi e proposte veloci",
        items: [
            { label: "PRIMI PIATTI", category: "primi" },
            { label: "SECONDI PIATTI", category: "secondi" },
            { label: "INSALATONE", category: "insalatone" },
            { label: "PANINI", category: "panini" },
            { label: "DESSERT", category: "dessert" }
        ]
    }
};

const categoryLabels = {
    caffetteria: "CAFFETTERIA",
    bevande: "BEVANDE",
    aperitivi: "VINI / APERITIVI",
    birre: "BIRRE",
    liquori: "LIQUORI",
    primi: "PRIMI PIATTI",
    secondi: "SECONDI PIATTI",
    insalatone: "INSALATONE",
    panini: "PANINI",
    dessert: "DESSERT"
};

let menuData = null;

fetch("menu.json?v=20260817-bar-menu1")
.then(response => response.json())
.then(menu => {
    menuData = menu;
    renderFromHash();

    document.querySelectorAll("[data-section]").forEach(button => {
        button.addEventListener("click", () => navigateTo(button.dataset.section));
    });
});

function navigateTo(destination) {
    history.pushState({}, "", `#${destination}`);
    renderFromHash();
}

function renderFromHash() {
    if(!menuData) return;

    const destination = window.location.hash.replace("#", "");

    if(sectionConfig[destination]) {
        showSection(destination);
    } else if(destination && (menuData.categorie[destination] || categoryLabels[destination])) {
        showCategory(destination, menuData);
    } else if(destination) {
        showSection(destination === "bar" ? "bar" : "cucina");
    } else {
        showHome();
    }
}

function setPage(pageClass = "") {
    document.body.className = pageClass;
    home.classList.add("hidden");
    sectionMenu.classList.add("hidden");
    products.classList.add("hidden");
}

function showHome() {
    setPage("landing-page");
    home.classList.remove("hidden");
    window.scrollTo(0, 0);
}

function showSection(sectionKey) {
    const section = sectionConfig[sectionKey];
    setPage("menu-index-page");

    sectionMenu.innerHTML = `
        <header class="brand brand-small" aria-label="BYRON Caffè">
            <h1>BYRON</h1>
            <div class="brand-caffe"><span></span><h2>Caffè</h2><span></span></div>
            <div class="brand-ornament" aria-hidden="true"><i></i></div>
        </header>

        <div class="section-heading">
            <h2>${section.title}</h2>
            <p>${section.subtitle}</p>
            <div class="heading-rule" aria-hidden="true"><span></span></div>
        </div>

        <nav class="section-links" aria-label="${section.title}">
            ${section.items.map(item => `
                <button class="section-link" data-category="${item.category}" type="button">
                    <span>${item.label}</span>
                    <i aria-hidden="true">→</i>
                </button>
            `).join("")}
        </nav>

        <button class="home-link" type="button">← TORNA ALLA HOME</button>
    `;

    sectionMenu.classList.remove("hidden");

    sectionMenu.querySelectorAll("[data-category]").forEach(button => {
        button.addEventListener("click", () => navigateTo(button.dataset.category));
    });

    sectionMenu.querySelector(".home-link").addEventListener("click", () => navigateHome());
    window.scrollTo(0, 0);
}

function showCategory(category, menu) {
    setPage(category === "panini" ? "panini-page" : "products-page");

    let html = `
        <div class="category-title">
            <div class="music">♪</div>
            <h2>${categoryLabels[category] || category}</h2>
        </div>
    `;

    const items = menu.categorie[category] || [];

    if(items.length) {
        items.forEach(product => {
            if(category === "panini") {
                html += `
                    <article class="panino-card">
                        <img class="panino-image" src="${product.immagine}" alt="${product.nome}">
                        <div class="panino-transition"></div>
                        <div class="panino-content">
                            <div class="panino-year">Opera · ${product.anno || ""}</div>
                            <h3 class="${product.nome.length >= 11 ? "panino-name-long" : ""}${product.nome.split(" ").some(parola => parola.length >= 10) ? " panino-name-compact" : ""}">${product.nome}</h3>
                            ${product.riferimento ? `<p class="panino-reference">${product.riferimento}</p>` : ""}
                            <p class="panino-ingredients">${product.descrizione}</p>
                            <div class="panino-price">${product.prezzo}</div>
                        </div>
                    </article>
                `;
            } else if(["caffetteria", "bevande", "aperitivi", "birre", "liquori"].includes(category)) {
                html += `
                    <div class="product-card coffee-card">
                        <div class="product-content coffee-content">
                            <h3>${product.nome}</h3>
                            <div class="price">${product.prezzo}</div>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div class="product-card">
                        <div class="product-image">
                            ${product.immagine ? `<img src="${product.immagine}" alt="${product.nome}">` : "Foto prodotto"}
                        </div>
                        <div class="product-content">
                            <h3>${product.nome}</h3>
                            ${product.descrizione ? `<p>${product.descrizione}</p>` : ""}
                            <div class="price">${product.prezzo}</div>
                        </div>
                    </div>
                `;
            }
        });
    } else {
        html += `
            <div class="empty-category">
                <p>La selezione sarà disponibile a breve.</p>
            </div>
        `;
    }

    html += `
        <button class="back-button" id="back" type="button">← Torna al menù</button>
    `;

    products.innerHTML = html;
    products.classList.remove("hidden");
    document.getElementById("back").addEventListener("click", () => history.back());
    window.scrollTo(0, 0);
}

function navigateHome() {
    if(window.location.hash) {
        history.pushState({}, "", window.location.pathname + window.location.search);
    }
    showHome();
}

window.addEventListener("popstate", renderFromHash);
