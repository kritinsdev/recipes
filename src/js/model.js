import { API_URL, API_KEY, POSTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        page:1,
        resultsPerPage: POSTS_PER_PAGE,
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        const { recipe } = data.data;

        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const loadSearchResults = async function(query) {
    try {   
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}&key=${API_KEY}`);

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }
        });
        
    } catch (error) {
        throw error;
    }
}

export const getSearchResultsPage = function(page = state.search.start) {
    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
}