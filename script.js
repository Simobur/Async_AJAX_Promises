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
/*
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
*/

////////////////////////////////////////
////////////////////////////////////////
//Coding challange://///////////////////
////////////////////////////////////////
////////////////////////////////////////
/*
const lat = 14;
const lng = 7;
let country;

const whereAmI = function (lat, lng) {
  fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`)
    .then(response => {
      // console.log(response.ok);
      //   if (!response.ok) return;
      return response.json();
    })
    .then(data => {
      country = data.address.country;
    })
    .catch(err => console.error(`Cannot load current location (${err})`));
};

whereAmI(52.08, 13.381);
*/
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery is start!');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lose your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

const wait = seconds =>
  new Promise(    resolve => setTimeout(resolve, seconds * 1000));

// wait(2)
//   .then(res => {
//     console.log('Wait 2 seconds');
//     return wait(3);
//   })
//   .then(res => {
//     console.log('wait 3 sec');
//     return wait(2);
//   })
//   .then(res => {
//     console.log('Wait 5 sec');
//   });

Promise.resolve('abc').then(x => console.log(x));
Promise.reject('abc').catch(x => console.error(new Error(x)));

// navigator.geolocation.getCurrentPosition(
//   function (position) {
//     console.log(position);
//   },
//   function (err) {
//     console.log(err);
//   }
// );

const position = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      // position => resolve(position),
      // err => reject(err)
      resolve,
      reject
    );
  });
};

console.log(position().then(res => console.log(res.coords)));
*/
/*
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀*/
/*
const img1 = 'img/img-1.jpg';
const img2 = 'img/img-2.jpg';
const img3 = 'img/img-3.jpg';
let currImg;

const image = document.querySelector('.image');
const imagesContainer = document.querySelector('.images');

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const createImage = imgSrc => {
  return new Promise(function (resolve, reject) {
    console.log('Image is loading');
    const image = document.createElement('img');
    image.src = imgSrc;

    image.addEventListener('load', function () {
      console.log('Image loaded! 👍');
      imagesContainer.append(image);
      resolve({ image, description: 'dip' });
      console.log('Dupa');
    });
    image.addEventListener('error', function () {
      reject(new Error('Something goes wrong!'));
    });
  });
};

createImage(img1)
  .then(res => {
    currImg = res.image;
    console.log(res.description);
    return wait(2);
  })
  .then(() => {
    currImg.style.display = 'none';
    return createImage(img2);
  })
  .then(res => {
    currImg = res;
    return wait(2);
  })
  .then(() => {
    currImg.style.display = 'none';
    return createImage(img3);
  })
  .catch(err => console.error(err));

// {
//   recieved((image.src = imgSrc));
//   reject(new Error('Count load image'));
// }

// createImage(img2).then(rel => {
//   console.log(rel);
// });
//   return createImage(img2);
// })
// .then(rel => {
//   console.log(rel);
//   return createImage(img3);
// })
// .then(rel => console.log(rel))
// .catch(err => console.error(err));

/*const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

// wait(2)
//   .then(res => {
//     console.log('Wait 2 seconds');
//     return wait(3);
//   })
//   .then(res => {
//     console.log('wait 3 sec');
//     return wait(2);
//   })
//   .then(res => {
//     console.log('Wait 5 sec');
//   });*/
const renderCountry = function (data) {
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

// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`)
//     .then(response => {
//       // console.log(response.ok);
//       //   if (!response.ok) return;
//       return response.json();
//     })
//     .then(data => {
//       country = data.address.country;
//     })
//     .catch(err => console.error(`Cannot load current location (${err})`));
// };

// const geocode = function (lat,lng){
//  const data = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`);
// console.log(data);
// }
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  const positon = await getPosition();
  const lat = positon.coords.latitude;
  const lng = positon.coords.longitude;

  const geocode = await fetch(
    `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
  );
  const dataG = await geocode.json();

  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

  const loc = await fetch(
    `https://restcountries.com/v3.1/name/${dataG.address.country}`
  );
  const data = await loc.json();
  renderCountry(data[0]);
};

whereAmI();
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    const positon = await getPosition();
    const lat = positon.coords.latitude;
    const lng = positon.coords.longitude;

    const geocode = await fetch(
      `https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}`
    );
    if (!geocode.ok) throw new Error('Problem with get position');

    const dataG = await geocode.json();

    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

    const loc = await fetch(
      `https://restcountries.com/v3.1/name/${dataG.address.country}`
    );
    if (!loc.ok) throw new Error('Problem with get country');
    const data = await loc.json();
    renderCountry(data[0]);
    return `Your position is rendered`;
  } catch (err) {
    console.error(`${err} 💥💥💥`);
  }
};

// let data;
// whereAmI().then(city => console.log(city));
// console.log(data);
// console.log('after');

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch {}
})();

const getJSON = function (url, errMess = 'Something goes wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errMess} (${response.status})`);
    }
    return response.json();
  });
};

const get3Countries = async function (c1, c2, c3) {
  try {
    const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
    console.log(data1.capital, data2.capital, data3.capital);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital[0]));
  } catch (err) {
    console.error(err);
  }
};

// get3Countries('germany', 'poland', 'usa');

/////////////////////
//Promise.race

(async function () {
  const winner = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/poland`),
    getJSON(`https://restcountries.com/v3.1/name/germany`),
    getJSON(`https://restcountries.com/v3.1/name/usa`),
  ]);
  console.log(winner[0].name.common);
})();

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Internet is too slow!'));
    }, s * 1000);
  });
};

Promise.race([
  timeout(5),
  getJSON(`https://restcountries.com/v3.1/name/germany`),
])
  .then(res => console.log(res[0].name.common))
  .catch(err => console.error(err.message));

/////////////////////
//Promise.allSettled

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another Success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

/////////////////////
//Promise.any  [ES2021]
// return first Fullfield resoult

Promise.any([
  Promise.resolve('1 Success'),
  Promise.resolve('Another Success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

const wait = seconds =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

const img1 = 'img/img-1.jpg';
const img2 = 'img/img-2.jpg';
const img3 = 'img/img-3.jpg';

const loadImage = function (imageSrc) {
  let img = document.createElement('img');
  img.src = imageSrc;

  img.addEventListener('load', function () {
    const imagesContainer = document.querySelector('.images');
    imagesContainer.append(img);
    return img;
  });

  img.addEventListener('error', new Error('Something goes wrong! '));
};

const imgArr = [img1, img2, img3];

const loadNPause = async function (arr) {
  let image = await loadImage(arr[2]);
  await console.log(image);
  await wait(2);
  // img.style.display = 'none';
  image = await loadImage(arr[1]);
  await wait(2);
  console.log(image);
  // image.style.display = 'none';
  image = await loadImage(arr[2]);
  await wait(2);
  console.log(image);
  // img.style.display = 'none';
};

loadNPause(imgArr);
