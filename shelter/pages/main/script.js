'use strict'

const burger = document.querySelector('.header__burger')
const burgerMenu = document.querySelector('.hidden__menu')
const hiddenBurger = document.querySelector('.hidden__burger')
const blackout = document.querySelector('.divBlackout')
const body = document.querySelector('.body')
const helpLink = document.querySelector('.help')
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

helpLink.addEventListener('click', () => {
    burgerMenu.style.right = '-320px'
    blackout.classList.remove('blackout')
    body.style.overflow = 'scroll'
    burger.style.transform = 'rotate(0deg)'
})

contactsLink.addEventListener('click', () => {
    burgerMenu.style.right = '-320px'
    blackout.classList.remove('blackout')
    body.style.overflow = 'scroll'
    burger.style.transform = 'rotate(0deg)'
})

const modal = document.querySelector('.modal_window');
const closeBtn = document.querySelector('.btn_close');
const backgroundModal = document.querySelector('.background__modal');

let data;
const randomArr = randomArray();
getJSON(randomArr);

async function getJSON(randomArr) {
    const res = await fetch('../../assets/data/pets.json');
    data = await res.json();

    for (let i = 0; i < 3; i++) {
        createCard(data[randomArr[i]], `card-${i + 1}`);
    }
}

function createCard(data, numCard) {
    const card = document.createElement('div');
    card.classList.add('ourFriends__card', numCard);
    card.innerHTML = `
        <img src="${data.img}" alt="picture" class="our-friend-card__img">
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
    const popup = document.createElement('section');
    popup.classList.add('modal__content');
    popup.innerHTML = `
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
    document.querySelector(`.modal__content`).replaceWith(popup);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function randomArray() {
    let orderedArr = [0, 1, 2, 3, 4, 5, 6, 7];
    let result = [];
    for (let i = 0; i < 8; i++) {
        let item = orderedArr.splice(getRandomInt(8 - i), 1);
        result.push(item[0]);
    }
    return result;
}

closeBtn.addEventListener('click', () => {
    modal.style.right = '-952px';
    modal.style.top = '0px';
    modal.style.top = 'inherit';
    body.style.overflow = 'scroll';
    backgroundModal.classList.remove('blackout')
});

backgroundModal.addEventListener('click', () => {
    modal.style.right = '-952px';
    modal.style.top = '0px';
    modal.style.top = 'inherit';
    body.style.overflow = 'scroll';
    backgroundModal.classList.remove('blackout')
});


const sliderArrowLeft = document.querySelector('.ourFriends__arrow-left');
const sliderArrowRight = document.querySelector('.ourFriends__arrow-right');

let currentIndex = 0;

function updateIndexRight(count) {
    currentIndex += count;
    if (currentIndex > 7) {
        currentIndex -= 8;
    }
}

function updateIndexLeft(count) {
    currentIndex -= count;
    if (currentIndex < 0) {
        currentIndex += 8;
    }
}

function newArr() {
    let arr = [];

    if (currentIndex < 6) {
        arr = randomArr.slice(currentIndex, currentIndex + 3);
    } else if (currentIndex === 6) {
        arr = randomArr.slice(currentIndex);
        arr.push(randomArr[0]);
    } else if (currentIndex === 7) {
        arr = randomArr.slice(currentIndex);
        arr.push(randomArr[0]);
        arr.push(randomArr[1]);
    }
    return arr;
}

sliderArrowRight.addEventListener('click', () => {
    updateIndexRight(3);
    const arr = newArr();
    getJSON(arr);
});

sliderArrowLeft.addEventListener('click', () => {
    updateIndexLeft(3);
    const arr = newArr();
    getJSON(arr);
});

