function openModalFun(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(`call--closed`);
  modal.classList.add(`call--opened`);

  console.log(modalTimerId);
  if (modalTimerId) {
  clearInterval(modalTimerId);
  }
}

function closeModalFun(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(`call--opened`);
  modal.classList.add(`call--closed`);
}

function modal (triggerSelector, modalSelector, modalTimerId) {
  const modalOpen = document.querySelectorAll(triggerSelector),
  modal = document.querySelector(modalSelector);

modalOpen.forEach((btn) => {
  btn.addEventListener(`click`, () => {
      openModalFun(modalSelector, modalTimerId);

  });
});

modal.addEventListener(`click`, (event) => {
  if (event.target.classList.contains(`call__wrapper`) || event.target.getAttribute(`data-close`) == '')  {
          closeModalFun(modalSelector);
  }
});

document.addEventListener(`keydown`, (e) => {
  if (event.code === `Escape` &&  modal.classList.contains(`call--opened`)) {
      closeModalFun(modalSelector);
  }
});


function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModalFun(modalSelector, modalTimerId);
      clearInterval(modalTimerId);
      removeEventListener(`scroll`, showModalByScroll);
  }
}

window.addEventListener(`scroll`, showModalByScroll);
}

window.addEventListener(`DOMContentLoaded`, () => {
  const modalTimerId = setTimeout(() => openModalFun(`.call`, modalTimerId), 50000);
  modal('.page-header__recall', `.call`, modalTimerId);


});
