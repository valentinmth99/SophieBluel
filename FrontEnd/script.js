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
// FirstRequestToGraph(AccessToken).then(function() {
//     alert('testing1234');
// });

// function RequestNextPage(NextPage) {
//     return fetch(NextPage, {
//         method: 'GET'
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(json) {
//         RequestNextPage(json.paging.next);
//     })
//     .catch(function(err) {
//         console.log(`Error: ${err}`)
//     });
// }

// function FirstRequestToGraph(AccessToken) {
//     return fetch('https://graph.facebook.com/v2.8/me?fields=posts.limit(275){privacy}%2Cname&access_token=' + AccessToken, {
//         method: 'GET'
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(json) {
//         if(json.data.length !== 0 ){
//            return RequestNextPage(json.paging.next);
//         }
//     })
//     .catch(function(err) {
//         console.log(`Error: ${err}`)
//     });
// }