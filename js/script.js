document.querySelector('.setting__select').addEventListener('change', (event) => {
  const selectedOptionValue = event.target.value;
  console.log(selectedOptionValue);

  let cardImagesElm = document.querySelector('.card__images');
  let cardTextFontElm = document.querySelector('.card__text--font');

  if (selectedOptionValue === 'lantern') {
    cardImagesElm.src = './images/christmas-lantern.png';
    cardTextFontElm.innerHTML = 'Nechť vánoční lucerna v tuto sváteční dobu rozjasává nejen temné noci, ale i Tvé srdce. Ať její světlo nese s sebou radost, pokoj a lásku.';
  } else {
    cardImagesElm.src = './images/christmas-tree.png';
    cardTextFontElm.innerHTML = 'Nechť vánoční stromeček zazáří radostí a pohodou do Tvého srdce. Ať tyto svátky přinesou do Tvého života klid, lásku a harmonii.';
  }
});

document.querySelector('.setting__button').addEventListener('click', (event) => {
  event.preventDefault();
  const inputValueFrom = document.querySelector('.setting__input--from').value;
  document.querySelector('.card__text--name').classList.add('visit');
  document.querySelector('.snowfall').classList.remove('hidden');
  document.querySelector('.card__text--name').innerHTML = inputValueFrom;

  document.querySelector('.container').style.backgroundColor = 'transparent';
  document.querySelector('.card').style.backgroundColor = 'transparent';

  const cardForm = document.querySelector('.setting__form');
  cardForm.classList.add('hidden');

  const music = document.querySelector('#music');
  music.addEventListener('ended', () => {
    music.currentTime = 0;
    music.play();
  });

  setTimeout(() => {
    music.play();
  }, 200);

  document.querySelector('.navigation').classList.remove('hidden');

  document.querySelector('.mute').addEventListener('click', () => {
    music.volume = 1.0;
    document.querySelector('.mute').classList.add('hidden');
    document.querySelector('.unmute').classList.remove('hidden');
  });

  document.querySelector('.unmute').addEventListener('click', () => {
    music.volume = 0.0;
    document.querySelector('.unmute').classList.add('hidden');
    document.querySelector('.mute').classList.remove('hidden');
  });

  document.querySelector('.footer').classList.add('hidden');
});

document.querySelector('.setting__input--from').addEventListener('input', (event) => {
  const buttonElement = document.querySelector('.setting__button');
  if (event.target.value.length > 0) {
    buttonElement.classList.remove('disabled');
    buttonElement.removeAttribute('disabled');
  } else {
    buttonElement.classList.add('disabled');
  }
});