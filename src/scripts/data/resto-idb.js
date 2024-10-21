/* eslint-disable no-undef */
import API_ENDPOINT from "../globals/api.endpoint";

class RestoDbSource {
    static async homeResto() {
        const response = await fetch(API_ENDPOINT.HOME);
        const responseJson = await response.json();
        return responseJson.restaurants;
        //console.log(responseJson);
    }

    static async favoriteResto() {
        const response = await fetch(API_ENDPOINT.FAVORITE);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async detailResto(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }
}

export default RestoDbSource;