import { useState } from 'react'
import './App.css'

function App() {

  let [weight, setWeight] = useState('');
  let [height, setHeight] = useState('');

  let [bmi, setBMI] = useState('') 

  let calcBMI = () => {
    let bmiValue = weight / Math.pow((height/100),2);
    setBMI(bmiValue);

    
  }

  console.log(bmi);
  
  return (
    <>
     <div className="App">
        <h2>check your BMI</h2>
        <div className="bmi-form">

          <input type="text" placeholder='enter weight in kg' onChange={(e) => setWeight(e.target.value) }/>

          <input type="text" placeholder='enter height in cm' onChange={(e) => setHeight(e.target.value) } />

          <button onClick={calcBMI}>Submit</button>

        </div>

        <h2>{bmi}</h2>
     </div>
    </>
  )
}

export default App
