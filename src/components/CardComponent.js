import React from 'react';
import './CardComponent.css'
const MyComponent = ({el,handleChoice,flipped,disabled}) => {

    const handleClick=()=>{
        if (!disabled){
            handleChoice(el)
        }
    }

    return (
        <div className='card'>
            <div className={flipped?'flipped':''}>
                <img className='front' alt='card front' src='/img/front.png'></img>
                <div className='front' id='text'>{el.num}</div>
                <img className='back'
                     src='/img/mahjong-tile-one-of-circles_1f019.png'
                     onClick={handleClick}
                     alt='card back'/>
            </div>
        </div>
    );
};

export default MyComponent;
