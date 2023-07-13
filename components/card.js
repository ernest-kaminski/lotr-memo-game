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

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }


    useEffect(() => {
       let randomizedData = shuffle(Data)
          
        let randomizedDataAfterIndex = randomizedData.map((card, index) => {
            return {...card, id: index}
        })

        console.log(randomizedDataAfterIndex)

        setCardsData(randomizedDataAfterIndex)
    }, [])

    

    useEffect(() => {
        if(numberOfFlippedCards == 2){    
            setTimeout(() => {
                compareCards()
            }, 2000)       
        }
    }, [numberOfFlippedCards])

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
            //const newState = cardsData.filter(card => card.cardId != firstFlippedCardId)
            const newState = cardsData.map(card => {
                if((card.cardId == firstFlippedCardId && card.isFlipped) || (card.cardId == secondFlippedCardId && card.isFlipped) ){
                        return {...card, isVisible: false}
                }
                return card
            })
            setCardsData(newState)
        }
        setNumberOfFlippedCards(0);
    }

    const onClicked = (cardId, id) => {
        console.log(id)
        if(numberOfFlippedCards <= 1 && cardsData[id].isFlipped == false){
            const newState = cardsData.map(card => {
                if(card.cardId == cardId && card.id == id && !card.isFlipped){
                        return {...card, isFlipped: true}
                }
                return card
            })

            if(numberOfFlippedCards == 0){
                setFirstFlippedCardId(cardId)
            }else if(numberOfFlippedCards == 1){
                setSecondFlippedCardId(cardId)
            }

            incrementNumberOfFlippedCards()
            setCardsData(newState)
        }
    }

    const cards = cardsData.map((card, index) => {
        card.id = index
        return(
        <div className={card.isVisible ? styles.card : styles.cardInvisible} key={card.id}>
            <div className={ card.isFlipped ? `${styles.cardinner}  ${styles.isflipped}` : styles.cardinner } onClick={() => onClicked(card.cardId, index)} id={index}>
                <div className={`${styles.cardface} ${styles.cardfacefront}`}>
                <Image src={Ring} alt="" className={styles.ring}/>
                {/* <div className={styles.cardfacetext}>
                    <h2>Check Your Card</h2>
                </div> */}
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
        <>
            {cards}
        </>
    )
}

export default Card