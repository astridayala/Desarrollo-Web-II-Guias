export const createFavoritesSlice = (set, get) => ({
    //lista vacia
    favorites: [],

    //verifica si una receta ya esta en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    //maneja el boton favorito (agrega o eliminar)
    handleClickFavorite: (recipe) => {
        if(get().favoriteExists(recipe.idDrink)){
            //si la receta esta en favoritos, la eliminamos
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink != recipe.idDrink)
            }));
        } else {
            //si no esta en favoritos, la agregamos
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));
        }
        //guarda la lista en el localStorage
        localStorage.setItem('favorites', JSON.stringify(get().favorites));
    },
    //carga la lista de favoritos desde el localStorage
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            });
        }
    }
});