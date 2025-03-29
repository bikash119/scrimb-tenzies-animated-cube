import '@/App.css'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import { useState,useEffect } from 'react'

function App() {
  const [dice,setDice] = useState<{id:string,isHeld:boolean}[]>([])
  const [rolling,setRolling] = useState(false)
  const die = Array(10).fill(0).map((_,index) => ({id:nanoid(),isHeld:false}))
  const rollDice = () => {
    setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die,value:Math.ceil(Math.random() * 6)}))
    setRolling(!rolling)
  }
  useEffect(() => {
    document.querySelectorAll('.die-3d-obj')?.forEach(die => {
      die.classList.add('die-3d-obj-rolling')
    })
  },[rolling])
 
  return (
      <>
        <section className='game-container'>
          <h1>Tenzies</h1>
          <p className='game-description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </section>
        <section className='container'>
          <div className='dice-container'>
            {die.map((eachDie,index) => (
              <Die key={eachDie.id} isHeld={eachDie.isHeld}/>
            ))}
          </div>
        </section>
        <button className='roll-dice' onClick={rollDice}>Roll</button>
      </>
    )
}

export default App
