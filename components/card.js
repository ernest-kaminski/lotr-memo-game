'use client'

import Image from 'next/image'
import Ring from '../src/app/ring.jpg'
import styles from '../src/app/page.module.css'
import { useState, useEffect } from 'react'
import Data from './cardsData'

function Card(){
    const [numberOfFlippedCards, setNumberOfFlippedCards] = useState(0);
    const [firstFlippedCardId, setFirstFlippedCardId] = useState(0);
    const [secondFlippedCardId, setSecondFlippedCardId] = useState(0);
    const [cardsData, setCardsData] = useState(Data)

    function incrementNumberOfFlippedCards(){
        setNumberOfFlippedCards((prevValue) => prevValue + 1)   
    }

    useEffect(() => {
        setCardsData(Data)
    }, [])

    useEffect(() => {
        if(numberOfFlippedCards == 2){    
            setTimeout(() => {
                compareCards()
            }, 2000)       
            setNumberOfFlippedCards(0);
        }
    }, [cardsData])

    const compareCards = () => {
        if(firstFlippedCardId !== secondFlippedCardId){
            const newState = cardsData.map(card => {
                if((card.cardId == firstFlippedCardId && card.isFlipped) || (card.cardId == secondFlippedCardId && card.isFlipped) ){
                        return {...card, isFlipped: false}
                }
                return card
            })
            setCardsData(newState)
        }else{
            const newState = cardsData.filter(card => card.cardId != firstFlippedCardId)
            setCardsData(newState)
        }

        setFirstFlippedCardId(0)
        setSecondFlippedCardId(0)
    }

    const onClicked = (cardId, id) => {
        const newState = cardsData.map(card => {
            if(card.cardId == cardId && card.id == id && !card.isFlipped){
                    return {...card, isFlipped: true}
            }
            return card
        })
        setCardsData(newState)

        if(numberOfFlippedCards <= 1 ){

            if(numberOfFlippedCards == 0){
                setFirstFlippedCardId(cardId)
            }else if(numberOfFlippedCards == 1){
                setSecondFlippedCardId(cardId)
            }
            incrementNumberOfFlippedCards()
        }
    }

    const cards = cardsData.map((card, index) => {
        return(
        <div className={styles.card} key={card.id}>
            <div className={ card.isFlipped ? `${styles.cardinner}  ${styles.isflipped}` : styles.cardinner } onClick={() => onClicked(card.cardId, card.id)} id={card.id}>
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
    })

    return(
        <body>
            {cards}
        </body>
    )
}

export default Card