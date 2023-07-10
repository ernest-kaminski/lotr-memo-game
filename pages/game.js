import Card from '../components/card'
import styles from '../src/app/page.module.css'
import '../src/app/globals.css'
import Main from '../images/main.jpg'
import Image from 'next/image'

export default function Home() {
  return (   
      <div className={styles.cardContainer}>
        <Image src={Main} alt="" className={styles.main}/>
        <Card/>
      </div>
  )
}