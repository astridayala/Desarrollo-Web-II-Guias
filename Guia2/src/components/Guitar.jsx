export function Guitar({guitar, addToCart}){

    const {id, name, image, description, price} = guitar;

    const handleClick = () => {
        addToCart(guitar);

        if (window.PixelFactoryAnalytics) {
            window.PixelFactoryAnalytics.trackCustomEvent('e3e9d980-a545-47a5-a1df-dc843bade4bb', 'add_to_cart', {
                product_id: id,
                product_name: name,
                price: price,
                image: image,
                timestamp: new Date().toISOString()
            });
        } else {
            console.warn('PixelFactoryAnalytics no está disponible');
        }
    };

    return(
        <div className="col-md-6 col-lg-4 my-4 row align-items-center">
            <div className="col-4">
                <img className="img-fluid" src={`/img/${image}.jpg`} alt="imagen guitarra" />
            </div>
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <p className="fw-black text-primary fs-3">${price}</p>
                <button 
                    type="button" 
                    onClick={handleClick}
                    className="btn btn-dark w-100"
                >Agregar al Carrito</button>
            </div>
        </div>
    )
}