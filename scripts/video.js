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
