const cardCont = document.querySelector(".card-container");
const searchInput = document.querySelectorAll(".search");
const modalBtnCls = document.querySelector(".modal-btnClose")
const myModal = document.querySelector(".myModal");
const cartLink = document.querySelector(".cartLink");
let objCounter = 0;
let bookMagazine;
let dataJson;

fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => response.json())
    .then((json) => {
        dataJson = json;
        booksShare(json);
        searchFilter(json);
        getCart(bookMagazine);
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
        buyBtn.innerText = "Buy";
        cardFoot.appendChild(buyBtn);

        let price = document.createElement("span");
        price.classList.add("col-3", "col-sm-7");
        price.style.color = "white";
        price.style.fontSize = "10pt";
        price.innerText = "Price $ " + element.price;
        cardFoot.appendChild(price);

        return card;
    });
}

const searchFilter = () => {
    
    if (searchInput[0].value || searchInput[1].value) {
        cardCont.innerHTML = "";
        let newArray = dataJson.filter((element) => {
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
            buyBtn.innerText = "Buy";
            cardFoot.appendChild(buyBtn);

            let price = document.createElement("span");
            price.classList.add("col-4", "col-sm-6",);
            price.style.color = "white";
            price.style.fontSize = "10pt";
            price.innerText = "Price $ " + element.price;
            cardFoot.appendChild(price);

        });
        getCart();
    }
};


const getCart = ()=>{
    const cardsBtn = document.querySelectorAll(".cardsBtn");
    const cart = document.querySelector(".cart");
    const cartEmpty = document.querySelector(".cart-empty");
    console.log(cartEmpty);
    
    cardsBtn.forEach((element)=>{
        element.addEventListener("click", (event)=>{
            objCounter++;
            buyedObj = event.target.parentNode.parentNode.parentNode.cloneNode(true);
            const btnToRemove = buyedObj.querySelector(".cardsBtn");
            const btnSide = buyedObj.querySelector("div.row.d-flex.justify-content-between.ps-2");
            btnToRemove.remove();

            let removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.classList.add("removeBtn", "btn", "btn-secondary", "d-flex", "justify-content-center", "align-items-center", "col-4", "me-3");
            removeBtn.style.height = "30px";
            removeBtn.style.fontSize = "9pt";
            removeBtn.style.border = "1px solid white";
            removeBtn.innerText = "Remove";
            btnSide.appendChild(removeBtn);

            cart.appendChild(buyedObj);

            removeBtn.addEventListener("click", (event)=>{
                objCounter--;
                let objToRemove = event.target.parentNode.parentNode.parentNode;
                objToRemove.remove();

                console.log(objCounter);
                if(objCounter === 0){
                    console.log("d-block");
                    cartEmpty.classList.remove("d-none");
                }

            });

            console.log(objCounter);
            if(objCounter > 0){
                console.log("d-none")
                cartEmpty.classList.add("d-none");
            }
        });
    });
};

searchInput.forEach((element) => {
    element.addEventListener("keyup", searchFilter);
});

modalBtnCls.addEventListener("click", ()=>{myModal.classList.add("d-none")});

cartLink.addEventListener("click", ()=>{myModal.classList.remove("d-none")});