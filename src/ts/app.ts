const productsWrapperSelector = document.querySelector(
  `.main__products-wrapper`
)!;
const paginationWrapperSelector =
  document.querySelector(`.pagination-wrapper`)!;
const productsFragment = document.createDocumentFragment();
const paginationFragment = document.createDocumentFragment();

let datas: any;

window.addEventListener(`load`, async () => {
  const data: any = await fetch(
    `https://65da4c6cbcc50200fcdcd8ca.mockapi.io/products`
  );
  const dataResult = await data.json();
  const dataResponse: {
    id: number;
    title: string;
    dec: string;
    img: string;
  }[] = await dataResult;

  datas = dataResponse;

  paginationFeature(
    productsWrapperSelector,
    paginationWrapperSelector,
    6,
    1,
    datas
  );

  document.querySelector(`.pagination-btn`)!.classList.add(`active`);
});

const paginationFeature = (
  itemsWrapper: Element,
  paginationWrapper: Element,
  itemsNum: number,
  currentPage: number,
  itemsArray: any
) => {
  itemsWrapper.innerHTML = "";

  if (!paginationWrapper.innerHTML) {
    let paginationNums: number = itemsArray.length / itemsNum;
    for (let i = 0; i <= paginationNums; i++) {
      let newEl = document.createElement(`span`);
      newEl.classList.add(`pagination-btn`);
      newEl.classList.add(`rounded-4`);
      newEl.classList.add(`bg-dark`);
      newEl.classList.add(`text-white`);
      newEl.classList.add(`d-flex`);
      newEl.classList.add(`justify-content-center`);
      newEl.classList.add(`align-items-center`);
      let num = i + 1;
      newEl.innerHTML = num.toString();
      newEl.addEventListener(`click`, (e) => {
        let allActiveItems = document.querySelectorAll(
          `.pagination-btn.active`
        )!;
        allActiveItems.forEach((el) => el.classList.remove(`active`));
        let el = e.target as Element;
        el.classList.add(`active`);

        paginationFeature(
          productsWrapperSelector,
          paginationWrapperSelector,
          6,
          Number(el.innerHTML),
          datas
        );
      });
      paginationFragment.append(newEl);
    }
  }

  paginationWrapper.appendChild(paginationFragment);

  let firstIndex: number = itemsNum * currentPage - itemsNum;
  let lastIndex: number = itemsNum * currentPage;

  itemsArray
    .slice(firstIndex, lastIndex)
    .forEach((el: { id: number; title: string; dec: string; img: string }) => {
      let newProduc: HTMLDivElement = document.createElement(`div`);
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

      productsFragment.append(newProduc);
    });
  itemsWrapper.append(productsFragment);
};
