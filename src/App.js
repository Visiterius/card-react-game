import './App.css'
import {useState,useEffect} from "react";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";
import CardComponent from "./components/CardComponent";

const cardTiles = [...Array(15).keys()]

function App() {

    const [cards,setCards]=useState([])
    const [turns,setTurns]=useState(0)
    const [choiceOne,setChoiceOne]=useState(null)
    const [choiceTwo,setChoiceTwo]=useState(null)
    const [disabled,setDisabled]= useState(false)

    const shuffleCards = () => {
        const shuffledCards = [...cardTiles,...cardTiles]
            .sort(()=>Math.random()-0.5)
            .map((card)=>({num:card,id:Math.random(),matched:false}))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }

    const handleChoice = (el) => {
        console.log(el)
        choiceOne?setChoiceTwo(el):setChoiceOne(el)
    }

    useEffect(() => {
        if (choiceOne&&choiceTwo){
            setDisabled(true)
            if (choiceOne.num===choiceTwo.num){
                setCards(prevCards=>{
                    return prevCards.map(el=>{
                        if (el.num===choiceOne.num){
                            return {...el,matched:true}
                        }else {
                            return  el
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(()=>{
                    resetTurn()
                },1000)
            }
        }
    }, [choiceOne,choiceTwo]);

    useEffect(()=>{
        shuffleCards()
    },[])
    
    const resetTurn = () =>{
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns=>prevTurns+1)
        setDisabled(false)
    }

  return (
    <div className='App'>
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns:{turns}</p>
        <div className="card-grid">
            {cards.map(el=>(
                <CardComponent
                    key={el.id}
                    el={el}
                    handleChoice={handleChoice}
                    flipped={el===choiceOne||el===choiceTwo||el.matched}
                    disabled={disabled}
                />
            ))}
        </div>
    </div>
  )
}

export default App;
