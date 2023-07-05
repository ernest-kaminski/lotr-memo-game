'use client'

import Image from 'next/image'
import Ring from '../src/app/ring.jpg'
import styles from '../src/app/page.module.css'
import { useState, useEffect } from 'react'
import Data from './cardsData'

function Card(){
    const [numberOfFlippedCards, setNumberOfFlippedCards] = useState(0);
    useEffect(() => {
        console.log("number of flipped cards: " + numberOfFlippedCards)
    }, [numberOfFlippedCards])

    return(
        <body>
            {Data.map((card) => {


                const [isClicked, setClicked] = useState(false);
                function incrementNumberOfFlippedCards(){
                    setNumberOfFlippedCards((prevValue) => prevValue + 1)   
                }
                function decrementNumberOfFlippedCards(){
                    setNumberOfFlippedCards((prevValue) => prevValue - 1)   
                }
                const onClicked = () => {
                    if(numberOfFlippedCards <= 1 ){
                        isClicked ? decrementNumberOfFlippedCards() : incrementNumberOfFlippedCards()                              
                        setClicked((prevValue) => !prevValue)           
                    }else{
                        if(isClicked){
                            decrementNumberOfFlippedCards()
                            setClicked((prevValue) => !prevValue)   
                        } 
                    }
                }


                return(
                <div className={styles.card}>
                    <div className={ isClicked ? `${styles.cardinner}  ${styles.isflipped}` : styles.cardinner } onClick={onClicked}>
                        <div className={`${styles.cardface} ${styles.cardfacefront}`}>
                        <Image src={Ring} alt="" className={styles.ring}/>
                        <div className={styles.cardfacetext}>
                            <h2>Check Your Card</h2>
                        </div>
                        </div>
                        <div className={`${styles.cardface} ${styles.cardfaceback}`}>
                        <div className={styles.cardcontent}>
                            <div className={styles.cardheader}>
                            <Image src={card.image} alt="" className={styles.gandalf} />
                            <h2>{card.name}</h2>
                            </div>
                            <div className={styles.cardbody}>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>)
            })}
    </body>
    )
}

export default Card