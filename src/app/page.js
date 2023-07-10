
import './page.module.css'
import Main from './main.jpg'
import Image from 'next/image'
import mainStyles from './main.module.css'

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
          OF THE 
          R
          ING
          S
        </div>
        <div className={mainStyles.subMainText}>
          <h2>memory card game</h2>
        </div>
      </div>
      <button className={mainStyles.startButton}>
        Start Youy Journey
      </button>
    </div>
  )
}
