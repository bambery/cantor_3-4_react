import React from 'react'
import { useState } from 'react'
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai'
import styles from './Introduction.module.css'
import HowToCantorStep from './HowToCantorStep'
import FracDisplay from './FracDisplay'

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

    const parensSec = () => {
        const den = <span>1 - {frac(2,3, 'evenSmallerFrac')}</span>
        return(
            <span className={styles.bigParens}>
                <span className={styles.parens}>(</span>
                {frac(1, den)}
                <span className={styles.parens}>)</span>
            </span>
        )
    }

    const geometricSum = (start,end) => {
        const top = <span>2<sup>n</sup></span>
        const bottom = <span>3<sup>n+1</sup></span>
        return(
            <div className={styles.eq}>
                <div className={styles.sum}>
                    <div className={styles.end}>
                        {'\u221e'}
                    </div>
                    <div className={styles.sigma}>
                        {'\u2211'}
                    </div>
                    <div className={styles.start}>
                        n=0
                    </div>
                </div>
                <div className={styles.equation}>
                    <span>{frac(top, bottom)} = {frac(1,3)} + {frac(2,9)} + {frac(4, 27)} + {frac(8, 81)} + {'\u22ef'} + = {frac(1,3)}</span> {parensSec()} <span>= 1</span>
                </div>
            </div>
        )
    }

    const frac = (num, den, optionalClass='smallerFrac') => {
        const newFrac = {
            'num': num,
            'den': den
        }

        return(
            <span className={styles[optionalClass]}><FracDisplay frac={newFrac}/></span>
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
                    <div className={styles.textDescription}>
                        <p><span className={styles.introEmphasis}>How many points are in the Cantor Set?</span>{`Because the endpoints of each interval are never candidates for removal (each iteration must remove a "middle" interval), the set of all points remaining after each iteration will never be empty, making the Cantor Set an `}<a href="https://en.wikipedia.org/wiki/Infinite_set">infinite set</a>{`.`}</p>
                        <p><span className={styles.introEmphasis}>What is the length of the Cantor Set?</span> The original length of the interval is 1. In the first iteration, we remove an interval of length {frac(1,3)}, leaving 1 - {frac(1,3)} = {frac(2,3)}. In the second iteration, we remove 2 intervals of length {frac(1,9)}, leaving {frac(2,3)} - {frac(1,9)}*2 = {frac(4,9)}. A third iteration would remove 4 intervals of length {frac(1, 27)}, leaving length {frac(4,9)} - {frac(4, 27)} = {frac(8,27)}.</p>
                        <p>The total length of a Cantor Set can be computed by subtracting the total length of all removed intervals:</p>
                        <div className={styles.geometricEq}>
                            {geometricSum()}
                        </div>
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
                This tool will construct both symmetric and asymmetric Cantor-like sets based on your custom inputs. The numberline in black below shows an example of the segmentation to be performed on each iteration. Results can be downloaded in CSV format.
            </div>
        </div>
    )
}

export default Introduction
