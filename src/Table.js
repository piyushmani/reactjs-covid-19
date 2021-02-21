import React from 'react';
import './Table.css'


function Table({countires}) {

  return (
    <div className='table'>
        <table className='table__table'>
        <tbody>
            {
                countires.map(({country,cases})=>(
                <tr>
                    <td>{country} </td>
                    <td>{cases}</td>
                </tr>
                ))
            }
        </tbody>
        </table>
    </div>
  )
}

export default Table;
