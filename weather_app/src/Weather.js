import React from "react";

export default function Weather(props) {
 
  return(
    <div>
       <div className='display-box'>
          <div className='city'>{props.place}</div>
        { props.temperature && <div className='temp'>{props.temperature}°C</div>  }        
        </div>
      <div className='bottom-container'>
        {props.feels_like && <div className='feels-like'>Feels Like: {props.feels_like}°C</div>}
        {props.humidity && <div className='humidity'>Humidity : {props.humidity} %</div>}
        {props.wind && props.wind !=0 ? <div className='wind'>Wind : {props.wind} m/s</div> : null}
      </div>
    </div>
  )
}