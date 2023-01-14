import React from 'react'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import IntervalCollection from '../models/interval_collection'
import Fraction from '../models/fraction'

const Numberline = ({ intCol, isDemo }) => {
//////////////////////////////////////////////
// https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html
//////////////////////////////////////////////
    const canvasRef = useRef()

    useEffect( () => {
        const ctx = drawCanvas(canvasRef)
        const margin = 30
        //const fontSize = 15
        const width = ctx.canvas.offsetWidth
        const height = ctx.canvas.offsetHeight
        const midH = Math.floor(height/2)
        drawNumberline(ctx, margin, width, height, midH)
        drawIntervals(ctx, intCol, width, margin, midH)
    }, [intCol, isDemo])

    const determineFontSize = (numSeg) => {
        if(numSeg <= 25){
            return 30
        } else {
            return 18
        }
    }

    const drawCanvas = (canvasRef) => {
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

    const fillCircle = (contextObj, x, y, r) => {
        contextObj.beginPath()
        contextObj.arc(x, y, r, 0, 2* Math.PI)
        contextObj.fill()
    }

    const drawNumberline = (ctx, margin, width, height, midH) => {
        const numberlineWidth = 2.0
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

    const drawFraction = (ctx, frac, x, y) => {
        const oldStyle = ctx.strokeStyle
        const oldLineWidth = ctx.lineWidth
        const oldFont = ctx.font
        const endpointFontBaseline = 'top'
        const fracBarWidth = 1.0
        const fracBarPad = 2
        const endpointFontTop = 15
        const fracFontSize = 15
        ctx.font = `${fracFontSize}px Verdana`
        ctx.lineWidth = fracBarWidth
        ctx.textBaseline = endpointFontBaseline
        ctx.fillStyle = 'white'
        ctx.strokeStyle = 'white'

        // draw numerator
        const numTop = y + endpointFontTop
        ctx.fillText(frac.num, x, numTop)

        // draw bar under numerator
        const lineLen = Math.max( ctx.measureText(frac.num).width, ctx.measureText(frac.den).width )
        ctx.beginPath()
        // what's that sneaky 0.5 at the end? It's so the line is crisp and white and not fat and grey
        // https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#linewidth
        const barTop = numTop + fracFontSize + fracBarPad + 0.5
        ctx.moveTo( x - lineLen/2, barTop)
        ctx.lineTo(x + lineLen/2, barTop)
        ctx.stroke()
        // draw denominator
        const denTop = barTop + fracBarWidth + fracBarPad
        ctx.fillText(frac.den, x, denTop)

        // return changed styles to what they were before this fxn call
        // TODO: try getting rid of this and explicitly setting attr each time.
        // do people write helpers to set certain contexts that must be returned to frequently?
        ctx.strokeStyle = oldStyle
        ctx.lineWidth = oldLineWidth
        ctx.font = oldFont
    }

    const drawIntervals = (ctx, intCol, width, margin, midH) => {
        const intColCommon = intCol.commonDen()
        const commonD = intColCommon[0].left.den
        //const [intColCommon, commonD] = intCol.commonDen()
        const segmentLen = ( width - (margin * 2) ) / commonD
        const start = margin
        const intervalLineWidth = 4.0
        const dotSize = 5

        intColCommon.forEach( (interval, idx) => {
            const startPix = start + (interval.left.num * segmentLen)
            const segDrawLen = interval.len.num * segmentLen
            const endPix = startPix + segDrawLen
            const midPoint = (segDrawLen/2) + startPix
            const numBottomMargin = 15
            // draw red intervals
            ctx.lineWidth = intervalLineWidth
            ctx.strokeStyle = 'red'
            ctx.beginPath()
            ctx.moveTo(startPix, midH)
            ctx.lineTo(endPix, midH)
            ctx.stroke()
            if(!isDemo){
                // draw white points on line
                ctx.fillStyle = 'white'
                fillCircle(ctx, startPix, midH, dotSize)
                fillCircle(ctx, endPix, midH, dotSize)
                // draw fractions

                ctx.font = `${determineFontSize(commonD)}px Verdana`
                // label fractional endpoints of segment
                drawFraction(ctx, interval.left, startPix, midH)
                drawFraction(ctx, interval.right, endPix, midH)

                //label the segments numerically from left to right
                ctx.fillStyle = '#e5b513'
                ctx.textBaseline = 'bottom'
                ctx.fillText(idx + 1, midPoint, midH - numBottomMargin)
            }
        })

        // the pre-submission "demo" labels all segments
        if(isDemo){
            // if I wanted to make the labels clickable, or position different labels above them
            //let segPix = []
            for(let i = 0; i <= commonD; i++){
                // put a point over all segments
                const dotPix = start + (i * segmentLen)
                ctx.fillStyle = 'white'
                fillCircle(ctx, dotPix, midH, dotSize)
                // label the points with their fractional value
                drawFraction(ctx, new Fraction(i, commonD), dotPix, midH)
                // label the segments left to right numerically
                if(i < commonD){
                    ctx.font = `${determineFontSize(commonD)}px Verdana`
                    const segMid = start + (segmentLen * i) + segmentLen/2
                    //segPix.push(segMid)
                    ctx.fillStyle = '#e5b513'
                    ctx.textBaseline = 'bottom'
                    const numBottomMargin = 15
                    ctx.fillText(i + 1, segMid, midH - numBottomMargin)
                }
            }
        }

        // label the gaps alphabetically from left to right
        if(!isDemo){
            intCol.gaps.forEach( (interval, index) => {
            const startPix = start + (interval.left.num * segmentLen)
            const segDrawLen = interval.len.num * segmentLen
            const endPix = startPix + segDrawLen
            const midPoint = (segDrawLen/2) + startPix
            ctx.fillStyle = '#609ab8'
            ctx.textBaseline = 'bottom'
            const numBottomMargin = 15
            ctx.fillText( String.fromCharCode(index + 65), midPoint, midH - numBottomMargin )
            })
        }

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
    intCol: PropTypes.instanceOf(IntervalCollection),
    isDemo: PropTypes.bool.isRequired
}
export default Numberline
