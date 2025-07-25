export function Header({cart, total, add, remove, removeOne, deleteAll}){
    
    const SITE_ID = 'e3e9d980-a545-47a5-a1df-dc843bade4bb'; 

    const trackCartEvent = (eventName, guitar, extra = {}) => {
        if (window.PixelFactoryAnalytics) {
            window.PixelFactoryAnalytics.trackCustomEvent(SITE_ID, eventName, {
                product_id: guitar.id,
                product_name: guitar.name,
                price: guitar.price,
                quantity: guitar.quantity,
                image: guitar.image,
                timestamp: new Date().toISOString(),
                ...extra
            });
        }
    };

    const handleAdd = (guitar) => {
        add(guitar);
        trackCartEvent('cart_item_added', guitar);
    };

    const handleRemove = (guitar) => {
        remove(guitar);
        trackCartEvent('cart_item_decreased', guitar);
    };

    const handleRemoveOne = (guitar) => {
        removeOne(guitar);
        trackCartEvent('cart_item_removed', guitar);
    };

    const handleDeleteAll = () => {
        cart.forEach(guitar => {
        trackCartEvent('cart_item_removed', guitar, { removed_by: 'empty_cart' });
        });
        deleteAll();
        if (window.PixelFactoryAnalytics) {
        window.PixelFactoryAnalytics.trackCustomEvent(SITE_ID, 'cart_emptied', {
            total_items: cart.length,
            total_price: total,
            timestamp: new Date().toISOString()
        });
        }
    }


    return(
        <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {cart.length === 0? (<p className="text-center">El carrito esta vacio</p>):(
                            
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(guitar => (

                                    
                                    <tr key={guitar.id}>
                                        <td>
                                            <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                        </td>
                                        <td>{guitar.name}</td>
                                        <td className="fw-bold">
                                                ${guitar.price}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={()=>handleRemove(guitar)}
                                            >
                                                -
                                            </button>
                                                {guitar.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={()=>handleAdd(guitar)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={()=>handleRemoveOne(guitar)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>)
                            }
                            <p className="text-end">Total pagar: <span className="fw-bold">${total}</span></p>
                            <button className="btn btn-dark w-100 mt-3 p-2" onClick={handleDeleteAll}>Vaciar Carrito</button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}