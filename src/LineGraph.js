import React , {useState, useEffect} from 'react';
import {Line} from "react-chartjs-2";
import numeral from "numeral"

function LineGraph({casesType}) {
    const [data, setData] = useState({});

    const options ={
        legend: {
            display:true
        },
        elements: {
            points :{
                radius: 0,
            }
        },
        maintainAspectRatio:false,
        tooltip:{
            mode: "index",
            intersection:false,
            callbacks: {
                label: function(toottipItem){
                    return numeral(toottipItem.value).format("+0,0")
                }
            }
        },
        scales:{
            xAxis:[{
                type:'time',
                time:{
                    format:'DD/MM',
                    toolpitFormat:'ll'
                }
                }
            ],
            yAxes: [
                {
                  gridLines:{display:false  },
                }
              ]
        }
    }

    useEffect(() => {
      //'https://disease.sh/v3/covid-19/historical/all?lastdays=120'
      const fetchData = async => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=50')
        .then(response => response.json())
        .then(data =>{
            
             const chartData = buildChardData(data,casesType);  
              console.log(chartData)
             setData(chartData);  
        })
      }
      fetchData();
      
    },[casesType])
    
    const buildChardData = ( data, casesType= 'cases') =>{
        
        const chartData = [];
        let lastDataPoint ;
        for (let date in data.cases) {
        if (lastDataPoint){
            const newDataPoint ={
                x:date,
                y:data[casesType][date]-lastDataPoint
            }
            
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
        }
        return chartData;
    }

    return (
        <div className="line__graph__container">
            
            { data?.length > 0 && (
                    <Line
                    options ={options}
                    data={{
                        labels :data.map(d => d.x),
                        datasets : [{
                            backgroundColor :'rgba(204,16,52,0.5)',
                            borderColor:'#CC1034',
                            data:data.map(d => d.y),
                            lineTension: 0.5,
                            borderWidth: 0.2,
                        }]
                   }}
                   > </Line>
            )}
            
        </div>
    )
}

export default LineGraph;