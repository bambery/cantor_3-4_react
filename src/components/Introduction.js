import React from 'react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import styles from './Introduction.module.css'
import HowToCantorStep from './HowToCantorStep'

const Introduction = () => {

    const [showCantorInfo, setShowCantorInfo] = useState(true)

    const stepDetails = [
        {
            'numeral': 'I',
            'instruction': 'First, take a line segment.',
        },
        {
            'numeral': 'II',
            'instruction': 'Next, divide the line segment into 3 intervals.',
        },
        {
            'numeral':  'III',
            'instruction':  'Then remove the middle interval, leaving two line segments.'
        },
        {
            'numeral':  'IV',
            'instruction':  'With the two remaining line segments, divide into 3 parts again and remove the middle, repeating this operation indefinitely.'
        }
    ]

    const toggleDetails = () => {
        setShowCantorInfo(!showCantorInfo)
    }

    const displayToggle = () => {
        return (
            <span className='caretToggle'>
                {showCantorInfo
                    ? <AiFillCaretDown/>
                    : <AiFillCaretRight/>
                }
            </span>
        )
    }

    const cantorDescription = () => {
        return(
            <div className={styles.textDescription}>
                In Mathematics, the Cantor set is a <a href="https://en.wikipedia.org/wiki/Set_(mathematics)">set</a> of <a href="https://en.wikipedia.org/wiki/Point_(geometry)">points</a> lying on a single <a href="https://en.wikipedia.org/wiki/Line_segment">line segment</a> with some unusual properties.
                <div className={styles.centeringDiv}>
                    <div className={styles.howToCantorTitle}>
                        How to construct the Cantor Set:
                    </div>
                    <div className={styles.twoCol}>
                        { stepDetails.map( (stepInfo, idx) =>
                            <React.Fragment key={stepInfo['numeral']}>
                                <HowToCantorStep stepInfo={stepInfo} stepNum={idx} />
                            </React.Fragment>
                        ) }
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className={styles.centeringDiv}>
            <div className={styles.introduction} onClick={toggleDetails}>
                <div className={styles.whatIsCantorTitle}>
                {displayToggle()}
                What is a Cantor Set?
                </div>
                {showCantorInfo && cantorDescription()}
            </div>
            <div className={styles.introduction}>
                This is an introduction
            </div>
        </div>
    )
}

export default Introduction
