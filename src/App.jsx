import { useState } from 'react'
import './App.css'

function App() {

  let [weight, setWeight] = useState('');
  let [height, setHeight] = useState('');

  let [bmi, setBMI] = useState('');
  let [ctg, setCtg] = useState('');

  let calcBMI = () => {
    if(!weight || !height) {
      alert('please enter both height and weight');
    } else if (isNaN(weight) || isNaN(height)) {
      alert('please enter number values');
    } else {
      let bmiValue = parseFloat(weight) / Math.pow((parseFloat(height)/100),2);
      setBMI(bmiValue.toFixed(2));
      calCategory(bmiValue);

      setHeight('');
      setWeight('');
    }
  }

  let calCategory = (bmiValue) => {
    // console.log(typeof(bmiValue));
    // console.log('function working', bmiValue);

    if(bmiValue < 18.5) {
      setCtg('underweight');
    } else if ( bmiValue >= 18.5 && bmiValue < 25) {
      setCtg('normalweight');
    } else if ( bmiValue >= 25 && bmiValue < 30 ) {
      setCtg('overweight');
    } else {
      // console.log('obese', bmiValue);
      setCtg('obese');
    }
    
  }

  console.log(bmi);
  
  return (
    <>
     <div className="App">
        <h2>check your BMI</h2>
        <div className="bmi-form">

          <input type="text" placeholder='enter weight in kg' value={weight} onChange={(e) => setWeight(e.target.value) }/>

          <input type="text" placeholder='enter height in cm' value={height} onChange={(e) => setHeight(e.target.value) } />

          <button onClick={calcBMI}>Submit</button>

        </div>

        <h2>{bmi}</h2>
        {
          ctg && <h1>Congrats you are {ctg}</h1>
        }  
     </div>
    </>
  )
}

export default App
