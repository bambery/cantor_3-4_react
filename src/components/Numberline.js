import React from 'react'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import IntervalCollection from '../models/interval_collection'

const Numberline = ({ intCol }) => {
    const canvasRef = useRef()

    useEffect( () => {
        let ctx = drawCanvas()
        drawNumberline(ctx)
    }, [])

    const drawCanvas = () => {
        const canvas = canvasRef.current
        var rect = canvas.parentNode.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        const ctx = canvas.getContext('2d')
        const width = ctx.canvas.offsetWidth
        const height = ctx.canvas.offsetHeight
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
        return ctx
    }

    const drawNumberline = (ctx) => {
        const numberlineWidth = 2.0
        const intervalLineWidth = 4.0
        const margin = 30
        const dotSize = 5
        const fontSize = 15
        var width = ctx.canvas.offsetWidth
        var height = ctx.canvas.offsetHeight
        var midH = Math.floor(height/2)
        ctx.strokeStyle = 'white'
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center'
        // draw numberline
        ctx.lineWidth = numberlineWidth
        ctx.beginPath()
        ctx.moveTo(margin, midH)
        ctx.lineTo(width - margin, midH)
        ctx.stroke()
    }

    return(
        <div className='numberline'>
            <canvas
                ref={canvasRef}
            />
        </div>
    )
}

Numberline.propTypes = {
    intCol: PropTypes.instanceOf(IntervalCollection)
}
export default Numberline
