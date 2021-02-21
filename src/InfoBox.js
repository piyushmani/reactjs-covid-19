


import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core";
import './InfoBox.css'

// baseURL https://disease.sh/v3/covid-19/countries

function InfoBox({title, cases, active, isRed, total, ...props}) {

  return (
    <Card className={`infoBox ${active && "infoBox--selected"}
    ${isRed && "infoBox--isRed"} `} onClick={props.onClick}>
        <CardContent className='text__center'>
            <Typography className='infoBox__title' color='textSecondary'>{title}</Typography>
            <h2 className={`infoBox__cases ${!isRed && "infoBox__cases__green"} `}>+{cases}</h2>
            <Typography className='infoBox__total' color='textSecondary'>{total} Total</Typography>
        </CardContent>

    </Card>
  )
}

export default InfoBox;
