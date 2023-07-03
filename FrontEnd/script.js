async function fetchWorks() {
  let url = "http://localhost:5678/api/works";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function fetchCategories() {
  let url = "http://localhost:5678/api/categories";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function displayWorks() {
  let tableWorks = await fetchWorks();
  let galleryDiv = document.querySelector(".gallery");
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
}

async function displayCategories() {
  let tableCategories = await fetchCategories();
  let filtersDiv = document.querySelector(".filters");

  for (i = 0; i < tableCategories.length; i++) {
    let btn = document.createElement("button");
    btn.className = "btnFilter";
    btn.value = tableCategories[i].name;
    btn.innerText = btn.value;
    filtersDiv.appendChild(btn);
  }
}

async function displayAll() {
  try {
    await displayWorks();
    await displayCategories();
  } catch (error) {
    console.log(error);
  }
}

displayAll().then(async () => {
  try {
    let tableWorks = await fetchWorks();
    let galleryDiv = document.querySelector(".gallery");
    let btns = document.querySelectorAll(".btnFilter");
    let worksFiltered = new Set();

    function filterWorks() {
      btns.forEach(function (btn) {
        btn.addEventListener("click", function (event) {
          if (event.target.value == "All") {
            worksFiltered.clear();
            worksFiltered.add(tableWorks);
          } else {
            let filteredTableWorks = tableWorks.filter((cat) => cat.category.name == event.target.value);
            worksFiltered.clear();
            worksFiltered.add(filteredTableWorks);
          }
          galleryDiv.innerHTML = "";

          let filterArray = Array.from(worksFiltered);
          console.log(filterArray);

          for (i = 0; i < filterArray[0].length; i++) {
            let figure = document.createElement("figure");
            let image = document.createElement("img");
            let caption = document.createElement("figcaption");
            galleryDiv.appendChild(figure);
            figure.append(image, caption);

            image.src = filterArray[0][i]["imageUrl"];
            caption.innerText = filterArray[0][i]["title"];
          }
        });
      });
    }

    filterWorks();
  } catch (error) {
    console.log(error);
  }
});

if (localStorage.getItem("token")) {
  
} 