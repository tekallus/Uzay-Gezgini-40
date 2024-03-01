import { useState,useEffect } from 'react'
import useSound from 'use-sound'
import PlayArea from './components/PlayArea'
import ScoreBoard from './components/ScoreBoard'
import './styles.css'

export default function App() {
  const STARTING_TIME = 60 // Başlangıç zamanı
  const STARTING_SCORE = 0 // Başlangıç skoru
  
 // State'lerin tanımlanması
 const [timerRunning, setTimerRunning] = useState(false) // Zamanlayıcının çalışıp çalışmadığını tutar
 const [timeLeft, setTimeLeft] = useState(STARTING_TIME) // Kaldığı süreyi tutar
 const [score, setScore] = useState(STARTING_SCORE) // Skoru tutar

 // Ses efektlerinin kullanılması
  const [playSong] = useSound('../audio/song.mp3')
  const [playClick] = useSound('../audio/click.mp3', { volume: 0.45 })

  /* Challenge 

       Uygulamanın temel oyun bileşenleri zaten yerinde, ancak başlat butonu ve zamanlayıcı tamamlanmamış durumda. Sizin göreviniz oyunu çalıştırmak için bunları ayarlamayı bitirmek

        1. Kullanıcı başlat butonuna tıkladığında. 
            - zamanlayıcı saniyeleri geri saymaya başlar.
            - başlat butonunun classList'inde "fade-in" class'ı "fade-out" ile değiştirilir.
            - başlat butonu devre dışı bırakılır. 
            - playSong() ve playClick() çağrılarak müzik ve tıklama sesi çalınır. 
        
        2. 0 saniyede zamanlayıcı durur ve başlat butonunun classList'inde "fade-out", "fade-in" ile değiştirilir. 
        
        3. Oyuncu daha sonra başlat butonuna tekrar tıklarsa, zamanlayıcı 60 saniyeye sıfırlanır ve skor 0'a sıfırlanır ve görev 1'de listelenen her şey tekrar gerçekleşir. 
        
        4. Bu görevleri yerine getirmek için *sadece* bu yorumların altına kod yazmanız gerekir; bunların üzerinde veya farklı bir dosyada herhangi bir şey değiştirmeniz veya eklemeniz gerekmez 
*/
// Zamanlayıcı işlevselliğini sağlayan useEffect
useEffect(() => {
  let interval = null
  // Zamanlayıcı çalışıyor ve zaman kaldıysa
  if (timerRunning && timeLeft > 0) {
    // Her saniyede timeLeft'i azaltan interval
    interval = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  } else if (!timerRunning || timeLeft === 0) {
    // Zamanlayıcı çalışmıyorsa veya zaman bittiğinde
    clearInterval(interval) // Interval'i temizle
    if (timeLeft === 0) {
      // Zaman bittiğinde
      setTimerRunning(false) // Zamanlayıcıyı durdur
      // Başlat butonunun görünümünü düzenle
      document.querySelector('.play-button').classList.replace('fade-out', 'fade-in')
    }
  }
  return () => clearInterval(interval) // Component güncellendiğinde interval'i temizle
}, [timerRunning, timeLeft])

// Başlat butonuna tıklama işlevselliği
const handleStartButtonClick = () => {
  setTimerRunning(true) // Zamanlayıcıyı başlat
  setTimeLeft(STARTING_TIME) // Zamanı başlangıç değerine ayarla
  setScore(STARTING_SCORE) // Skoru sıfırla
  // Başlat butonunun görünümünü değiştir
  document.querySelector('.play-button').classList.replace('fade-in', 'fade-out')
  document.querySelector('.play-button').disabled = true // Başlat butonunu devre dışı bırak
  playSong() // Oyun müziğini çal
  playClick() // Tıklama sesi çal
}

// Component'in render edilmesi
return (
  <div>
    {/* Skor tablosu bileşeni */}
    <ScoreBoard data={{ score, timeLeft }} />
    {/* Oyun alanı bileşeni */}
    <PlayArea playProps={{ timeLeft, timerRunning, setScore }} />
    {/* Başlat butonu */}
    <button className='play-button fade-in' onClick={handleStartButtonClick}>Başlat</button>
  </div>
)
}