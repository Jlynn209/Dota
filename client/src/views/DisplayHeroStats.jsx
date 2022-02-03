import '../App.css';
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import HeroAbilities from '../components/HeroAbilities';
import dota_agi from '../imgs/dota_agi.png'
import dota_str from '../imgs/dota_str.png'
import dota_int from '../imgs/dota_int.png'
import { Bar} from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DisplayHeroStats = () => {

    const {id} = useParams();
    const [heroes, setHero] = useState(null);
    const [data, setData] = useState(null);
    const [config, setConfig] = useState(null);

    useEffect(() => {
        axios.get('https://api.opendota.com/api/heroStats')
          .then(res => {
            setHero(res.data.filter(hero => hero.id === parseInt(id))[0])

            const hero = (res.data.filter(hero => hero.id ===parseInt(id))[0])
            const data = {
                labels: ['Crusader and lower (<2k MMR)', 'Archon (~2K-3K MMR)', 'Legend(~3K-4K MMR)', 'Ancient (~4K-5K MMR)', 'Divine and Immortal (>5K MMR)'],
                datasets: [
                  {
                    label: 'Picks',
                    data: [(hero['1_pick'] + hero['2_pick'] + hero['3_pick']) , hero['4_pick'], hero['5_pick'], hero['6_pick'], (hero['7_pick'] + hero['8_pick'])],
                    backgroundColor: 'rgba(255, 99, 132, 1)',
                  },
                  {
                    label: 'Wins',
                    data: [(hero['1_win'] + hero['2_win'] + hero['3_win']) , hero['4_win'], hero['5_win'], hero['6_win'], (hero['7_win'] + hero['8_win'])],
                    backgroundColor: 'rgba(169,207,84,1)',
                  },
                ]
              };
            
            const config = {
                type: 'line',
                data: data,
                plugins: {

                },
                scales: {
                    y:{
                        ticks:{
                            color:"white"
                        }
                    },
                    x:{
                        ticks:{
                            color:"white"
                        }
                    }
                }
            };
            
            setData(data)
            setConfig(config)
          })
          .catch(err => console.log("error: ", err))
      },[id])

    return (
        <div className='container'>
            {
                heroes&&
                <div>
                    <div className='display-all-bg-color'>
                        <h2 style={{color:'white'}} className='card-title'>Hero</h2>
                        <h6 style={{color:'white'}} className='card-subtitle mb-2'>{heroes.localized_name}</h6>
                        <div className='d-flex'>
                            {heroes.roles.map((role, i) => (
                                <p style={{color:'white', paddingRight:'10px'}} key={i}>{role}</p>
                            ))}
                        </div>
                    </div>            
                    <div className='d-flex align-items-center justify-content-around bd-highlight mb-2 grey-color tableColor1'>
                        <img className='img-size' src={`https://api.opendota.com${heroes.img}`} alt='' />
                        <p className='grey-color' style={{color:'white'}}> Picks : {heroes['1_pick'] + heroes['2_pick'] + heroes['3_pick'] + heroes['4_pick'] + heroes['5_pick'] + heroes['6_pick'] + heroes['7_pick'] + heroes['8_pick']}</p>
                        <p className='grey-color' style={{color:'white'}}> Wins : {heroes['1_win'] + heroes['2_win'] + heroes['3_win'] + heroes['4_win'] + heroes['5_win'] + heroes['6_win'] + heroes['7_win'] + heroes['8_win']}</p>
                        <p className='grey-color' style={{color:'white'}}> Win Rate : { "%" + ((heroes['1_win'] + heroes['2_win'] + heroes['3_win'] + heroes['4_win'] + heroes['5_win'] + heroes['6_win'] + heroes['7_win'] + heroes['8_win'])/ (heroes['1_pick'] + heroes['2_pick'] + heroes['3_pick'] + heroes['4_pick'] + heroes['5_pick'] + heroes['6_pick'] + heroes['7_pick'] + heroes['8_pick']) * 100).toFixed(2)}</p>
                        <HeroAbilities name = {heroes.name} sn={heroes.localized_name}/>
                    </div>
                    <div>
                        <h2 style={{color:'white'}}>HERO ATTRIBUTES</h2>
                        {
                            (heroes['primary_attr'] === 'agi')?
                                <div>
                                    <h6 style={{color:'white'}}>PRIMARY ATTRIBUTE: AGILITY</h6>
                                </div>
                            :(heroes['primary_attr'] === 'str')?
                                <div>
                                    <h6 style={{color:'white'}}>PRIMARY ATTRIBUTE: STRENGTH</h6>
                                </div>
                            :(heroes['primary_attr'] === 'int')&&
                            <div>
                                <h6 style={{color:'white'}}>PRIMARY ATTRIBUTE: INTELLIGENCE</h6>
                            </div>
                        }
                        <article>
                            <table className='tableColor1 grey-color' style={{width:"400px"}}>
                                <tbody>
                                    <tr className='d-flex justify-content-around grey-color'>
                                        <td><img style={{height:'50px'}} src={dota_agi} alt=''/></td>
                                        <td><img style={{height:'50px'}} src={dota_str} alt=''/></td>
                                        <td><img style={{height:'50px'}} src={dota_int} alt=''/></td>
                                    </tr>
                                    <tr className='d-flex justify-content-around grey-color rowBG1'>
                                        <td style={{color:'white'}} >{heroes['base_agi']} + {heroes['agi_gain']} </td>
                                        <td style={{color:'white'}} >{heroes['base_str']} + {heroes['str_gain']}</td>
                                        <td style={{color:'white'}}>{heroes['base_int']} + {heroes['int_gain']}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style={{width:"400px"}} className='tableColor1'>
                                <tbody>
                                    <tr className='rowBG2'>
                                        <td style={{color:'white'}}>Movement Speed</td>
                                        <td style={{color:'white'}}>&nbsp;{heroes['move_speed']}</td>
                                    </tr>
                                    <tr className='rowBG1'>
                                        <td style={{color:'white'}}>Base Armor</td>
                                        <td style={{color:'white'}}>&nbsp;{(heroes['base_armor'])}</td>
                                    </tr>
                                    <tr className='rowBG2'>
                                        <td style={{color:'white'}}>Base Attack rate</td>
                                        <td style={{color:'white'}}>&nbsp;{heroes['attack_rate']}</td>
                                    </tr>
                                    <tr className='rowBG1'>
                                        <td style={{color:'white'}}>Base Damage</td>
                                        <td style={{color:'white'}}>&nbsp;{(heroes['base_attack_min'])} - {(heroes['base_attack_max'])}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                        <div>
                            <h2 style={{color:'white'}}>META TRENDS BY RANKS</h2>
                            {
                                (data && config)&&
                                <Bar className='tableColor1 rowBG1' options={config} data={data} />
                            }
                        </div>
                    </div>
                </div>
            }

        </div>
    )
  }
  
  export default DisplayHeroStats;