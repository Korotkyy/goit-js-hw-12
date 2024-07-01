import getImages from './js/pixabay-api.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";




let currentPage = 1;
let userInput = '';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button[type=submit]');
const loadMoreBtn = document.querySelector('button[type=button]');


const style = document.createElement('style');
style.innerHTML = `
.hidden {
    display: none;
}
`;
document.head.appendChild(style);

function showLoadMore() {
    loadMoreBtn.classList.remove('hidden');
}

function hideLoadMore() {
    loadMoreBtn.classList.add('hidden');
    console.log('Кнопка схована:', loadMoreBtn.classList.contains('hidden'));
}

function showEndMessage() {
    iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
    });
}

function scrollToNewImages() {
    const imgElement = document.querySelector('.image-card');
    if (imgElement) {
        const cardHeight = imgElement.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
    }
}


    hideLoadMore();

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        userInput = searchInput.value.trim();
        if (userInput === '') {
            hideLoadMore();
            iziToast.error({
                title: 'Error',
                message: 'Поле пошуку не може бути порожнім',
            });
        
        } else {
            currentPage = 1;
            hideLoadMore();
            try {
                await getImages(userInput, currentPage, showLoadMore, hideLoadMore, showEndMessage);
                searchInput.value = '';
            } catch (error) {
                    iziToast.error({
                        title: 'Error',
                        message: 'An error occurred while fetching images. Please try again!',
                    });
                    console.error('Error fetching images:', error);
            }
        }
    });
    
     loadMoreBtn.addEventListener('click', async () => {
        currentPage++;
        try {
            await getImages(userInput, currentPage, showLoadMore, hideLoadMore, showEndMessage);
            scrollToNewImages();
        } catch (error) {
            iziToast.error({
                title: 'Error',
                message: 'An error occurred while fetching more images. Please try again!',
            });
            console.error('Error fetching more images:', error);
           
        }
    });