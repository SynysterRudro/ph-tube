console.log("video.js is connected");

// create load categories

const loadCategories = () => {

    console.log("load categories connected");
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
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

      <span class="absolute right-2 bottom-2 bg-black rounded p-1 text-white">${video.others.posted_date}</span>
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

        const button = document.createElement('button');
        button.classList = 'btn';
        button.innerText = item.category;

        // add the button to the container
        categoryContainer.append(button);

    })
}

loadCategories();
loadVideos();
