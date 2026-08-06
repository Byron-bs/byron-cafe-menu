const categories = document.querySelector(".categories");
const container = document.querySelector(".menu-container");


fetch("menu.json")
.then(response => response.json())
.then(data => {


    const buttons = document.querySelectorAll(".categories button");


    buttons[2].onclick = () => showCategory("primi", data);

    buttons[6].onclick = () => showCategory("dessert", data);


});


function showCategory(category, data){


    let html = `
        <h2>${category.toUpperCase()}</h2>
    `;


    data.categorie[category].forEach(item => {


        html += `

        <div class="dish">

            <h3>${item.nome}</h3>

            <p>${item.descrizione}</p>

            <strong>${item.prezzo}</strong>

        </div>

        `;

    });



    html += `
        <button onclick="location.reload()">
        ⬅ Torna al menù
        </button>
    `;


    categories.innerHTML = html;

}