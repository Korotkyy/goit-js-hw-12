import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '40619454-a69b8dffcc7de025c5c5357dd';

export class PixabayAPI {
  #page = 1;
  #perPage = 15; 
  #query = '';
  #totalPhotos = 0;

  async getPhotos() {
    try {
      const params = {
        key: API_KEY,
        q: this.#query,
        page: this.#page,
        per_page: this.#perPage,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      };

      const response = await axios.get(API_URL, { params });

      if (response.status !== 200) {
        throw new Error('Произошла ошибка при загрузке изображений.');
      }

      const { hits, totalHits } = response.data;
      this.#page++; 
      return { hits, totalHits };
    } catch (error) {
      throw new Error(`Ошибка загрузки данных: ${error.message}`);
    }
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  resetPage() {
    this.#page = 1;
  }

  setTotal(total) {
    this.#totalPhotos = total;
  }
}
