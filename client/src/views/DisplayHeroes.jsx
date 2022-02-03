import '../App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";


function DisplayHeroes() {

  const [heroes, setHeroes] = useState([])
  const history = useHistory();

  useEffect(() => {
    axios.get('https://api.opendota.com/api/heroStats')
      .then(res => {
        setHeroes(res.data)
      })
      .catch(err => console.log("error: ", err))
  },[])

  const heroHandler = (hero_id) => {
    history.push(`/hero/${hero_id}`)
  }

  return (
    <div className='container' style={{paddingBottom:"50px"}}>
        <div>
            <h2 style={{color:'white'}} className='card-title'>Heroes</h2>
            <h6 style={{color:'white'}}>All Heroes</h6>
        </div>
      {
        heroes&&
        heroes.map((hero, i) =>(
          <div key={i} className='d-inline-flex'>
              <div className='size-hero'> 
                <img style={{cursor:'pointer'}} onClick={() => heroHandler(hero.id)} className='d-inline-flex img-size' src={`https://api.opendota.com${hero.img}`} alt=''/>
                <p style={{opacity: 0.8}} className='bottom-left img-text-color'>{hero.localized_name}</p> 
              </div>
          </div>
        ))
      }
    </div>
  );
}

export default DisplayHeroes;