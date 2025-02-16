import { useState, useRef, useEffect } from "react";
import './App.css'
import sigmaOne from './assets/sigmaOne-removebg-preview.png'
import obeseOne from './assets/fatOne-removebg-preview.png'
import averageOne from './assets/averageOne-removebg-preview.png'
import skinnyOne from './assets/skinnyOne-removebg-preview.png'

// import songs manually
import song1 from "./assets/music/song-1.mp3";
import song2 from "./assets/music/song-2.mp3";

const songs = [
  {
    name: 'song-1',
    displayName: '',
    artist: '',
    src: song1,
  },

  {
    name: 'song-2',
    displayName: '',
    artist: '',
    src: song2,
  },
]

function App() {

  // handling Music Player

  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  let [weight, setWeight] = useState('');
  let [height, setHeight] = useState('');

  let [bmi, setBMI] = useState('');
  let [ctg, setCtg] = useState('');

  const playSong = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const togglePlayPause = () => {
    isPlaying ? pauseSong() : playSong();
  };

  const loadSong = (index) => {
    setSongIndex(index);
    setIsPlaying(false);
    audioRef.current.src = songs[index].src;
    // audioRef.current.src = `/assets/music/${songs[index].name}.mp3`;
    if (audioRef.current) {
      let songSrc;
      if (ctg === "normalweight") songSrc = song1;
      else if (ctg === "underweight") songSrc = song2;
      else if (ctg === "overweight") songSrc = song1;
      else if (ctg === "obese") songSrc = song2;
      
      if (songSrc) {
        audioRef.current.src = songSrc;
        audioRef.current.play();
      }
    }
  };

  const prevSong = () => {
    const newIndex = songIndex === 0 ? songs.length - 1 : songIndex - 1;
    loadSong(newIndex);
    playSong();
  };

  const nextSong = () => {
    const newIndex = (songIndex + 1) % songs.length;
    loadSong(newIndex);
    playSong();
  };

  const updateProgressBar = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const setProgress = (e) => {
    const width = progressRef.current.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    loadSong(songIndex);
  }, [ctg]);


  // handling BMI Calculations

  let calcBMI = () => {
    if (!weight || !height) {
      alert('please enter both height and weight');
    } else if (isNaN(weight) || isNaN(height)) {
      alert('please enter number values');
    } else {
      let bmiValue = parseFloat(weight) / Math.pow((parseFloat(height) / 100), 2);
      setBMI(bmiValue.toFixed(2));
      calCategory(bmiValue);

      setHeight('');
      setWeight('');
    }
  }

  let calCategory = (bmiValue) => {
    // console.log(typeof(bmiValue));
    // console.log('function working', bmiValue);

    if (bmiValue < 18.5) {
      setCtg('underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setCtg('normalweight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setCtg('overweight');
    } else {
      // console.log('obese', bmiValue);
      setCtg('obese');
    }

  }

  // console.log(bmi);

  return (
    <>
      <div className="App p-5 d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', width: '100%', background: '#28282B', color: 'white' }}>
        <div className="row container">
          <div className="col-md-6 col-12 d-flex flex-column align-items-between justify-content-center">
            {/* <h2 className='text-center'>BMI</h2> */}
            <div className="bmi-form d-flex flex-column align-items-center" style={{ marginTop: '0px' }}>
              <input type="text" placeholder='enter weight in kg' className='w-50 rounded-4 mt-2 px-2 py-1' value={weight} onChange={(e) => setWeight(e.target.value)} />
              <input type="text" placeholder='enter height in cm' className='w-50 rounded-4 mt-2 px-2 py-1' value={height} onChange={(e) => setHeight(e.target.value)} />

              <button onClick={calcBMI} className='btn w-50 rounded-4 mt-2' style={{ background: 'red', color: 'white' }}>Submit</button>
            </div>
            <div className='d-flex align-items-center flex-column mt-5'>
              <h2>{bmi}</h2>
              {
                ctg && (<h1>Congrats you are {ctg}</h1>)
              }
            </div>

          </div>

          <div className="col-md-6 col-12 d-flex flex-column justify-content-center align-items-center">

            {/* music player */}
            <div className='player-container'>

              <div className="img-container">
                <img src="https://fiu-original.b-cdn.net/fontsinuse.com/use-images/51/51192/51192.jpeg?filename=C9H8-PWUIAAzbQ2-jpg-large-e.jpeg" alt="album art" />
              </div>

              {/* <h2 id='title'>Track Name 01</h2>
              <h3 id='artist'>Artist Name</h3> */}

              <h2>{songs[songIndex].displayName}</h2>
              <h3>{songs[songIndex].artist}</h3>

              {/* <audio src="./assets/music/Scared of the Dark.mp3"></audio> */}
              <audio
                ref={audioRef}
                onTimeUpdate={updateProgressBar}
                onEnded={nextSong}
              />

              {/* progress bar */}
              <div className="progress-container" id="progress-container" ref={progressRef} onClick={setProgress}>
                <div className="progress" id="progress" style={{ width: `${(currentTime / duration) * 100}%` }} ></div>
                <div className="duration-wrapper">
                  {/* <span id="current-time">0:00</span>
                  <span id="duration">3:43</span> */}
                  <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}</span>
                  <span>{Math.floor(duration / 60)}:{Math.floor(duration % 60)}</span>
                </div>
              </div>

              {/* controls */}
              <div className="player-controls">
                <i className="fas fa-backward" id="prev" title='Previous' onClick={prevSong}></i>
                <i
                  className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}
                  onClick={togglePlayPause}
                ></i>
                <i className="fas fa-forward" onClick={nextSong}></i>
              </div>

            </div>
            <div>

              {/* normal weight */}
              {ctg == 'normalweight' && (<img src={sigmaOne} alt="" style={{ height: '100%', width: '100%' }} /> )}

              {/* underweight */}
              {ctg == 'underweight' && (<img src={skinnyOne} alt="" style={{ height: '100%', width: '100%' }} />)}

              {/* overweight */}
              {ctg == 'overweight' && (<img src={averageOne} alt="" style={{ height: '100%', width: '100%' }} />)}

              {/* obese */}
              {ctg == 'obese' && (<img src={obeseOne} alt="" style={{ height: '100%', width: '100%' }} />)}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App