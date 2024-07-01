const API_URL = 'https://pixabay.com/api/';
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

    const url = `${API_URL}?key=${API_KEY}`;
    const queryString = this.objectToQueryString(params);
    const data = await fetch(`${url}&${queryString}`);

    const dataFetch = await data.json();
    return dataFetch;
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

  objectToQueryString(obj) {
    return Object.keys(obj)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      )
      .join('&');
  }
}
