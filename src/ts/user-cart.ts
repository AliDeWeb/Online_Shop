const cartProductsWrappersSelector: HTMLTableElement =
  document.querySelector(`.products-wrapper`)!;

let productItemsFragment = document.createDocumentFragment();

window.addEventListener(`load`, () => {
  showProducts(cartProductsWrappersSelector);
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
        <td>${el.price}</td>
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
};
