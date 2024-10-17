import RestoDbSource from "../../data/resto-idb";
import { createRestoItemTemplate } from "../templates/templates-creator";

const Home = {
    async render() {
        return `
            <div class="hero">
            <div class="hero_inner">
                <h1 class="hero_title">Delicious Food</h1>
                <p class="hero_tagline">
                Find your favourite restaurants here
                </p>
            </div>
            </div>

            <main id="main-content">
            <div class="headline">
                <h1 class= "headline_title">Explore The Restaurant</h1>
            </div>
            <section id="restaurant-list" class="restaurant-list">
            </section>
            </main>
        `;
    },

    async afterRender() {
        const restos = await RestoDbSource.homeRestos();
        const restosContainer = document.querySelector('#restos');
        restos.forEach ((resto) => {
            restosContainer.innerHTML += createRestoItemTemplate(resto);
        });
    },
};

export default Home;