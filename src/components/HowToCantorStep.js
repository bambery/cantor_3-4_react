import React from 'react'
import PropTypes from 'prop-types'
import { useRef, useEffect } from 'react'
import styles from './HowToCantorStep.module.css'

const HowToCantorStep = ({ stepInfo, stepNum }) => {
    const canvasRef = useRef()

    const stepDraw = [
        drawStep1,
        drawStep2,
        drawStep3,
        drawStep4
    ]

    useEffect( () => {
        const ctx = drawCanvas(canvasRef)
        const width = ctx.canvas.offsetWidth
        const height = ctx.canvas.offsetHeight
        const midH = Math.floor(height/2)
        stepDraw[stepNum](ctx, height, width, midH)
    }, [])

    function drawCanvas(canvasRef){
        const canvas = canvasRef.current
        var rect = canvas.parentNode.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        const ctx = canvas.getContext('2d')
        const width = ctx.canvas.offsetWidth
        const height = ctx.canvas.offsetHeight
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2.0
        ctx.fillRect(0, 0, width, height)
        return ctx
    }

    function drawStep1(ctx, height, width, midH){
        ctx.beginPath()
        ctx.moveTo(0, midH)
        ctx.lineTo(width, midH)
        ctx.stroke()
    }

    function drawStep2(ctx, height, width, midH){
        const oneThird = Math.floor(width/3)
        drawStep1(ctx, height, width, midH)
        ctx.beginPath()
        ctx.moveTo(oneThird, 0)
        ctx.lineTo(oneThird, height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneThird * 2, 0)
        ctx.lineTo(oneThird * 2, height)
        ctx.stroke()
    }

    function drawStep3(ctx, height, width, midH){
        const oneThird = Math.floor(width/3)
        ctx.beginPath()
        ctx.moveTo(0, midH)
        ctx.lineTo(oneThird, midH)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneThird*2, midH)
        ctx.lineTo(width, midH)
        ctx.stroke()
    }

    function drawStep4(ctx, height, width, midH){
        // step 4 has 2 diagrams stacked on top of one another
        midH = Math.floor(midH/2)
        const topHeight = Math.floor(height/2)
        const oneNinth = Math.floor(width/9)
        // top diagram
        // draw horizontal lines
        drawStep3(ctx, topHeight, width, midH)
        // draw vertical lines
        ctx.beginPath()
        ctx.moveTo(oneNinth, 0)
        ctx.lineTo(oneNinth, topHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneNinth*2, 0)
        ctx.lineTo(oneNinth*2, topHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneNinth*7, 0)
        ctx.lineTo(oneNinth*7, topHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneNinth*8, 0)
        ctx.lineTo(oneNinth*8, topHeight)
        ctx.stroke()

        // bottom diagram
        const bottomHeight = height - ctx.lineWidth
        ctx.beginPath()
        ctx.moveTo(0, bottomHeight)
        ctx.lineTo(oneNinth, bottomHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneNinth*2, bottomHeight)
        ctx.lineTo(oneNinth*3, bottomHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneNinth*6, bottomHeight)
        ctx.lineTo(oneNinth*7, bottomHeight)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(oneNinth*8, bottomHeight)
        ctx.lineTo(width, bottomHeight)
        ctx.stroke()
    }

    return(
        <>
            <div className={styles.numeralInstruction}>
                <div className={styles.numeral} key={stepInfo['numeral']}>
                    {stepInfo['numeral']}
                </div>
                <div className={styles.instruction} key={stepInfo['instruction']}>
                    {stepInfo['instruction']}
                </div>
            </div>
            <div className={styles.diagram}>
                <canvas ref={canvasRef}></canvas>
            </div>
        </>
    )
}

HowToCantorStep.propTypes = {
    stepInfo:   PropTypes.object.isRequired,
    stepNum:    PropTypes.number.isRequired
}

export default HowToCantorStep

