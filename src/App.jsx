import { useState } from 'react'
import './App.css'

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
      <div className="App p-5" style={{ height: '100vh', width: '100%', background: '#28282B', color: 'white'}}>
        <div className="row container">
          <div className="col-md-6">
            <h2 className='text-center'>your BMI</h2>
            <div className="bmi-form d-flex flex-column align-items-center">
              <input type="text" placeholder='enter weight in kg' className='w-25 rounded-4 mt-2' value={weight} onChange={(e) => setWeight(e.target.value)} />
              <input type="text" placeholder='enter height in cm' className='w-25 rounded-4 mt-2' value={height} onChange={(e) => setHeight(e.target.value)} />
              <button onClick={calcBMI} className='btn w-25 rounded-4 mt-2' style={{background: 'white', color: 'black'}}>Submit</button>
            </div>
            <div className='d-flex align-items-center flex-column'>
              <h2>{bmi}</h2>
              {
                ctg && <h1>Congrats you are {ctg}</h1>
              }
            </div>
            
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </>
  )
}

export default App
