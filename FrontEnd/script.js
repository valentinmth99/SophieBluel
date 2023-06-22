let user = {
    email: 'sophie.bluel@test.tld',
    password: 'S0phie'
};
  
function loginAPI(user) {
    return fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
})}

let tableWorks;

function getWorks() {
fetch('http://localhost:5678/api/works')
.then( results => results.json())
.then( results => tableWorks = results)
.then(() => console.log(tableWorks));
};

let exeAPI = loginAPI(user).then(getWorks());

exeAPI.then(() => { 
    let galleryDiv = document.querySelector('.gallery');
    galleryDiv.innerHTML = "";
    for (i = 0; i < tableWorks.length; i++) {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        let caption = document.createElement("figcaption");
        galleryDiv.appendChild(figure);
        figure.append(image, caption);

        image.src = tableWorks[i].imageUrl;
        caption.innerText = tableWorks[i].title;
    }   
})
