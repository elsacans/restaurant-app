import RestoDbSource from "../../data/resto-idb";
import { createRestoItemTemplate } from "../templates/templates-creator";

const Home = {
    async render() {
        return `
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
        const resto = await RestoDbSource.homeResto();
        const restoContainer = document.querySelector('#restaurant-list');
        resto.forEach ((resto) => {
            restoContainer.innerHTML += createRestoItemTemplate(resto);
        });
    },
};

export default Home;