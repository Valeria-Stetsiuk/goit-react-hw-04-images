import axios from "axios";

export const imageApi = async (query, page = 1) => {
const baseURL = "https://pixabay.com/api/";
    const API_KEY = "29870815-2b49dd40947a1693a1716dc8b";
    const searchList = '&per_page=12&image_type=photo&orintation=horizontal&safesearch=true';
    const response = await axios.get(`${baseURL}?key=${API_KEY}&q=${query}&page=${page}${searchList}`);
    return response.data.hits;
    
}
