/* eslint-disable no-undef */
import API_ENDPOINT from "../globals/api.endpoint";

class RestoDbSource {
    static async homeRestos() {
        const response = await fetch(API_ENDPOINT.HOME);
        const responseJson = await response.json();
        return responseJson.results;
    }

    static async favoriteRestos() {
        const response = await fetch(API_ENDPOINT.FAVORITE);
        const responseJson = await response.json();
        return responseJson.results;
    }

    static async detailResto() {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }
}

export default RestoDbSource;