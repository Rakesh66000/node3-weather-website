console.log('clientside javascript file loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/weather?address='+search.value+'').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = '';
                messageTwo.innerHTML =  
                data.Location + "<br/>"+ 
                data.Temperature +"<br/>"+
                data.Summary;
            }
    
        })
    })
})