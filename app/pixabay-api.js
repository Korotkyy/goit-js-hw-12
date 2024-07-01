import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '40619454-a69b8dffcc7de025c5c5357dd';

export class PixabayAPI {
  #page = 1;
  #per_page = 40;
  #query = '';
  #totalPhotos = 0;

  async getPhotos() {
    const params = {
      q: this.#query,
      page: this.#page,
      per_page: this.#per_page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    };
    const urlAXIOS = `?key=${API_KEY}`;
    const { data } = await axios.get(urlAXIOS, { params });
    return data;
  }

  get query() {
    return this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  setTotal(total) {
    this.#totalPhotos = total;
  }

  hasMorePhotos() {
    return this.#page < Math.ceil(this.#totalPhotos / this.#per_page);
  }
}
