import React, {useState ,useEffect,useRef}from 'react'
import Weather from './Weather'
import background from './Images/background.jpg'
import sunny from './Images/Sunny.jpg'
import snow from './Images/Snow.jpg'


export default function App () {
  const [data,setData] = useState('') //for saving api data
  const [location, setLocation] = useState('') //for city name change
  const [err,setErr] = useState(null) //error catching and displaying
  const [bgd,setBgd] = useState(background) //dynamic background image
  const temperature = useRef(null)


  function handleChange (event) {
    //needs to update the location with every key
    setLocation(event.target.value)
  } 
  
  function handleSubmit(e){
     e.preventDefault(); //prevent refresh
     if(e.target.value !== ''){
     let url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=21800601b3b4f9c53ee3aaa8aaf4d509`
    fetch(url).then(res => {
      if(!res.ok) {
        throw Error("City name not valid. Try again!")
      } 
      return res.json()
    }).then((data) => {
      setData(data)
      console.log(data)
      temperature.current = data.main.temp
    }).catch((error) => {
      console.log(error)
      setErr(error.message)
    })}
      setLocation('')
      setErr('')
  }


useEffect(()=>{
    const thresholdTemp = 25; //27 Celsius (threshold)
    { data == '' ? setBgd(bgd) : data!= '' && temperature.current <= thresholdTemp ? setBgd(snow) : setBgd(sunny)}
  },[data])

  return(
    <div className='container' style={{backgroundImage : `url(${bgd})`}}>
      <div className='top-container'>
            <form onSubmit={handleSubmit} id="form-container">
             <input className='input-box' 
                 type = 'text'
                 id='city-name' 
                 placeholder='Enter City'
                 value = {location}
                 onChange={handleChange}></input>
            <button className='weather-bttn'>Check City Weather</button>
          </form>  
          {err && <div className='error-message'>{err}</div>}
      </div>
          { data && <Weather
           place={data.name}
           temperature ={data.main.temp}
           feels_like ={data.main.feels_like}
           humidity ={data.main.humidity}
           wind={data.wind.speed}
           /> }
      </div>
  )
}

 /* button inside a form has a default type "submit" which triggers 
            the onSubmit event handler
            */
// ERROR HANDLING ------
// we can use the normal error .catch( ) method ----> in case of network error 
// for input invalid error ------->
// we check the status of the response using '.ok'
// we throw an error message which is caught by .catch 
// we use the useState so that we can display it