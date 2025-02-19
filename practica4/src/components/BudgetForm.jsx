import React, { useState } from 'react'

export const BudgetForm = () => {

    const [budget, setBudget] = useState(0)
    const isInvalid = isNaN(budget) || budget <= 0 //si no es un numero >0 es invalido

    const handleChange = (e) => {
        setBudget(e.target.valueAsNumber)
    }

  return (
    <form className='space-y-5'>
        <div className='flex flex-col space-y-5'>
            <label 
                htmlFor="">

            </label>
        </div>

    </form>
  )
}
