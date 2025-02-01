import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { db } from './data/db'
import { Guitar } from './components/Guitar'

function App() {

  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(guitar){
    const itemIndex = cart.findIndex((item) => guitar.id === item.id)
    console.log(itemIndex)
    if(itemIndex === -1){ //el articulo aun no existe en el carrito
      guitar.quantity = 1;
      setCart([...cart, guitar]) 
    } else { //si la guitarra ya esta añadido al carrito
      const updatedCart = [...cart] //copia de la variable de estado
      updatedCar[itemIndex].quantity++;
      setCart(updatedCart);
    }
  }

  function calculateTotal(){
    let total = 0;
    for (const guitar of cart) {
      total += guitar.price * guitar.quantity;
    }
    return total;
  }

  return (
    <>
      <Header cart={cart} total = {calculateTotal()}/>
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

export default;