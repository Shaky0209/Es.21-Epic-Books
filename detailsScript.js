const detailsContent = document.querySelector(".details-content");
const objImg = document.querySelector(".obj-img");
const objTitle = document.querySelector(".obj-title");
const objId = document.querySelector(".obj-id");
const objCategory = document.querySelector(".obj-category");
const objPrice = document.querySelector(".obj-price");
const params = new URLSearchParams(location.search);
const id = params.get("id");

fetch(`https://striveschool-api.herokuapp.com/books/${id}`)
.then((response)=> response.json())
.then((json)=> detailsCompilate(json));

const detailsCompilate = (json)=>{
    objImg.src = json.img;
    objImg.alt = json.title;
    objTitle.innerText = `Title: ${json.title}`;
    objId.innerText = `Object Id: ${json.asin}`;
    objCategory.innerText = `Category: ${json.category}`;
    objPrice.innerText = `Price $ ${json.price}`;
}