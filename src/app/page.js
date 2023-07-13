
import './page.module.css'
import Main from './main.jpg'
import Image from 'next/image'
import mainStyles from './main.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <div className={mainStyles.container}>
      <Image src={Main} alt="" className={mainStyles.main}/>
      <div className={mainStyles.textContainer}>
        <div className={mainStyles.mainText}>
          <div className={mainStyles.the1}>THE</div>
          <div className={mainStyles.l}>L</div>
          <div className={mainStyles.o}>O</div> 
          <div className={mainStyles.ord}>RD</div> 
          <div className={mainStyles.ofthe}>OF THE</div> 
          <div className={mainStyles.r}>R</div> 
          <div className={mainStyles.ing}>ing</div> 
          <div className={mainStyles.s}>S</div> 
        </div>
        <div className={mainStyles.subMainText}>
          <h2>memory card game</h2>
        </div>
      </div>
      <Link href="/game">
        <button className={mainStyles.startButton}>
          Start Your Journey
        </button>
      </Link>
    </div>
  )
}
