
function openModalFun(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(`call--closed`);
  modal.classList.add(`call--opened`);
    if (modalTimerId) {
  clearInterval(modalTimerId);
  }
}

function closeModalFun(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(`call--opened`);
  modal.classList.add(`call--closed`);
}

function modalFun(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove(`modal--hidden`);
  modal.classList.add(`modal--visible`);
  setTimeout(() => modal.classList.add(`modal--hidden`), 3000);
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

function form (formSelector) {
  const forms = document.querySelectorAll(formSelector);


  function bindPostForm(form) {
      form.addEventListener(`submit`, (e) => {
          e.preventDefault();
          console.log(`111`);

          const formData = new FormData(form);

          const json = JSON.stringify(Object.fromEntries(formData.entries()));
          console.log(json);

          const object = {};
          formData.forEach((value, key) => {
              object[key] = value;
          });

          postForm(`https://availy-764ca.firebaseio.com/requests.json`, json )
          .then(data => {
              console.log(data);
                  closeModalFun(`.call`);
                  form.reset();
                  modalFun(`#requestSend`);
          }).catch(() => {
            console.log(`печаль`);
          }).finally(() => {
              form.reset();
          });

      });
  }
  forms.forEach(item => {
      bindPostForm(item);
  });

  }


window.addEventListener(`DOMContentLoaded`, () => {
  const modalTimerId = setTimeout(() => openModalFun(`.call`, modalTimerId), 50000);
  modal('.page-header__recall', `.call`, modalTimerId);
  form(`form`);


});





