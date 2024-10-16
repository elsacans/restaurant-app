const Favorite = {
    async render() {
        return `
            <a href="#main-content" class="skip-link">Skip to Content</a>
            <div id="loading" class="loading" style="display: none;"> Loading</div>
            <div id="restaurant-favorite">
                <h1>Favorite</h1>
                <div class="restaurant-catalog" id= "restaurant-catalog" tabindex="-1"></div>
            </div>
        `;
    },

    async afterRender() {

    },
};

export default Favorite;