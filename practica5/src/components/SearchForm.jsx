import { useEffect, useState } from "react"
import { useAppStore } from "../store/useAppStore"
import { useNotificationStore } from "../store/notificationSlice"

export default function SearchForm() {
    const fetchCategories = useAppStore((state) => state.fetchCategories)
    const categories = useAppStore((state) => state.categories)
    const searchRecipes = useAppStore((state) => state.searchRecipes)
    const { notification, showNotification } = useNotificationStore()

    useEffect(() => {
        fetchCategories()
    },[])

    const [searchFilters, setSeachFilters] = useState({
        ingredient: '',
        category: ''
    })

    const handleChange = (e) => {
        setSeachFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //validar
        if(!searchFilters.ingredient || !searchFilters.category){
            showNotification('Todos los campos son obligatorios', 'error')
            return
        }

        //consultar las recetas
        searchRecipes(searchFilters)
    }

    return(
        <form className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-16 p-10 rounded-lg shadow space-y-6 ml-12" 
        onSubmit={handleSubmit}>
            <div className="space-y-4">
                <label 
                    htmlFor="ingredient"
                    className="block text-white uppercase font-extrabold text-lg"
                >Nombre o Ingredientes</label>
                <input 
                    value={searchFilters.ingredient}
                    onChange={handleChange}
                    id="ingredient"
                    type="text"
                    name="ingredient"
                    className="p-3 w-full rounded-lg focus:outline-none bg-white"
                    placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Cafe"
                />
            </div>
            <div className="space-y-4">
                <label 
                    htmlFor="category"
                    className="block text-white uppercase font-extrabold text-lg"
                >Categoria</label>
                <select 
                    name="category" 
                    id="category"
                    className="p-3 w-full rounded-lg focus:outline-none bg-white"
                    value={searchFilters.category}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option value={category.strCategory} key={category.strCategory}>
                            {category.strCategory}
                        </option>
                    ))}
                </select>
            </div>

            { notification && notification.type === "error" && (
                <div className="w-full top-16 transform -translate-x-1/2 ml-54 mt-5 px-6 py-3 mx-auto rounded-lg text-white font-bold shadow-lg justify-center text-center bg-gray-500">
                    {notification.message}
                </div>
            )}

            <input 
                type="submit"
                value="Buscar Recetas"
                className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase" 
            />
        </form>
    )
}