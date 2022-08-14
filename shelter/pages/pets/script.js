'use strict'

const burger = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.hidden__menu')
const hiddenBurger = document.querySelector('.hidden__burger')
const blackout = document.querySelector('.divBlackout')
const body = document.querySelector('.body')
const contactsLink = document.querySelector('.contacts')

burger.addEventListener('click', () => {
    burgerMenu.style.right = '0'
    blackout.classList.add('blackout')
    body.style.overflow = 'hidden'
    burger.style.transform = 'rotate(90deg)'
    burger.style.zIndex = '2'
})

hiddenBurger.addEventListener('click', () => {
    burgerMenu.style.right = '-320px'
    blackout.classList.remove('blackout')
    body.style.overflow = 'scroll'
    burger.style.transform = 'rotate(0deg)'
    burger.style.zIndex = '5'
})

contactsLink.addEventListener('click', () => {
    burgerMenu.style.right = '-320px'
    blackout.classList.remove('blackout')
    body.style.overflow = 'scroll'
    burger.style.transform = 'rotate(0deg)'
})

const arrowLeft = document.querySelector('.arrow-prev');
const arrowFirst = document.querySelector('.arrow-first');
const numPage = document.querySelector('.pagination__number');
const arrowRight = document.querySelector('.arrow-next');
const arrowLast = document.querySelector('.arrow-last');
const modal = document.querySelector('.modal_window');
const closeModal = document.querySelector('.btn_close');
const backgroundModal = document.querySelector('.background__modal');

let data;
let currentIndex = 0;
let currentPage = parseInt(numPage.innerText); 
let maxCountPages = 6;
let oldMaxCountPages = maxCountPages;

const randomArr = getRandomBigArray();

window.addEventListener('DOMContentLoaded', changeMaxCountPages());
window.onresize = resize;

function resize() {
    changeMaxCountPages();

    if (oldMaxCountPages !== maxCountPages) {
        if (currentPage !== 1) {
            if (oldMaxCountPages === 6) {
                if (maxCountPages === 8) {
                    currentPage = Math.ceil(currentPage *= 1.3);
                } else if (maxCountPages === 16)
                    currentPage = Math.ceil(currentPage *= 2.6);
            } else if (oldMaxCountPages === 8) {
                if (maxCountPages === 6) {
                    currentPage = Math.floor(currentPage /= 1.3);
                } else if (maxCountPages === 16)
                    currentPage = Math.ceil(currentPage *= 2);
            } else if (oldMaxCountPages === 16) {
                if (maxCountPages === 6) {
                    currentPage = Math.floor(currentPage /= 2.6);
                } else if (maxCountPages === 8)
                    currentPage = Math.floor(currentPage /= 2);
            }
        }

        oldMaxCountPages = maxCountPages;
        numPage.innerText = `${currentPage}`;
    }
}

getJSON(randomArr);
async function getJSON(randomArr) {
    const res = await fetch('../../assets/data/pets.json');
    data = await res.json();

    for (let i = 0; i < 8; i++) {
        createCard(data[randomArr[i]], `card-pet-${i + 1}`);
    }
}

function createCard(data, numCard) {
    const card = document.createElement('div');
    card.classList.add(numCard, 'ourFriends__card');
    card.innerHTML = `
        <img src="${data.img}" alt="picture">
        <h4 class="ourFriends__card-name">${data.name}</h4>
        <button class="ourFriends__card-btn">Learn more</button>
    `;

    card.addEventListener('click', () => {
        createModal(data);
        modal.style.right = '9%';
        modal.style.top = '50%';
        modal.style.left = '55.5%';
        modal.style.transform = 'translate(-50%,-50%)';

        backgroundModal.classList.add('blackout');
        body.style.overflow = 'hidden'
    });
    document.querySelector(`.${numCard}`).replaceWith(card);
}

function createModal(data) {
    const element = document.createElement('section');
    element.classList.add('modal__content');
    element.innerHTML = `
        <img class="modal__img" src="${data.img}" alt="${data.name}">
        <div class="modal-text">
            <h3 class="modal__title">${data.name}</h3>
            <h4 class="modal__subtitle">${data.type} - ${data.breed}</h4>
            <h5 class="modal__subheading">${data.description}</h5>
            <ul class="modal__list">
                <li class="modal-list__item"><span class="point">&bull;</span><strong>Age: </strong>${data.age}</li>
                <li class="modal-list__item"><span class="point">&bull;</span><strong>Inoculations: </strong>${data.inoculations.join(', ')}</li>
                <li class="modal-list__item"><span class="point">&bull;</span><strong>Diseases: </strong>${data.diseases.join(', ')}</li>
                <li class="modal-list__item"><span class="point">&bull;</span><strong>Parasites: </strong>${data.parasites.join(', ')}</li>
            </ul>
        </div>
    `;
    document.querySelector(`.modal__content`).replaceWith(element);
}

function getRandomBigArray() {
    let bigRandomArray = [];
    for(let i = 0; i < 6; i++)
        bigRandomArray = bigRandomArray.concat(randomArray());
    return bigRandomArray
}

function getRandomInt(max) {
    let rand = Math.random() * (max + 1);
    return Math.floor(rand);
}

function randomArray() {
    let currentArr = [0, 1, 2, 3, 4, 5, 6, 7];
    let arr = [];
    for (let i = 0; i < 8; i++) {
        let removed = currentArr.splice(getRandomInt(8 - i - 1), 1);
        arr.push(removed[0]);
    }
    return arr;
}

closeModal.addEventListener('click', () => {
    modal.style.right = '-952px';
    modal.style.top = '0px';
    modal.style.top = 'inherit';
    body.style.overflow = 'scroll'
    backgroundModal.classList.remove('blackout');
});

backgroundModal.addEventListener('click', () => {
    modal.style.right = '-952px';
    modal.style.top = '0px';
    modal.style.top = 'inherit';
    body.style.overflow = 'scroll'
    backgroundModal.classList.remove('blackout');
});

function changeMaxCountPages() {
    if(window.innerWidth >= 1280)
        maxCountPages = 6;
    else if(window.innerWidth >= 768)
        maxCountPages = 8;
    else if(window.innerWidth >= 0)
        maxCountPages = 16;
}

function updateIndexRight(count) {
    currentIndex += count;
    if (currentIndex > 47) {
        currentIndex -= 48;
    }
}

function updateIndexLeft(count) {
    currentIndex -= count;
    if (currentIndex < 0) {
        currentIndex += 48;
    }
}

function newArr() {
    let arr = [];

    if (currentIndex < 41) {
        arr = randomArr.slice(currentIndex, currentIndex + 8);
    } 
    else {
        arr = randomArr.slice(currentIndex);
        arr = arr.concat(randomArr.slice(0, 8 - arr.length))
    }

    return arr;
}

const prevArrows = document.querySelectorAll('.pagination__arrow-prev')

arrowFirst.addEventListener('click', () => {
    currentIndex = 0;
    const arr = newArr();
    getJSON(arr);

    currentPage = 1;
    numPage.innerText = `${currentPage}`;

    arrowLeft.style.border = '2px solid #CDCDCD';
    arrowFirst.style.border = '2px solid #CDCDCD';
    arrowLeft.style.cursor = 'default';
    arrowFirst.style.cursor = 'default';
    arrowFirst.style.color = '#CDCDCD';
    arrowLeft.style.color = '#CDCDCD';

    arrowFirst.classList.remove('activeArrow');
    arrowLeft.classList.remove('activeArrow');

    arrowRight.classList.remove('disabledArrow');
    arrowLast.classList.remove('disabledArrow');
    arrowRight.classList.add('activeArrow');
    arrowLast.classList.add('activeArrow');
});

arrowLeft.addEventListener('click', () => {
    if(currentPage > 1) {
        updateIndexLeft(8);
        const arr = newArr();
        getJSON(arr);

        currentPage--;
        numPage.innerText = `${currentPage}`;

        arrowLast.classList.replace('disabledArrow','activeArrow');
        arrowRight.classList.replace('disabledArrow','activeArrow');
    }

    if (currentPage === 1) {
        arrowLeft.style.border = '2px solid #CDCDCD';
        arrowFirst.style.border = '2px solid #CDCDCD';
        arrowLeft.style.cursor = 'default';
        arrowFirst.style.cursor = 'default';
        arrowFirst.style.color = '#CDCDCD';
        arrowLeft.style.color = '#CDCDCD';
        arrowLeft.classList.remove('activeArrow');
        arrowFirst.classList.remove('activeArrow');
        arrowRight.classList.add('activeArrow');
        arrowLast.classList.add('activeArrow');
    }
});

arrowRight.addEventListener('click', () => {
    if(currentPage <= maxCountPages - 1) {
        updateIndexRight(8);
        const arr = newArr();
        getJSON(arr);

        currentPage++;
        numPage.innerText = `${currentPage}`;

        arrowLeft.style.border = '2px solid #F1CDB3';
        arrowLeft.style.cursor = 'pointer';
        arrowFirst.style.border = '2px solid #F1CDB3';
        arrowFirst.style.cursor = 'pointer';
        arrowLeft.style.color = '#292929';
        arrowFirst.style.color = '#292929';

        arrowLeft.classList.add('activeArrow');
        arrowFirst.classList.add('activeArrow');
    }

    if (currentPage === 6) {
        arrowLast.classList.replace('pagination__arrow-next', 'disabledArrow');
        arrowRight.classList.replace('pagination__arrow-next', 'disabledArrow');
        arrowLast.classList.replace('activeArrow', 'disabledArrow');
        arrowRight.classList.replace('activeArrow', 'disabledArrow');
    }
});

arrowLast.addEventListener('click', () => {
    currentIndex = 40;
    const arr = newArr();
    getJSON(arr);

    currentPage = maxCountPages;
    numPage.innerText = `${currentPage}`;

    arrowLeft.style.border = '2px solid #F1CDB3';
    arrowLeft.style.cursor = 'pointer';
    arrowFirst.style.border = '2px solid #F1CDB3';
    arrowFirst.style.cursor = 'pointer';
    arrowLeft.style.color = '#292929';
    arrowFirst.style.color = '#292929';
    arrowFirst.classList.add('activeArrow');
    arrowLeft.classList.add('activeArrow');

    arrowRight.classList.add('disabledArrow');
    arrowLast.classList.add('disabledArrow');
    arrowRight.classList.add('activeArrow');
    arrowLast.classList.add('activeArrow');

    arrowLast.classList.replace('pagination__arrow-next','disabledArrow');
    arrowRight.classList.replace('pagination__arrow-next','disabledArrow');
});
