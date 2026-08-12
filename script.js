const buttons = document.querySelectorAll("button[data-category]");

const home = document.getElementById("home");

const products = document.getElementById("products");

fetch("menu.json")
.then(response => response.json())
.then(menu => {

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.category;

            showCategory(category, menu);

        });

    });

});

function showCategory(category, menu) {

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

            if(category === "caffetteria") {

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
    ${product.immagine 
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

        products.classList.add("hidden");

        home.style.display = "block";

    });

}
