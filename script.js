const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];



// Unsplash API
const count = 10;
const apiKey ="M1CJXajs5vLa_bZnZe00G1VdXkzb2UWPb7R86A3wvNY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were load

//Helper function to set attributes on DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements for Links & Photos, Add them to the DOM
function displayPhotos(){
    // Run function for each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_desription,
            title: photo.alt_desription
        })
        // Event Listener, check when each is finished loading



        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        console.log(photo);
    });
}


// Get photos from Unsplash API 
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        console.log(photosArray);
    } catch(error){
        // Catch Error here
    }
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
})

getPhotos();
