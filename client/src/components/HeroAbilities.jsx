import '../App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";
import Tooltip from '../Tooltip';

const HeroAbilities = (props) => {
    const [abilities, setAbilities] = useState(null);
    const [heroFullAbilities, setHeroFullAbilities] = useState(null);

    useEffect(() =>{

        axios.get('https://api.opendota.com/api/constants/hero_abilities')
            .then(res => {
                setAbilities(res.data)
            })
            .catch(err => console.log("error"))

        axios.get('https://api.opendota.com/api/constants/abilities')
            .then(res => {
                setHeroFullAbilities(res.data)
            })
            .catch(err => console.log("error"))

    },[])

    return(
        <div>
            {
            (abilities && heroFullAbilities)&&
                <div>
                {
                abilities[props.name]['abilities'].map((ability, o) => (
                    (ability !== 'generic_hidden')&&
                        <Tooltip
                            key={o} 
                            content={
                                <div>
                                    <div className='d-flex align-content-center justify-content-evenly'>
                                        <img style={{height:'50px', paddingRight:'10px'}} src={`https://api.opendota.com${heroFullAbilities[ability].img}`} alt=''/>
                                        <div>
                                            <h6>{heroFullAbilities[ability].dname}</h6>
                                            <p>{props.sn}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                (heroFullAbilities[ability]['behavior'])&&
                                                    <div> 
                                                        {
                                                            Array.isArray(heroFullAbilities[ability]['behavior'])?
                                                                <div className='d-flex'>
                                                                    ABILITY TYPE: 
                                                                    {heroFullAbilities[ability]['behavior'].map(function(val,index){
                                                                        return (
                                                                            <div key={index}>
                                                                                {
                                                                                    (heroFullAbilities[ability]['behavior'].length-1 === index)?
                                                                                    <span>&nbsp;{val}</span>
                                                                                    :<span>&nbsp;{val}&nbsp;</span>
                                                                                }
                                                                                
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            :<p> {`ABILITY TYPE: ${heroFullAbilities[ability]['behavior']}`}</p>  
                                                        }
                                                    </div>
                                                                    
                                            }        
                                            </div>
                                            {
                                            heroFullAbilities[ability].dmg_type&&
                                            <p>DAMAGE TYPE: {heroFullAbilities[ability].dmg_type}</p>
                                            }
                                            {
                                            heroFullAbilities[ability].bkbpierce&&
                                            <p>PIERCES SPELL IMMUNITY : {heroFullAbilities[ability].bkbpierce}</p> 
                                            }   
                                            <p>_________________________________________________</p>     
                                            <p>{heroFullAbilities[ability].desc}</p>
                                            <p>_________________________________________________</p>
                                            <div>
                                            {
                                            heroFullAbilities[ability]['attrib'].map((att, k) =>(
                                                !att.generated&&
                                                <div className='d-flex' key={k}>                                   
                                                    {
                                                    (!Array.isArray(att['value']) && att['value'] !== '0')&&
                                                        <div>
                                                            <p>{`${att['header']} ${att['value']}`}</p>
                                                        </div>
                                                    }
                                                    {
                                                    (Array.isArray(att['value'])) &&
                                                        <div className='d-flex'>
                                                            <p>{`${att['header']}`}&nbsp;</p>
                                                            {
                                                                att['value'].map(function(val, index) {
                                                                    return(
                                                                        (att['value'].length-1 === index)?
                                                                        <p key={index}>{val}</p>
                                                                        :<p key={index}>{val}&nbsp;/&nbsp;</p>
                                                                    )})
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            ))
                                            }
                                            </div>
                                            <div>
                                            {
                                                (heroFullAbilities[ability]['cd'])&&
                                                    <div> 
                                                        {
                                                            Array.isArray(heroFullAbilities[ability]['cd'])?
                                                                <p className='d-flex'>
                                                                    COOL DOWN: 
                                                                    {heroFullAbilities[ability]['cd'].map(function(val,index){
                                                                        return (
                                                                            <div key={index}>
                                                                                {
                                                                                    (heroFullAbilities[ability]['cd'].length-1 === index)?
                                                                                    <span>&nbsp;{val}</span>
                                                                                    :<span>&nbsp;{val}&nbsp;/</span>
                                                                                }
                                                                                
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </p>
                                                            :<p> {`COOL DOWN: ${heroFullAbilities[ability]['cd']}`}</p>  
                                                        }
                                                    </div>
                                                                    
                                            }        
                                            </div>
                                            {
                                                (heroFullAbilities[ability]['mc'])&&
                                                    <div> 
                                                        {
                                                            Array.isArray(heroFullAbilities[ability]['mc'])?
                                                                <p className='d-flex'>
                                                                    MANA COST: 
                                                                    {heroFullAbilities[ability]['mc'].map(function(val,index){
                                                                        return (
                                                                            <div key={index}>
                                                                                {
                                                                                    (heroFullAbilities[ability]['mc'].length-1 === index)?
                                                                                    <span>&nbsp;{val}</span>
                                                                                    :<span>&nbsp;{val}&nbsp;/</span>
                                                                                }
                                                                                
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </p>
                                                            :<p> {`MANA COST: ${heroFullAbilities[ability]['mc']}`}</p>  
                                                        }
                                                    </div>
                                                                    
                                            }   
                                        </div>
                                </div>
                            }
                            direction="right">
                            <img style={{margin:'10px', height:"60px"}} src={`https://api.opendota.com${heroFullAbilities[ability].img}`} alt=''/>
                        </Tooltip>
                ))}
                </div>
            }
        </div>     
    )

}

export default HeroAbilities