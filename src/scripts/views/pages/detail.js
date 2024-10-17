import RestoDbSource from "../../data/resto-idb";
import UrlParser from "../../routes/url-parser";
import { createRestoDetailTemplate } from "../templates/templates-creator";

const Detail = {
    async render() {
        const url = window.location.hash;
        const id = url.split('/')[2];
        const restaurantDetail = await this.getRestaurantDetail(id);
        return restaurantDetail.detailHtml;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const resto = await RestoDbSource.detailResto(url.id);
        const restoContainer = document.querySelector('#resto');
        restoContainer.innerHTML = createRestoDetailTemplate(resto);
    },
};

export default Detail;