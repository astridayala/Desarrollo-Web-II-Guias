import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { db } from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  function inicialCart(){
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart):[]
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(inicialCart)
  useEffect(()=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  function addToCart(guitar){
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    console.log(itemIndex)

    if(itemIndex === -1){ //el articulo no existe en el carrito
      guitar.quantity = 1;
      setCart([...cart, guitar]) 
    } else { //si la guitarra ya esta añadido al carrito
      const updatedCart = [...cart] //copia de la variable de estado
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }

  function calculateTotal(){
    /*let total = 0;
    for (const guitar of cart) {
      total += guitar.price * guitar.quantity;
    }*/
    let total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    return total;
  }
  function addQuantityGuitar(guitar){
    setCart(cart.map(item => item.id === guitar.id?{
      ...item,quantity:item.quantity+1}:item
    ));
  };
  function removeQuantityGuitar(guitar){
    setCart(cart.map(item => item.id === guitar.id?{
      ...item,quantity:item.quantity-1}:item
    )
    .filter(item => item.quantity > 0)
   );
  }
  function removeGuitar(guitar){
    setCart(cart.filter(item => item.id !== guitar.id));
  }
  function deleteCart(){
    setCart([])
  }


  return (
    <>
      <Header cart={cart} total={calculateTotal()} add={addQuantityGuitar} remove={removeQuantityGuitar} 
      removeOne={removeGuitar} deleteAll={deleteCart}/>
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar guitar = {guitar} key={guitar.id} addToCart={addToCart}/>
          ))}

        </div>
      </main>
      <Footer/>
    </>
  )
}

export default App;