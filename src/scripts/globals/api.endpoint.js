import CONFIG from "./config";

const API_ENDPOINT = {
    HOME : `${CONFIG.BASE_URL}resto/home?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
    FAVORITE : `${CONFIG.BASE_URL}resto/favorite?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page1`,
    DETAIL : (id) => `${CONFIG.BASE_URL}resto/${id}?api_key=${CONFIG.KEY}`,
};

export default API_ENDPOINT;