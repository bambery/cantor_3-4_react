import React from 'react'
import PropTypes from 'prop-types'
import Fraction from '../models/fraction'

const CantorTable = ({ intervalArr, kind, totLen }) => {
    return(
        <div>
            <div className='interval-table-count'>
                {`${kind}s: ${intervalArr.length}`}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>{kind} ID</th>
                        <th>{kind} Intervals</th>
                        <th>{kind} Size</th>
                    </tr>
                </thead>
                <tbody>
                    {intervalArr.map( (interval, index) => {
                        return(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{interval.str}</td>
                                <td>{interval.len.str}</td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
            <div className='interval-table-tot-len'>
                Total {kind} Length: {totLen.str}
            </div>
        </div>
    )
}

CantorTable.propTypes = {
    intervalArr: PropTypes.array.isRequired,
    kind: PropTypes.string.isRequired,
    totLen: PropTypes.instanceOf(Fraction)
}

export default CantorTable
