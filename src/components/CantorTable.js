import React from 'react'
import PropTypes from 'prop-types'
import Fraction from '../models/fraction'
import { getLabel } from '../shared/utils'
import IntervalDisplay from './IntervalDisplay'
import FracDisplay from './FracDisplay'

const CantorTable = ({ intervalArr, kind, totLen }) => {
    const numOrLetter = (kind, idx) => kind === 'segment' ? idx + 1 : getLabel(idx)

    return(
        <div className={`cantor-result-${kind}s`}>
            <div className='cantor-table-count'>
                {`${kind}s: ${intervalArr.length}`}
            </div>
            <table className='cantor-table'>
                <thead>
                    <tr className='cantor-table-header'>
                        <th className="cantor-table-row">{kind} ID</th>
                        <th className="cantor-table-row">{kind} Intervals</th>
                        <th className="cantor-table-row">{kind} Size</th>
                    </tr>
                </thead>
                <tbody>
                    {intervalArr.map( (interval, index) => {
                        return(
                            <tr key={index} >
                                <td className="cantor-table-row">{numOrLetter(kind, index)}</td>
                                <td className="cantor-table-row">
                                    <IntervalDisplay interval={interval}/>
                                </td>
                                <td className="cantor-table-row">
                                    <FracDisplay frac={interval.len}/>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
            <div className='cantor-table-tot-len'>
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