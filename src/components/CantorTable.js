import React from 'react'
import PropTypes from 'prop-types'
import Fraction from '../models/fraction'
import { getLabel } from '../shared/utils'
import IntervalDisplay from './IntervalDisplay'
import FracDisplay from './FracDisplay'
import styles from './CantorTable.module.css'

function CantorTable({ intervalArr, kind, totLen }) {
    const numOrLetter = (kind, idx) => kind === 'segment' ? idx + 1 : getLabel(idx)

    return(
        <>
            <div className={styles.cantorTableCount}>
                {`${kind}s: ${intervalArr.length}`}
            </div>
            <table className={styles.cantorTable}>
                <thead>
                    <tr className={styles.cantorTableHeader}>
                        <th className={styles.cantorTableRow}>{kind} ID</th>
                        <th className={styles.cantorTableRow}>{kind} Intervals</th>
                        <th className={styles.cantorTableRow}>{kind} Size</th>
                    </tr>
                </thead>
                <tbody>
                    {intervalArr.map( (interval, index) => {
                        return(
                            <tr key={index} >
                                <td className={styles.cantorTableRow}>{numOrLetter(kind, index)}</td>
                                <td className={styles.cantorTableRow}>
                                    <IntervalDisplay interval={interval}/>
                                </td>
                                <td className={styles.cantorTableRow}>
                                    <FracDisplay frac={interval.len}/>
                                </td>
                            </tr>
                        )
                    }) }
                </tbody>
            </table>
            <div className={styles.cantorTableTotLen}>
                Total {kind} Length: {totLen.str}
            </div>
        </>
    )
}

CantorTable.propTypes = {
    intervalArr: PropTypes.array.isRequired,
    kind: PropTypes.string.isRequired,
    totLen: PropTypes.instanceOf(Fraction)
}

export default CantorTable
