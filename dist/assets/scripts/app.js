"use strict";
const productsWrapperSelector = document.querySelector(`.main__products-wrapper`);
const fragment = document.createDocumentFragment();
window.addEventListener(`load`, async () => {
    const data = await fetch(`https://65da4c6cbcc50200fcdcd8ca.mockapi.io/products`);
    const dataResult = await data.json();
    const dataResponse = await dataResult;
    dataResponse.forEach((el) => {
        let newProduc = document.createElement(`div`);
        newProduc.classList.add(`col-lg-4`);
        newProduc.classList.add(`col-md-6`);
        newProduc.classList.add(`col-12`);
        newProduc.innerHTML = `
        <div class="position-relative card">
          <img
            src=${el.img}
            class="card-img-top"
            alt="img"
            loading="lazy"
          />
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">
              ${el.dec}
            </p>
            <button class="product-btn btn btn-primary position-absolute">Add</button>
          </div>
        </div>
    `;
        fragment.append(newProduc);
    });
    productsWrapperSelector.append(fragment);
});
