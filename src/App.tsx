import '@/App.css'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import { useState,useEffect } from 'react'

function App() {
  const fillDice = () => {
    return Array(10).fill(0).map(() => ({id:nanoid(),isHeld:false}))
  }
  const [dice,setDice] = useState<{id:string,isHeld:boolean}[]>(() => fillDice())
  const [rolling,setRolling] = useState(false)
  const rollDice = () => {
    setDice(prevDice => prevDice.map(die => die.isHeld ? die : {...die,value:Math.ceil(Math.random() * 6)}))
    setRolling(!rolling)
  }
  const holdDie = (id:string) => {
    setDice(prevDice => prevDice.map(die => die.id === id? {...die,isHeld:!die.isHeld}:die))
  }
  useEffect(() => {
    document.querySelectorAll('.die-3d-obj')?.forEach(die => {
      die.classList.add('die-3d-obj-rolling')
    })
    setTimeout(() => {
      document.querySelectorAll('.die-3d-obj')?.forEach(die => {
        die.classList.remove('die-3d-obj-rolling')
      })
    }, 8000)
  },[rolling])
 
  return (
      <>
        <section className='game-container'>
          <h1>Tenzies</h1>
          <p className='game-description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </section>
        <section className='container'>
          <div className='dice-container'>
            {dice.map((eachDie,index) => (
              <Die key={eachDie.id} isHeld={eachDie.isHeld} onClick={() => holdDie(eachDie.id)}/>
            ))}
          </div>
        </section>
        <button className='roll-dice' onClick={rollDice}>Roll</button>
      </>
    )
}

export default App
