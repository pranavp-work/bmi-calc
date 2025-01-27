import { useState } from 'react'
import './App.css'
import sigmaOne from './assets/sigmaOne-removebg-preview.png'
import obeseOne from './assets/fatOne-removebg-preview.png'
import averageOne from './assets/averageOne-removebg-preview.png'
import skinnyOne from './assets/skinnyOne-removebg-preview.png'

function App() {

  let [weight, setWeight] = useState('');
  let [height, setHeight] = useState('');

  let [bmi, setBMI] = useState('');
  let [ctg, setCtg] = useState('');

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
      <div className="App p-5 d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%', background: '#28282B', color: 'white' }}>
        <div className="row container">
          <div className="col-md-6 col-12 d-flex flex-column align-items-between">
            {/* <h2 className='text-center'>BMI</h2> */}
            <div className="bmi-form d-flex flex-column align-items-center" style={{marginTop: '200px'}}>
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
            <div>Music</div>
            <div>

                {/* normal weight */}
                {ctg == 'normalweight' && (<img src={sigmaOne} alt="" style={{ height: '50%', width: '100%' }} />)}

                {/* underweight */}
                {ctg == 'underweight' && (<img src={skinnyOne} alt="" style={{ height: '50%', width: '100%' }} />)}

                {/* overweight */}
                {ctg == 'overweight' && (<img src={averageOne} alt="" style={{ height: '50%', width: '100%' }} />)}

                {/* obese */}
                {ctg == 'obese' && (<img src={obeseOne} alt="" style={{ height: '50%', width: '100%' }} />)}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
