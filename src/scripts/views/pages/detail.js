import CONFIG from '../../globals/config';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="loading" class="loading">Loading...</div>
      <div id="restaurant-detail" class="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
      <div id="reviewFormContainer" class="review-form-container">
        <h3>Add Your Review</h3>
        <form id="reviewForm">
          <input type="text" id="reviewName" placeholder="Your Name" required>
          <textarea id="reviewText" placeholder="Your Review" required></textarea>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    `;
  },

  async afterRender() {
    const url = window.location.hash;
    const id = url.split('/')[2];
    
    try {
      const response = await fetch(`${CONFIG.BASE_URL}/detail/${id}`);
      const responseJson = await response.json();
      const { restaurant } = responseJson;
      const jumbotron = document.querySelector('.hero')
      jumbotron.style.display = 'none';

      this._populateRestaurantDetail(restaurant);
      
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
        },
      });

      this._hideLoading();
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
      this._showErrorMessage();
    }
  },

  _populateRestaurantDetail(restaurant) {
    const detailContainer = document.querySelector('#restaurant-detail');
    detailContainer.innerHTML = `
      <h2 class="restaurant-name">${restaurant.name}</h2>
      <img class="restaurant-image" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}">
      <div class="restaurant-info">
        <p class="restaurant-city">🏙️ ${restaurant.city}</p>
        <p class="restaurant-address">🏠 ${restaurant.address}</p>
        <p class="restaurant-rating">⭐ ${restaurant.rating}</p>
      </div>
      <div class="restaurant-description">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
      </div>
      <div class="restaurant-menus">
        <h3>Menus</h3>
        <div class="menu-list">
          <div class="foods">
            <h4>Foods</h4>
            <ul>
              ${restaurant.menus.foods.map(food => `<li>${food.name}</li>`).join('')}
            </ul>
          </div>
          <div class="drinks">
            <h4>Drinks</h4>
            <ul>
              ${restaurant.menus.drinks.map(drink => `<li>${drink.name}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      <div class="restaurant-reviews">
        <h3>Customer Reviews</h3>
        <ul>
          ${restaurant.customerReviews.map(review => `
            <li>
              <p class="review-name">${review.name}</p>
              <p class="review-date">${review.date}</p>
              <p class="review-text">${review.review}</p>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  },

  _initReviewForm(restaurantId) {
    const reviewForm = document.getElementById('reviewForm');
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('reviewName').value;
      const review = document.getElementById('reviewText').value;

      try {
        const response = await this._postReview(restaurantId, name, review);
        if (response.error === false) {
          // Review posted successfully
          this._addNewReviewToDOM(response.customerReviews);
          reviewForm.reset(); // Clear the form
        } else {
          console.error('Error posting review:', response.message);
        }
      } catch (error) {
        console.error('Error posting review:', error);
      }
    });
  },

  async _postReview(id, name, review) {
    const url = `${CONFIG.BASE_URL}/review`;
    const data = {
      id,
      name,
      review,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error posting review:', error);
      throw error;
    }
  },

  _addNewReviewToDOM(customerReviews) {
    const reviewsContainer = document.querySelector('.restaurant-reviews ul');
    reviewsContainer.innerHTML = '';
    customerReviews.forEach((review) => {
      reviewsContainer.innerHTML += `
        <li>
          <p class="review-name">${review.name}</p>
          <p class="review-date">${review.date}</p>
          <p class="review-content">${review.content}</p>
        </li>
        `;
    });
  },

  _hideLoading() {
    const loadingElement = document.querySelector('#loading');
    loadingElement.style.display = 'none';
  },

  _showErrorMessage() {
    const detailContainer = document.querySelector('#restaurant-detail');
    detailContainer.innerHTML = '<p class="error-message">Failed to load restaurant details. Please try again later.</p>';
    this._hideLoading();
  },
};

export default Detail;