'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

////////////////////////////////////
////////////////////////////////////
/*const renderCountry = function (data) {
  const currencies = [data.currencies][0];
  const languages = [data.languages][0];

  const html = `
<article class="country">
<img class="country__img" src="${data.flags.png}" />
<div class="country__data">
<h3 class="country__name">${data.name.common}</h3>
<h4 class="country__region">${data.region}</h4>
<p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    0
  )}mln people</p>
<p class="country__row"><span>🗣️</span>${Object.values(languages)[0]}</p>
<p class="country__row"><span>💰</span>${Object.values(currencies)[0].name}</p>
</div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
  });
};

getCountry('german');*/

////////////////////////////////////
////////////////////////////////////

const renderCountry = function (data, nClass) {
  const currencies = [data.currencies][0];
  const languages = [data.languages][0];

  const html = `
  <article class="country ${nClass}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(
    0
  )}mln people</p>
  <p class="country__row"><span>🗣️</span>${Object.values(languages)[0]}</p>
  <p class="country__row"><span>💰</span>${
    Object.values(currencies)[0].name
  }</p>
  </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  //   countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {
  const request = new XMLHttpRequest();

  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    //   console.log(this.responseText);
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);
    console.log(data);

    const [neighbour] = data.borders;
    console.log(neighbour);

    if (!neighbour)
      // countriesContainer.innerHTML = '';
      throw new Error('No neighbour found!');

    const requestN = new XMLHttpRequest();

    requestN.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    requestN.send();

    requestN.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountry('german');

//Oldschool requesting
// const request = new XMLHttpRequest();

// request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// request.send();

////////////////////////////////////////
//Modern way:
////////////////////////////////////////

// const fetchRequest = fetch('https://restcountries.com/v3.1/name/poland');

// console.log(fetchRequest);

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errMess = 'Something goes wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMess} (${response.status})`);
    }
    return response.json();
  });
};

// const fetchGetCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       const neighbour = data[0].borders[0];
//       console.log(neighbour);
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     })
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something goes wrong! ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

btn.addEventListener('click', function () {
  //   countriesContainer.innerHTML = '';
  //   const answer = prompt('What is your country?');
  fetchGetCountry('australia');
});

const fetchGetCountry = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found!'
  )
    .then(data => {
      renderCountry(data[0]);

      let neighbour = data[0].borders[0];
      //   console.log(neighbour);
      //   neighbour = 'asdads';
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found!'
      );
    })
    .then(data => {
      renderCountry(data[0], 'neighbour');
    })
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something goes wrong! ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
