const cardCont = document.querySelector(".card-container");
const searchInput = document.querySelectorAll(".search");
const modalBtnCls = document.querySelector(".modal-btnClose");
const modalBtnCls2 = document.querySelector(".modal-btnClose2");
const myModal = document.querySelector(".myModal");
const cartLink = document.querySelectorAll(".cartLink");
const cartDelete = document.querySelector(".cart-delete");
const myModalContent = document.querySelector(".myModal-content");
const objCount = document.querySelector(".obj-count");
const detailsBtn = document.getElementsByClassName("detailsBtn");
const checkOutBtn = document.querySelector(".checkOutBtn");



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
        deleteAll(bookMagazine);
    })
    .catch((err) => console.log("Error: " + err));

const booksShare = (array) => {
    bookMagazine = array.map(element => {
        let card = document.createElement("div");
        card.classList.add("card", "col-8", "offset-2", "offset-sm-0", "col-sm-4", "col-md-3", "col-xl-2", "p-1");
        card.style.backgroundColor = "black";
        cardCont.appendChild(card);

        let objCont = document.createElement("div");
        objCont.classList.add("objCont", "d-flex", "flex-column", "justify-content-between", "p-2");
        objCont.style.backgroundColor = "rgb(25, 25, 25)";
        objCont.style.borderRadius = "10px";
        objCont.style.height = "100%";
        card.appendChild(objCont);

        let objHead = document.createElement("div");
        objHead.classList.add("objHead");
        objCont.appendChild(objHead);

        let img = document.createElement("img");
        img.classList.add("card-img");
        img.src = element.img;
        img.style.width = "100%";
        objHead.appendChild(img);

        let title = document.createElement("p");
        title.classList.add("title");
        title.innerText = element.title;
        title.style.color = "white";
        objHead.appendChild(title);

        let cardFoot = document.createElement("div");
        cardFoot.classList.add("cardFoot", "row", "d-flex");
        cardFoot.style.justifyContent = "space-evenly";
        objCont.appendChild(cardFoot);

        let priceLabel = document.createElement("span");
        priceLabel.classList.add("priceLabel", "col-6", "d-flex", "justify-content-end", "align-items-center", "pb-3");
        priceLabel.style.color = "white";
        priceLabel.style.fontSize = "12pt";
        priceLabel.innerText = "Price $ ";
        cardFoot.appendChild(priceLabel);

        let priceValue = document.createElement("span");
        priceValue.classList.add("priceValue", "col-6", "d-flex", "align-items-center", "pb-3", "px-0");
        priceValue.style.color = "white";
        priceValue.style.fontSize = "12pt";
        priceValue.innerText = element.price;
        cardFoot.appendChild(priceValue);

        let buyBtn = document.createElement("button");
        buyBtn.type = "button";
        buyBtn.classList.add("cardsBtn", "btn", "btn-danger", "d-flex", "justify-content-center", "align-items-center");
        buyBtn.style.height = "30px";
        buyBtn.innerText = "Buy";
        cardFoot.appendChild(buyBtn);

        let detailsBtn = document.createElement("button");
        detailsBtn.type = "button";
        detailsBtn.classList.add("detailsBtn", "btn", "btn-primary", "d-flex", "justify-content-center", "align-items-center");
        detailsBtn.innerText = "Dettagli";
        detailsBtn.addEventListener("click", detailsFunc);
        cardFoot.appendChild(detailsBtn);

        let skipBtn = document.createElement("button");
        skipBtn.type = "button";
        skipBtn.classList.add("skipBtn", "btn", "btn-secondary", "d-flex", "justify-content-center", "align-items-center");
        skipBtn.innerText = "Skip";
        skipBtn.addEventListener("click", (event) => {
            event.target.parentNode.parentNode.parentNode.remove()
        });
        cardFoot.appendChild(skipBtn);

        let id1 = document.createElement("p");
        id1.innerText = element.asin;
        id1.classList.add("id1", "d-none");
        detailsBtn.appendChild(id1);

        let id2 = document.createElement("p");
        id2.innerText = element.asin;
        id2.classList.add("id2", "d-none");
        buyBtn.appendChild(id2);

        return card;
    });
}

const searchFilter = () => {
    if (searchInput[0].value || searchInput[1].value) {
        cardCont.innerHTML = "";
        let newArray = bookMagazine.filter((element) => {
            if (element.innerText.toLowerCase().includes(searchInput[0].value.toLowerCase() || searchInput[1].value.toLowerCase())) {
                return element;
            }
        });
        newArray.forEach((element) => {
            cardCont.appendChild(element);
        });
    }
};


const getCart = () => {
    const cardsBtn = document.querySelectorAll(".cardsBtn");
    const cart = document.querySelector(".cart");
    const cartEmpty = document.querySelector(".cart-empty");

    cardsBtn.forEach((element) => {
        element.addEventListener("click", (event) => {
            objCounter++;
            const idPass = event.target.querySelector(".id2").innerText;
            let originObj = event.target.parentNode.parentNode.parentNode
            let buyedObj = originObj.cloneNode(true);
            const btnsToRemove = buyedObj.querySelectorAll("button");
            const btnSide = buyedObj.querySelector(".cardFoot");
            btnSide.classList.add("justify-content-end");
            const card = originObj.querySelector(".objCont");
            const objCont = buyedObj.querySelector(".objCont");
            card.style.border = "2px solid fuchsia";
            btnsToRemove.forEach((element) => { element.remove() })

            let removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.classList.add("removeBtn", "btn", "btn-secondary", "d-flex", "justify-content-center", "align-items-center", "col-3", "me-3");
            removeBtn.style.height = "30px";
            removeBtn.style.fontSize = "8pt";
            removeBtn.style.border = "1px solid white";
            removeBtn.innerText = "Remove";
            btnSide.appendChild(removeBtn);

            let id3 = document.createElement("p");
            id3.innerText = idPass;
            id3.classList.add("id3", "d-none");
            removeBtn.appendChild(id3);

            objCont.style.border = "none";
            cart.appendChild(buyedObj);
            removeBtn.addEventListener("click", (event) => {
                objCounter--;
                let id3 = event.target.querySelector(".id3").innerText;
                card.style.border = "none";
                let objToRemove = event.target.parentNode.parentNode.parentNode;
                objToRemove.remove();

                let istantCart = document.querySelector(".cart");
                let idAll = istantCart.querySelectorAll(".id3");
                let itsOnCart = false;
                idAll.forEach((element) => {
                    if (element.innerText === id3) {
                        itsOnCart = true;
                    }
                });

                if (itsOnCart) {
                    card.style.border = "2px solid fuchsia";
                } else {
                    card.style.border = "none";
                };

                if (objCounter === 0) {
                    cartEmpty.classList.remove("d-none");
                    objCount.innerText = "";
                } else {
                    objCount.innerText = "Your cart contains " + objCounter + " items."
                };

            });

            if (objCounter > 0) {
                cartEmpty.classList.add("d-none");
                objCount.innerText = "Your cart contains " + objCounter + " items.";
                objCount.style.color = "white";
            };
        });
    });
};

const deleteAll = () => {
    const cards = document.querySelectorAll(".objCont");
    const cartEmpty = document.querySelector(".cart-empty");
    cartEmpty.classList.remove("d-none");
    myModalContent.innerHTML = "";
    objCount.innerText = "";
    objCounter = 0;
    cards.forEach((element) => {
        element.style.border = "none";
    });
};

const detailsFunc = (event) => {
    let endpoint = "/details.html";
    let objId = event.target.querySelector(".id1").innerText;
    window.location.href = `${endpoint}?id=${objId}`;
};

const checkOutFnc = ()=>{
    let cart = document.querySelector(".cart");
    const cartObjs = myModal.querySelectorAll(".priceValue");
    const cards = document.querySelectorAll(".objCont");
    cards.forEach((element)=>{element.style.border = "none";});    
    let sum = 0;
    cartObjs.forEach((element)=>{
        sum += Number(element.innerText);
    });
    cart.innerHTML = "";
    let responseCont = document.createElement("div");
    responseCont.classList.add("response-cont");
    let responseLabel = document.createElement("p");
    responseLabel.innerText =`Total Price for your Shopping is $ ${sum.toFixed(2)}`;
    responseLabel.style.color = "white";
    responseLabel.style.fontSize = "20pt";
    responseLabel.style.textAlign = "center";
    responseCont.appendChild(responseLabel);
    cart.appendChild(responseCont);
};

const closeModal = ()=>{
    let response = document.querySelector(".response-cont");
    if(response){
        response.remove();
        deleteAll();
    }
    myModal.classList.add("d-none");
}


searchInput.forEach((element) => {
    element.addEventListener("keyup", searchFilter);
});

cartLink.forEach((element) => {
    element.addEventListener("click", () => { myModal.classList.remove("d-none") });
});

modalBtnCls.addEventListener("click", closeModal);
modalBtnCls2.addEventListener("click", closeModal);
cartDelete.addEventListener("click", deleteAll);
checkOutBtn.addEventListener("click", checkOutFnc);
