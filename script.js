const cardCont = document.querySelector(".card-container");
const searchInput = document.querySelectorAll(".search");
// const cardsBtn = dcument.querySelectorAll("cardsBtn");
let bookMagazine;
let dataJson;

fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((json) => {
        dataJson = json;
        booksShare(json);
        searchFilter(json);

    })
    .catch((err) => console.log("Error: " + err));

const booksShare = (array) => {

    bookMagazine = array.map(element => {
        let card = document.createElement("div");
        card.classList.add("col-8", "offset-2", "offset-sm-0", "col-sm-4", "col-md-3", "col-xl-2", "p-1");
        cardCont.appendChild(card);

        let objCont = document.createElement("div");
        objCont.classList.add("d-flex", "flex-column", "justify-content-between", "p-2");
        objCont.style.backgroundColor = "rgb(25, 25, 25)";
        objCont.style.borderRadius = "10px";
        objCont.style.height = "100%";
        card.appendChild(objCont);

        let objHead = document.createElement("div");
        objCont.appendChild(objHead);

        let img = document.createElement("img");
        img.src = element.img;
        img.style.width = "100%";
        objHead.appendChild(img);

        let title = document.createElement("p");
        title.innerText = element.title;
        title.style.color = "white";
        objHead.appendChild(title);

        let cardFoot = document.createElement("div");
        cardFoot.classList.add("row", "d-flex", "justify-content-between", "ps-2");
        objCont.appendChild(cardFoot);

        let buyBtn = document.createElement("button");
        buyBtn.type = "button";
        buyBtn.classList.add("cardsBtn", "btn", "btn-primary", "d-flex", "justify-content-center", "align-items-center", "col-4");
        buyBtn.style.height = "30px";
        cardFoot.appendChild(buyBtn);

        let iconBuy = document.createElement("i");
        iconBuy.classList.add("fa-solid", "fa-cart-plus", "pt-1");
        iconBuy.style.fontSize = "10pt";
        buyBtn.appendChild(iconBuy);

        let labelBtn = document.createElement("p");
        labelBtn.innerText = "Buy";
        labelBtn.style.color = "white";
        labelBtn.classList.add("m-0", "ms-2");
        buyBtn.appendChild(labelBtn);

        let price = document.createElement("span");
        price.classList.add("col-4", "col-sm-8");
        price.style.color = "white";
        price.style.fontSize = "10pt";
        price.innerText = "Price $ " + element.price;
        cardFoot.appendChild(price);

        return card;
    });
}

const searchFilter = () => {
    console.log(dataJson);
    console.log(searchInput[0].value.length);
    if (searchInput[0].value || searchInput[1].value) {
        cardCont.innerHTML = "";
        let newArray = dataJson.filter((element) => {
            console.log(element.title);
            if (element.title.toLowerCase().includes(searchInput[0].value.toLowerCase() ||searchInput[1].value.toLowerCase())) {
                return element;
            }
        });
        newArray.forEach((element) => {
            let card = document.createElement("div");
            card.classList.add("col-8", "offset-2", "offset-sm-0", "col-sm-4", "col-md-3", "col-xl-2", "p-1");
            cardCont.appendChild(card);

            let objCont = document.createElement("div");
            objCont.classList.add("d-flex", "flex-column", "justify-content-between", "p-2");
            objCont.style.backgroundColor = "rgb(25, 25, 25)";
            objCont.style.borderRadius = "10px";
            objCont.style.height = "100%";
            card.appendChild(objCont);

            let objHead = document.createElement("div");
            objCont.appendChild(objHead);

            let img = document.createElement("img");
            img.src = element.img;
            img.style.width = "100%";
            objHead.appendChild(img);

            let title = document.createElement("p");
            title.innerText = element.title;
            title.style.color = "white";
            objHead.appendChild(title);

            let cardFoot = document.createElement("div");
            cardFoot.classList.add("row", "d-flex", "justify-content-between", "ps-2");
            objCont.appendChild(cardFoot);

            let buyBtn = document.createElement("button");
            buyBtn.type = "button";
            buyBtn.classList.add("cardsBtn", "btn", "btn-primary", "d-flex", "justify-content-center", "align-items-center", "col-4");
            buyBtn.style.height = "30px";
            cardFoot.appendChild(buyBtn);

            let iconBuy = document.createElement("i");
            iconBuy.classList.add("fa-solid", "fa-cart-plus", "pt-1");
            iconBuy.style.fontSize = "10pt";
            buyBtn.appendChild(iconBuy);

            let labelBtn = document.createElement("p");
            labelBtn.innerText = "Buy";
            labelBtn.style.color = "white";
            labelBtn.classList.add("m-0", "ms-2");
            buyBtn.appendChild(labelBtn);

            let price = document.createElement("span");
            price.classList.add("col-4", "col-sm-8");
            price.style.color = "white";
            price.style.fontSize = "10pt";
            price.innerText = "Price $ " + element.price;
            cardFoot.appendChild(price);
        });
    }
};

searchInput.forEach((element) => {
    element.addEventListener("keyup", searchFilter);
});