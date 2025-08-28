console.log("video.js is connected");


function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minutes = parseInt(remainingSeconds / 60);
    remainingSeconds = remainingSeconds % 60;

    return `${hour > 0 ? hour + '' : ''} hour ${minutes < 10 ? '0' + minutes : minutes} minutes ${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds} seconds ago`;
}

// active button removing 

const removeActiveClass = () => {

    const buttons = document.getElementsByClassName('category-btn');
    for (const btn of buttons) {
        btn.classList.remove("bg-primary", "text-white");
    }

}

// create load categories

const loadCategories = () => {

    console.log("load categories connected");
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error));
}

// category video loading 

const loadCategoryVideos = (id) => {
    // alert(id);


    fetch(` https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {

            // to make a certain button active
            removeActiveClass();

            // sob active korsi 
            const activeBtn = document.getElementById(`btn-${id}`);
            // console.log(activeBtn);
            activeBtn.classList.add("bg-primary", "text-white");
            displayVideos(data.category)
        })
        .catch(error => console.log(error));
}


// loading videos 

const loadVideos = () => {

    console.log("load categories connected");
    // fetch the data
    fetch(' https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error));
}


// display videos 

const displayVideos = (videos) => {
    // console.log(videos);

    const videoContainer = document.getElementById('videos');

    videoContainer.innerHTML = '';

    if (videos.length === 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        
        <img src="assets/Icon.png"/>

        <h2 class="text-2xl font-bold">No videos found</h2>
        </div>
        `;
        return;
    }

    else {
        videoContainer.classList.add("grid");
    }

    videos.forEach(video => {
        console.log(video);

        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
        <figure class="h-[200px] relative">
    <img
      src="${video.thumbnail}"
      alt="Shoes"
      class="rounded-xl h-full w-full object-cover" />

      ${video.others.posted_date.length == 0 ? '' : `<span class="absolute text-xs right-2 bottom-2 bg-black rounded p-1 text-white">${getTimeString(video.others.posted_date)}</span>`
            }
  </figure>
  <div class="px-0 py-2 flex gap-2">
   
<div>

<img
      src="${video.authors[0].profile_picture}"
      alt="profile picture"
      class="w-10 h-10 rounded-full object-cover" />

</div>
<div class="px-2 py-2">
  <!-- Video Title -->
  <h2 class="font-bold">${video.title}</h2>

  <!-- Author + Verified Badge -->
  <div class="flex items-center gap-2 mt-1">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>

    ${video.authors[0].verified ? `<img
                src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000"
                alt="verified"
                class="w-5"
            />` : ""}

  </div>

  <!-- fh text -->
  <p>fh</p>
</div>


  </div>
        `;
        videoContainer.append(card)
    })
}

// display loaded categories
const displayCategories = (categories) => {

    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        console.log(item);

        // create button
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `<button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}</button>`;



        // add the button to the container
        categoryContainer.append(buttonContainer);
    })
}

loadCategories();
loadVideos();
