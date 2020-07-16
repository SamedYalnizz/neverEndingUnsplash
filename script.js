const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash API
const count = 30;
const apiKey ="M1CJXajs5vLa_bZnZe00G1VdXkzb2UWPb7R86A3wvNY";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were load
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('ready =', ready)
        imagesLoaded = 0;
    }
}
//Helper function to set attributes on DOM Elements 
function setAttributes(element, attributes) {
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}


// Create Elements for Links & Photos, Add them to the DOM
function displayPhotos(){
    totalImages= photosArray.length;
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
        img.addEventListener('load', imageLoaded);


        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from Unsplash API 
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        // Catch Error here
    }
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

getPhotos();
