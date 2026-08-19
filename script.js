const views = {
    home: document.getElementById("home"),
    section: document.getElementById("section-menu"),
    products: document.getElementById("products"),
    contact: document.getElementById("contact")
};

const menuOverlay = document.getElementById("menu-overlay");

const sectionConfig = {
    bar: {
        title: "IL BAR",
        subtitle: "Caffetteria, vini e bevande",
        icon: "cup",
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
        icon: "cutlery",
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

const productImages = {
    secondi: {
        "Carne tonnata": "images/secondi/carne-tonnata.webp?v=20260817-crop1",
        "Cotoletta alla milanese": "images/secondi/cotoletta-alla-milanese.webp?v=20260817-crop1",
        "Hamburger di manzo alla griglia": "images/secondi/hamburger-manzo-griglia.webp?v=20260817-crop1",
        "Scaloppe al vino bianco": "images/secondi/scaloppine-vino-bianco.webp?v=20260817-crop1",
        "Scaloppe al limone": "images/secondi/scaloppine-limone.webp?v=20260817-crop1",
        "Scaloppe ai funghi": "images/secondi/scaloppine-funghi.webp?v=20260817-crop1",
        "Scaloppe agli asparagi": "images/secondi/scaloppine-asparagi.webp?v=20260817-crop1",
        "Melanzane alla parmigiana": "images/secondi/melanzane-parmigiana.webp?v=20260817-crop1",
        "Bresaola rucola e grana": "images/secondi/bresaola-rucola-grana.webp?v=20260817-crop1",
        "Crudo e melone": "images/secondi/crudo-melone.webp?v=20260817-crop1"
    }
};

const textOnlyCategories = new Set(["caffetteria", "bevande", "aperitivi", "birre", "liquori", "dessert"]);
const kitchenCategories = ["primi", "secondi", "insalatone", "panini"];
const barCategories = ["caffetteria", "bevande", "aperitivi", "birre", "liquori"];

const supplierNote = "Le proposte di tavola calda sono selezionate in collaborazione con Gastronomia Locatelli di Seriate e Gourmet Bon Chef, realtà scelte per freschezza, sicurezza, qualità e gusto autentico.";

let menuData = null;

function brandMarkup({ menu = true, home = false } = {}) {
    return `
        <header class="brand${home ? " brand-home" : ""}">
            <div class="brand-lockup" aria-label="BYRON CAFFE', JML GROUP SNC">
                <strong>BYRON CAFFE'</strong>
                <span>JML GROUP SNC</span>
            </div>
            ${menu ? `<button class="menu-toggle" data-open-menu aria-label="Apri il menù"><i></i><i></i><i></i></button>` : ""}
        </header>
    `;
}

function icon(name) {
    const icons = {
        home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.2 12 4l9 7.2v8.3a.5.5 0 0 1-.5.5h-5.2v-6H8.7v6H3.5a.5.5 0 0 1-.5-.5z"/></svg>',
        cup: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h12v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zm12 2h2a3 3 0 0 1 0 6h-2M3 21h15"/></svg>',
        cutlery: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v7M4.5 3v5.5A2.5 2.5 0 0 0 7 11v10M9.5 3v5.5A2.5 2.5 0 0 1 7 11M17 3c-2 2-2 7 0 9v9M17 3v9"/></svg>',
        pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-7.1 7-13A7 7 0 1 0 5 9c0 5.9 7 13 7 13Z"/><circle cx="12" cy="9" r="2.4"/></svg>',
        phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5 10 8l-2.1 2.2a15.7 15.7 0 0 0 5.9 5.9L16 14l4.5 2.8-1.2 3.1c-.4 1-1.5 1.5-2.5 1.2C9.8 19.2 4.8 14.2 2.9 7.2c-.3-1 .2-2.1 1.2-2.5Z"/></svg>',
        mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>',
        instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7"/></svg>'
    };
    return icons[name] || "";
}

function bottomNav(active = "") {
    return `
        <nav class="bottom-nav" aria-label="Navigazione rapida">
            <button class="${active === "home" ? "active" : ""}" data-destination="home">${icon("home")}<span>HOME</span></button>
            <button class="${active === "bar" ? "active" : ""}" data-destination="bar">${icon("cup")}<span>IL BAR</span></button>
            <button class="${active === "cucina" ? "active" : ""}" data-destination="cucina">${icon("cutlery")}<span>LA CUCINA</span></button>
            <button class="${active === "dove-siamo" ? "active" : ""}" data-destination="dove-siamo">${icon("pin")}<span>DOVE SIAMO</span></button>
        </nav>
    `;
}

function setView(name, bodyClass) {
    Object.values(views).forEach(view => view.classList.add("hidden"));
    views[name].classList.remove("hidden");
    document.body.className = bodyClass;
    closeMenu();
    window.scrollTo({ top: 0, behavior: "auto" });
}

function navigateTo(destination) {
    const hash = destination === "home" ? "" : `#${destination}`;
    history.pushState({}, "", `${window.location.pathname}${window.location.search}${hash}`);
    renderFromHash();
}

function showHome() {
    views.home.innerHTML = `
        <section class="home-half home-bar" data-destination="bar" tabindex="0" role="button" aria-label="Scopri il menù del bar">
            <div class="home-icon">${icon("cup")}</div>
            <h1>IL BAR</h1>
            <p>Caffetteria, vini e bevande</p>
            <span class="home-cta">SCOPRI</span>
        </section>
        <div class="home-brand">${brandMarkup({ menu: false, home: true })}</div>
        <section class="home-half home-kitchen" data-destination="cucina" tabindex="0" role="button" aria-label="Scopri il menù della cucina">
            <h1>LA CUCINA</h1>
            <p>Primi, secondi e proposte veloci</p>
            <div class="home-icon">${icon("cutlery")}</div>
            <span class="home-cta">SCOPRI</span>
        </section>
        <div class="home-utility">
            <button data-destination="dove-siamo">${icon("pin")}<span>DOVE SIAMO</span></button>
            <span class="utility-hours">MAR–SAB&nbsp;&nbsp;8:30–19:00</span>
        </div>
    `;
    setView("home", "landing-page");
}

function showSection(sectionKey) {
    const section = sectionConfig[sectionKey];
    views.section.innerHTML = `
        ${brandMarkup()}
        <section class="section-intro">
            <div class="section-icon">${icon(section.icon)}</div>
            <h1>${section.title}</h1>
            <p>${section.subtitle}</p>
        </section>
        <nav class="section-links" aria-label="${section.title}">
            ${section.items.map(item => `<button data-destination="${item.category}"><span>${item.label}</span><i>→</i></button>`).join("")}
        </nav>
        ${bottomNav(sectionKey)}
    `;
    setView("section", "index-page");
}

function categoryTabs(category) {
    const categories = barCategories.includes(category) ? barCategories : kitchenCategories;
    return `
        <nav class="category-tabs" aria-label="Categorie">
            ${categories.map(key => `<button class="${key === category ? "active" : ""}" data-destination="${key}">${categoryLabels[key]}</button>`).join("")}
        </nav>
    `;
}

function categoryHeading(category) {
    return `
        ${brandMarkup()}
        ${categoryTabs(category)}
        <header class="category-heading">
            <span class="ornament"></span>
            <h1>${categoryLabels[category]}</h1>
            <i></i>
        </header>
    `;
}

function renderTextCard(product) {
    return `
        <article class="text-product-card">
            <h2>${product.nome}</h2>
            ${product.prezzo ? `<strong>${product.prezzo}</strong>` : ""}
        </article>
    `;
}

function renderFoodCard(product, category) {
    const isSecondo = category === "secondi";
    return `
        <article class="food-card${product.immagine ? " has-image" : " no-image"}${isSecondo ? " secondi-card" : ""}">
            ${product.immagine && isSecondo ? `<div class="food-blur" aria-hidden="true"><img src="${product.immagine}" alt="" loading="lazy" decoding="async"></div>` : ""}
            ${product.immagine ? `<div class="food-photo"><img src="${product.immagine}" alt="${product.nome}" loading="lazy" decoding="async"></div>` : ""}
            <div class="food-fade" aria-hidden="true"></div>
            <div class="food-copy">
                <h2>${product.nome}</h2>
                ${product.descrizione ? `<p>${product.descrizione}</p>` : ""}
                ${product.prezzo ? `<strong>${product.prezzo}</strong>` : ""}
            </div>
        </article>
    `;
}

function renderPanino(product) {
    return `
        <article class="panino-card">
            <div class="panino-stage" aria-hidden="true">
                <img src="${product.immagine}" alt="" loading="lazy" decoding="async">
            </div>
            <div class="panino-fade" aria-hidden="true"></div>
            <div class="panino-copy">
                <span>OPERA · ${product.anno}</span>
                <h2>${product.nome}</h2>
                <em>${product.riferimento}</em>
                <i></i>
                <p>${product.descrizione}</p>
                <strong>${product.prezzo}</strong>
            </div>
        </article>
    `;
}

function paniniVariants() {
    return `
        <aside class="variants-card" aria-label="Varianti disponibili">
            <h2>SCEGLI IL TUO FORMATO</h2>
            <div><span>PIADINA</span><strong>+ € 0,80</strong></div>
            <div><span>FOCACCIA</span><strong>+ € 0,70</strong></div>
            <div><span>TOAST</span><strong>stesso prezzo del panino</strong></div>
        </aside>
    `;
}

function supplierInfo() {
    return `
        <aside class="supplier-note">
            <span class="quality-icon">✓</span>
            <div>
                <h2>LA NOSTRA SELEZIONE</h2>
                <p>${supplierNote}</p>
            </div>
        </aside>
    `;
}

function showCategory(category) {
    const items = (menuData.categorie[category] || []).map(product => ({
        ...product,
        immagine: product.immagine || productImages[category]?.[product.nome] || ""
    }));

    let content = "";
    if (category === "panini") {
        content = `${paniniVariants()}<section class="products-list panini-list">${items.map(renderPanino).join("")}</section>`;
    } else if (textOnlyCategories.has(category)) {
        content = `<section class="products-list text-products">${items.map(renderTextCard).join("")}</section>`;
    } else {
        content = `<section class="products-list food-products">${items.map(product => renderFoodCard(product, category)).join("")}</section>`;
    }

    const section = barCategories.includes(category) ? "bar" : "cucina";
    views.products.innerHTML = `
        ${categoryHeading(category)}
        ${content}
        ${category === "primi" || category === "secondi" ? supplierInfo() : ""}
        ${bottomNav(section)}
    `;
    setView("products", `products-page category-${category}`);
}

function hoursMarkup() {
    const hours = [
        ["Lunedì", "Chiuso"],
        ["Martedì", "8:30–19:00"],
        ["Mercoledì", "8:30–19:00"],
        ["Giovedì", "8:30–19:00"],
        ["Venerdì", "8:30–19:00"],
        ["Sabato", "8:30–19:00"],
        ["Domenica", "Chiuso"]
    ];
    return hours.map(([day, time]) => `<div><span>${day}</span><strong>${time}</strong></div>`).join("");
}

function showContact() {
    const mapUrl = "https://www.google.com/maps/search/?api=1&query=Via+Bargnana+1+25030+Castrezzato+BS";
    views.contact.innerHTML = `
        ${brandMarkup()}
        <header class="category-heading contact-heading"><span class="ornament"></span><h1>DOVE SIAMO</h1><i></i></header>
        <section class="map-card">
            <div class="map-art"><span>${icon("pin")}</span></div>
            <div class="map-copy">
                <address>Via Bargnana, 1<br>25030 Castrezzato (BS)</address>
                <a href="${mapUrl}" target="_blank" rel="noopener">APRI LA MAPPA</a>
            </div>
        </section>
        <section class="contact-section">
            <h2>CONTATTI</h2>
            <div class="contact-actions">
                <a href="${mapUrl}" target="_blank" rel="noopener" aria-label="Ottieni indicazioni per il locale">${icon("pin")}<span>INDICAZIONI</span></a>
                <a href="https://www.instagram.com/byron__caffe/" target="_blank" rel="noopener" aria-label="Byron Caffè su Instagram">${icon("instagram")}<span>INSTAGRAM</span></a>
            </div>
        </section>
        <section class="hours-card">
            <h2>I NOSTRI ORARI</h2>
            <div class="hours-table">${hoursMarkup()}</div>
        </section>
        <section class="group-locations">
            <h2>GLI ALTRI LOCALI DEL GRUPPO</h2>
            <p>Passa a trovarci anche negli altri locali JML Group SNC.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Via+Sostegno+60+25124+Brescia" target="_blank" rel="noopener">${icon("pin")}<span>Via Sostegno, 60 · 25124 Brescia (BS)</span><b>›</b></a>
            <a href="https://www.google.com/maps/search/?api=1&query=Via+Montegrappa+25B+25128+Brescia" target="_blank" rel="noopener">${icon("pin")}<span>Via Montegrappa, 25/B · 25128 Brescia (BS)</span><b>›</b></a>
            <a href="https://www.google.com/maps/search/?api=1&query=Via+San+Zeno+76+25124+Brescia" target="_blank" rel="noopener">${icon("pin")}<span>Via S. Zeno, 76 · 25124 Brescia (BS)</span><b>›</b></a>
        </section>
        ${bottomNav("dove-siamo")}
    `;
    setView("contact", "contact-page");
}

function renderFromHash() {
    if (!menuData) return;
    const destination = window.location.hash.slice(1);
    if (!destination) return showHome();
    if (destination === "dove-siamo") return showContact();
    if (sectionConfig[destination]) return showSection(destination);
    if (categoryLabels[destination]) return showCategory(destination);
    showHome();
}

function openMenu() {
    menuOverlay.classList.remove("hidden");
    menuOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
}

function closeMenu() {
    menuOverlay.classList.add("hidden");
    menuOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
}

document.addEventListener("click", event => {
    const destination = event.target.closest("[data-destination]")?.dataset.destination;
    if (destination) navigateTo(destination);
    if (event.target.closest("[data-open-menu]")) openMenu();
    if (event.target.closest("[data-close-menu]")) closeMenu();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-destination][role='button']")) {
        event.preventDefault();
        navigateTo(event.target.dataset.destination);
    }
});

window.addEventListener("popstate", renderFromHash);

fetch("menu.json?v=20260818-primi2")
    .then(response => {
        if (!response.ok) throw new Error("Impossibile caricare il menù");
        return response.json();
    })
    .then(menu => {
        menuData = menu;
        renderFromHash();
    })
    .catch(() => {
        views.home.innerHTML = `<section class="load-error"><h1>BYRON CAFFE'</h1><p>Il menù non è momentaneamente disponibile. Riprova tra poco.</p></section>`;
        setView("home", "landing-page");
    });
