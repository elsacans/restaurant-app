import CONFIG from "../../globals/config";

const createRestoDetailTemplate = (resto) => `
    <h2 class="resto_title">${resto.title}</h2>
    <img class="resto_poster" src="${CONFIG.BASE_IMAGE_URL + resto.poster_path}" alt="${resto.title}"/>
    <div class="resto_info">
        <h3>Information</h3>
        <h4>Description</h4>
        <p>${resto.description}</p>
        <h4>City</h4>
        <p>${resto.city}</p>
        <h4>Address</h4>
        <p>${resto.address}</p>
        <h4>Categories</h4>
        <p>${resto.categories}</p>
        <h4>Menus</h4>
        <p>${resto.menus}</p>
        <h4>Rating</h4>
        <p>${resto.rating}</p>
        <h4>Customer Reviews</h4><
        <p>${resto.customerReviews}</p>
    </div>
`;

const createRestoItemTemplate = (resto) => `
<div class="resto-item">
<div class="resto-item_header">
<img class="resto-item_header_poster" alt="${resto.title}"
    src="${resto.backdrop_path ? CONFIG.BASE_IMAGE_URL + resto.backdrop_path : 'https://restaurant-api.dicoding.dev/images/medium/<pictureId>'}">
<div class="resto-item_header_rating"> 
    <p>⭐️<span class="resto-item_header_rating_score">${resto.rating}</span></p>
</div>
</div>
<div class="resto-item_content">
<h3><a href="/#/detail/${resto.id}">${resto.title}</a></h3>
<p>${resto.overview}</p>
</div>
</div>
`;

export {createRestoDetailTemplate, createRestoItemTemplate};