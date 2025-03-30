import '@/App.css'
import { nanoid } from 'nanoid'
import Die from './components/Die'
import { useState,useEffect,useRef } from 'react'
import Confetti from 'react-confetti'
import { Side,Die as DieType,NoIDSide } from '@/types/Dice'

function App() {
  const side_names:string[] = ["front","back","right","left","top","bottom" ]
  const colors:string[] = ["red","blue","green","brown","orange","purple"]
  const rollDiceButtonRef = useRef<HTMLButtonElement>(null)
  const prepareSide = (face:NoIDSide):Side => {
    return {id:nanoid(),side_name:face.side_name,color:face.color,value:face.value}
  }
  const randomDips = (() => {
    const newArray:number[] = []
      while(newArray.length < side_names.length){
          const randomNumber = Math.ceil(Math.random() * side_names.length)
          if(!newArray.includes(randomNumber)){
            newArray.push(randomNumber)
          }
        }
        return newArray;
      });
      const colorScheme = (() => {
        const newArray:string[] = []
        while(newArray.length < side_names.length){
          const randomNumber = Math.ceil(Math.random() * side_names.length)
          if(!newArray.includes(colors[randomNumber-1])){
            newArray.push(colors[randomNumber-1])
          }
        }
        return newArray;
      });
  const prepareDie = ():DieType => {
    const values = randomDips()
    const colors = colorScheme()
    const allSides:Side[] = side_names.map((side_name,index) => prepareSide({side_name,color:colors[index],value:values[index]}))
    return {id:nanoid(),sides:allSides,isHeld:false,colorScheme:colors,selectedValue:allSides.filter(side => side.side_name === "front")[0].value}
  }

  const [dice,setDice] = useState<DieType[]>(() => Array(10).fill(0).map(() => prepareDie()))
  const [rolling,setRolling] = useState(false)

  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.selectedValue === dice[0].selectedValue)
  const gameOver = dice.every(die => die.isHeld)

  const rollDice = () => {

    setDice(prevDice => 
        prevDice.map(die => { 
          if(die.isHeld){
          return die
        }else{
          const values = randomDips()
          const colors = colorScheme()
          const newDie = {...die,sides:side_names.map((side_name,index) => prepareSide({side_name,color:colors[index],value:values[index]}))}
          return newDie
        }
      })
    )
    setRolling(!rolling)
  }
  const resetGame = () => {
    setDice(Array(10).fill(0).map(() => prepareDie()))
  }
  const holdDie = (id:string) => {

    setDice(prevDice => prevDice.map(die => die.id === id? {...die,isHeld:!die.isHeld,selectedValue:die.sides.filter(side => side.side_name === "front")[0].value}:die))

  }
  useEffect(() => {
    document.querySelectorAll('.die-3d-obj')?.forEach(die => {
      !die.classList.contains('die-3d-obj-held') && die.classList.add('die-3d-obj-rolling')
    })

    setTimeout(() => {
      document.querySelectorAll('.die-3d-obj')?.forEach(die => {
        die.classList.remove('die-3d-obj-rolling')
      })
    }, 8000)
  },[rolling])
  
  useEffect(() => {
    if(rollDiceButtonRef.current){
      rollDiceButtonRef.current.focus()
    } 
  },[gameOver])

  return (
      <>
        {gameWon && <Confetti />}
        <section className='game-container'>
          <h1>Tenzies</h1>
          <p className='game-description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </section>
        <section className='container'>
          <div className='dice-container'>
            {dice.map((eachDie) => (
              <Die key={eachDie.id} die={eachDie} onClick={() => holdDie(eachDie.id)}/>
            ))}
          </div>
        </section>
       {!gameOver ? 
       <button className='roll-dice' onClick={rollDice} ref={rollDiceButtonRef}>Roll</button> : 
       <button className='roll-dice' onClick={resetGame} ref={rollDiceButtonRef}>New Game</button>}
      </>
    )
}

export default App
