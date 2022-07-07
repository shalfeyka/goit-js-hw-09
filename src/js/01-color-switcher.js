const references = {
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
};
references.buttonStop.setAttribute('disabled', '');
 let colorSwitch = null; 


 references.buttonStart.addEventListener('click', startRandom);

 references.buttonStop.addEventListener ('click', () => {
   
    clearInterval(colorSwitch);
    references.buttonStart.removeAttribute('disabled');
    references.buttonStop.setAttribute('disabled', '');
    
 });

 function startRandom () {
    colorSwitch = setInterval(() => {
        document.body.style.backgroundColor =`${getRandomHexColor()}`;
    },
    1000);
    references.buttonStart.setAttribute('disabled', '');
    references.buttonStop.removeAttribute('disabled');
 };

 function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};




//  function onStart(evt) {
//     evt.preventDefaulf();
//     references.buttonnStart.disabled = false;
//     references.buttonnStart.style.color = '#800080';

//     intr = setInterval(() => {
//         const colorSwitch = getRandomHexColor ();
//         references.body.style.background =colorSwitch;
//  }, 
//  1000);
//  };

//  function onStop(evt) {
//     evt.preventDefaulf();
//     clearInterval(intr);

//     references.buttonnStart.style.disabled = true;
//     references.buttonnStart.style.color = '#000080';
//     references.buttonnStart.addEventListener('click', onStart);
//  }

//  function getRandomHexColor() {
//     return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }