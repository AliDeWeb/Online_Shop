const cartProductsWrappersSelector: HTMLTableElement =
  document.querySelector(`.products-wrapper`)!;

let productItemsFragment = document.createDocumentFragment();
const totalPriceSelector = document.querySelector(`.total-price`)!;

window.addEventListener(`load`, () => {
  showProducts(cartProductsWrappersSelector);

  totalPriceCal();
});

const showProducts = (wrapperTag: HTMLTableElement) => {
  let products = JSON.parse(localStorage.getItem(`products`)!);
  wrapperTag.innerHTML = "";

  products.forEach(
    (
      el: {
        title: string;
        dec: string;
        img: string;
        price: string;
        id: string;
      },
      index: number
    ) => {
      let item = document.createElement(`tr`);

      let buttonTd = document.createElement(`td`);

      let deleteButton = document.createElement(`button`);

      deleteButton.classList.add(`btn`);
      deleteButton.classList.add(`p-0`);
      deleteButton.innerHTML = `<img src="./assets/imgs/removeIcon.png" alt="icon" />`;

      buttonTd.append(deleteButton);

      deleteButton.addEventListener(`click`, () => {
        deleteCartProducts(el);
      });

      item.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${el.title}</td>
        <td class="products-info">
          <p>${el.dec}</p>
        </td>
        <td class="price-tag">${el.price}</td>
      `;

      item.insertAdjacentElement(`beforeend`, buttonTd);

      productItemsFragment.append(item);
    }
  );

  wrapperTag.append(productItemsFragment);
};

const deleteCartProducts = (productObject: {
  title: string;
  dec: string;
  img: string;
  price: string;
  id: string;
}) => {
  let products = JSON.parse(localStorage.getItem(`products`)!);

  let indexOfItem = products.findIndex(
    (el: {
      title: string;
      dec: string;
      img: string;
      price: string;
      id: string;
    }) => {
      return el.id === productObject.id;
    }
  );

  products.splice(indexOfItem, 1);

  localStorage.setItem(`products`, JSON.stringify(products));

  showProducts(cartProductsWrappersSelector);
  totalPriceCal();
};

const totalPriceCal = () => {
  if (document.querySelectorAll(`.price-tag`).length === 0) {
    totalPriceSelector.innerHTML = `0`;
    return false;
  }

  let totalPrice: number = 0;

  document.querySelectorAll(`.price-tag`).forEach((el) => {
    totalPrice += Number(el.innerHTML);

    totalPriceSelector.innerHTML = `$${totalPrice}`;
  });
};
