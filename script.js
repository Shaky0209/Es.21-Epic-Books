const cardCont = document.querySelector(".card-container");
const searchInput = document.querySelectorAll(".search");
const modalBtnCls = document.querySelector(".modal-btnClose")
const myModal = document.querySelector(".myModal");
const cartLink = document.querySelectorAll(".cartLink");
const cartDelete = document.querySelector(".cart-delete");
const myModalContent = document.querySelector(".myModal-content");
const objCount = document.querySelector(".obj-count");
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

        let idd = document.createElement("p");
        idd.innerText = element.asin;
        idd.classList.add("id", "d-none");
        objHead.appendChild(idd);

        let cardFoot = document.createElement("div");
        cardFoot.classList.add("cardFoot", "row", "d-flex", "justify-content-between", "ps-2");
        objCont.appendChild(cardFoot);

        let buyBtn = document.createElement("button");
        buyBtn.type = "button";
        buyBtn.classList.add("cardsBtn", "btn", "btn-primary", "d-flex", "justify-content-center", "align-items-center", "col-4");
        buyBtn.style.height = "30px";
        buyBtn.innerText = "Buy";
        cardFoot.appendChild(buyBtn);

        let price = document.createElement("span");
        price.classList.add("price", "col-3", "col-sm-7");
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
        let newArray = bookMagazine.filter((element) => {
            if (element.innerText.toLowerCase().includes(searchInput[0].value.toLowerCase() ||searchInput[1].value.toLowerCase())) {
                return element;
            }
        });
        
        newArray.forEach((element)=>{
            cardCont.appendChild(element);
        });
    }
};


const getCart = ()=>{
    const cardsBtn = document.querySelectorAll(".cardsBtn");
    const cart = document.querySelector(".cart");
    const cartEmpty = document.querySelector(".cart-empty");
    
    cardsBtn.forEach((element)=>{
        element.addEventListener("click", (event)=>{
            objCounter++;
            let originObj = event.target.parentNode.parentNode.parentNode
            let buyedObj = originObj.cloneNode(true);
            const btnToRemove = buyedObj.querySelector(".cardsBtn");
            const btnSide = buyedObj.querySelector("div.row.d-flex.justify-content-between.ps-2");
            const card = originObj.querySelector(".objCont");
            const objCont = buyedObj.querySelector(".objCont");
            card.style.border = "2px solid fuchsia";
            btnToRemove.remove();
            
            let removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.classList.add("removeBtn", "btn", "btn-secondary", "d-flex", "justify-content-center", "align-items-center", "col-3", "me-3");
            removeBtn.style.height = "30px";
            removeBtn.style.fontSize = "8pt";
            removeBtn.style.border = "1px solid white";
            removeBtn.innerText = "Remove";
            btnSide.appendChild(removeBtn);
            
            objCont.style.border = "none";
            cart.appendChild(buyedObj);
            removeBtn.addEventListener("click", (event)=>{
                objCounter--;
                let id = event.target.parentNode.parentNode.querySelector(".id").innerText;
                card.style.border = "none";
                let objToRemove = event.target.parentNode.parentNode.parentNode;
                objToRemove.remove();
                             
                let istantCart = document.querySelector(".cart");
                let idAll = istantCart.querySelectorAll(".id");
                idAll.forEach((element)=>{
                    if(element.innerText === id){
                        card.style.border = "2px solid fuchsia";
                    }else{
                        card.style.border = "none";
                    };                    
                });

                if(objCounter === 0){
                    cartEmpty.classList.remove("d-none");
                    objCount.innerText = "";
                }else{
                    objCount.innerText = "Your cart contains " + objCounter + " items."
                }

            });

            if(objCounter > 0){
                cartEmpty.classList.add("d-none");
                objCount.innerText = "Your cart contains " + objCounter + " items.";
                objCount.style.color = "white";
            }
        });
    });
};

const deleteAll = ()=>{
    const cards = document.querySelectorAll(".objCont");
    const cartEmpty = document.querySelector(".cart-empty");
    cartEmpty.classList.remove("d-none");
    myModalContent.innerHTML = "";
    objCount.innerText = "";
    objCounter = 0;
    cards.forEach((element)=>{
    element.style.border = "none";
    });
};

searchInput.forEach((element) => {
    element.addEventListener("keyup", searchFilter);
});

cartLink.forEach((element)=>{
    element.addEventListener("click", ()=>{myModal.classList.remove("d-none")});
});

modalBtnCls.addEventListener("click", ()=>{myModal.classList.add("d-none")});
cartDelete.addEventListener("click", deleteAll);