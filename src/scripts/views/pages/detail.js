import RestoDbSource from "../../data/resto-idb";
import CONFIG from "../../globals/config";

const Detail = {
    async render() {
      const url = window.location.hash;
      const id = url.split('/')[2];
      const restaurantDetail = await this.getRestaurantDetail(id);
      return restaurantDetail.detailHtml;
    },
  
    async afterRender() {
      const url = window.location.hash;
      const id = url.split('/')[2];
  
      const likeButton = document.getElementById('likeButton');
      const heartIcon = likeButton.querySelector('.heart-icon');
  
      const restaurant = await RestoDbSource.detailResto(id);
      if (restaurant) {
        heartIcon.classList.remove('ri-heart-line');
        heartIcon.classList.add('ri-heart-fill');
      }
  
      likeButton.addEventListener('click', async () => {
        const restaurant = await RestoDbSource.detailResto(id);
        if (!restaurant) {
          const restaurantDetail = await this.getRestaurantDetail(id);
          await RestoDbSource.putResto(restaurantDetail);
          heartIcon.classList.remove('ri-heart-line');
          heartIcon.classList.add('ri-heart-fill');
        } else {
          await RestoDbSource.deleteResto(id);
          heartIcon.classList.remove('ri-heart-fill');
          heartIcon.classList.add('ri-heart-line');
        }
      });
  
      this.initReviewForm(id);
    },
  
    initReviewForm(id) {
      const form = document.getElementById('addReviewForm');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('reviewerName').value;
        const review = document.getElementById('reviewContent').value;
  
        if (name && review) {
          try {
            const response = await fetch('https://restaurant-api.dicoding.dev/review', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id,
                name,
                review,
              }),
            });
  
            if (response.ok) {
              form.reset();
              this.updateReviews(id);
            } else {
              console.error('Failed to submit review:', response.statusText);
            }
          } catch (error) {
            console.error('Failed to submit review:', error);
          }
        }
      });
    },
  
    async updateReviews(id) {
      try {
        const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${id}`);
        const data = await response.json();
        const { customerReviews } = data.resto;
        const reviewList = document.querySelector('.review-list');
        reviewList.innerHTML = customerReviews.map((review) => `<li class="review-item"><strong>${review.name}</strong>: ${review.review}</li>`).join('');
      } catch (error) {
        console.error('Failed to update reviews:', error);
      }
    },
  
    async getRestaurantDetail(restaurantId) {
      const loadingElement = document.getElementById('loading');
      loadingElement.style.display = 'block';
  
      try {
        const response = await fetch(`https://restaurant-api.dicoding.dev/detail/${restaurantId}`);
        const data = await response.json();
        const { restaurant } = data;
  
        return {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          city: restaurant.city,
          address: restaurant.address,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          categories: restaurant.categories,
          menus: restaurant.menus,
          customerReviews: restaurant.customerReviews,
          detailHtml: `
          <div class="restaurant-detail">
            <div class="detail-box">
              <div class="restaurant-header">
                <h2>${restaurant.name}</h2>
              <div class="rating">
                <p>⭐️<span class = "restaurant_rating">${restaurant.rating}</span></p>
              </div>
            </div>
            <img class="restaurant-image" alt = "${restaurant.name}"
              src=""${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://restaurant-api.dicoding.dev/images/small/${restaurant.pictureId}'}">
            <div class="detail-info">
              <p class="description">${restaurant.description}</p>
              <p class="city">City: ${restaurant.city}</p>
              <p class="address">Address: ${restaurant.address}</p>
              ${restaurant.categories ? `<div class="categories">Categories: ${restaurant.categories.map((category) => `<span>${category.name}</span>`).join(' ')}</div>` : ''}
              <button id="likeButton" class="like-button" tabindex="0" aria-label="Like this restaurant">
                <i class="ri-heart-line heart-icon"></i>
              </button>
            </div>
          </div>
            <div class="menu-box">
              <div class="makanan">
                <h3>Menu Makanan:</h3>
                <ul class="menu-list">
                  ${restaurant.menus.foods.map((food) => `<li class="menu-item">${food.name}</li>`).join('')}
                </ul>
              </div>
                <div class="minuman">
                  <h3>Menu Minuman:</h3>
                  <ul class="menu-list">
                    ${restaurant.menus.drinks.map((drink) => `<li class="menu-item">${drink.name}</li>`).join('')}
                  </ul>
                </div>
              </div>
                <div class="review-box">
                  <h3>Customer Reviews:</h3>
                  <ul class="review-list">
                    ${restaurant.customerReviews.map((review) => `<li class="review-item"><strong>${review.name}</strong>: ${review.review}</li>`).join('')}
                  </ul>
                </div>
            <div class="add-review-box">
              <h3>Add a Review:</h3>
              <form id="addReviewForm">
                <input type="text" id="reviewerName" tabindex="0" placeholder="Your Name" required>
                <textarea id="reviewContent" tabindex="0" placeholder="Your Review" required></textarea>
                <button type="submit" tabindex="0">Submit Review</button>
              </form>
            </div>
        </div>
      `,
        };
      } catch (error) {
        console.error('Failed to fetch restaurant details:', error);
        return {
          detailHtml: '<p class="error-message">Failed to load restaurant details. Please try again later.</p>',
        };
      } finally {
        loadingElement.style.display = 'none';
      }
    },
  };
  
  export default Detail;