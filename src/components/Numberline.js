import React from 'react'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import IntervalCollection from '../models/interval_collection'
import Fraction from '../models/fraction'
import { getLabel } from '../shared/utils'

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

    const fontDetails = {
        'labels': {
            'normal': {
                'fontSize': 30
            },
            'small': {
                'fontSize': 17
            }
        },
        'frac': {
            'normal': {
                'lineWidth':    1.0, // fraction bar width
                'fontSize':     15,
                'fillStyle':    'white',
                'strokeStyle':  'white'
            },
            'small' : {
                'lineWidth':    1.0,
                'fontSize':     9,
                'fillStyle':    'white',
                'strokeStyle':  'white'
            }
        }
    }

    const drawFraction = (ctx, frac, x, y, size) => {
        const oldStyle = ctx.strokeStyle
        const oldLineWidth = ctx.lineWidth
        const oldFont = ctx.font
        const endpointFontBaseline = 'top'
        const endpointFontTop = 15
        const fracBarPad = 2
        const { lineWidth, fontSize, fillStyle, strokeStyle } = fontDetails['frac'][size]
        ctx.font = `${fontSize}px Verdana`
        ctx.lineWidth = lineWidth
        ctx.textBaseline = endpointFontBaseline
        ctx.fillStyle = fillStyle
        ctx.strokeStyle = strokeStyle

        // draw numerator
        const numTop = y + endpointFontTop
        ctx.fillText(frac.num, x, numTop)

        // draw bar under numerator
        const lineLen = Math.max( ctx.measureText(frac.num).width, ctx.measureText(frac.den).width )
        ctx.beginPath()
        // what's that sneaky 0.5 at the end? It's so the line is crisp and white and not fat and grey
        // https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#linewidth
        const barTop = numTop + fontSize + fracBarPad + 0.5
        ctx.moveTo( x - lineLen/2, barTop)
        ctx.lineTo(x + lineLen/2, barTop)
        ctx.stroke()
        // draw denominator
        const denTop = barTop + lineWidth + fracBarPad
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
        const segmentLen = ( width - (margin * 2) ) / commonD
        const start = margin
        const intervalLineWidth = 4.0
        const dotSize = 5

        // font size should be determined here
        let size = segmentLen < 50 ? 'small' : 'normal'

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

                ctx.font = `${fontDetails['labels'][size]['fontSize']}px Verdana`
                // label fractional endpoints of segment
                drawFraction(ctx, interval.left, startPix, midH, size)
                drawFraction(ctx, interval.right, endPix, midH, size)

                //label the segments numerically from left to right
                ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--color-gold')
                ctx.textBaseline = 'bottom'
                ctx.fillText(idx + 1, midPoint, midH - numBottomMargin)
            }
        })

        // the pre-submission "demo" labels all segments
        if(isDemo){
            for(let i = 0; i <= commonD; i++){
                // put a point over all segments
                const dotPix = start + (i * segmentLen)
                ctx.fillStyle = 'white'
                fillCircle(ctx, dotPix, midH, dotSize)
                // label the points with their fractional value
                drawFraction(ctx, new Fraction(i, commonD), dotPix, midH, size)
                // label the segments left to right numerically
                if(i < commonD){
                    // always use 'normal' font size for demo
                    ctx.font = `${fontDetails['labels']['normal']['fontSize']}px Verdana`
                    const segMid = start + (segmentLen * i) + segmentLen/2
                    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--color-gold')
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
                const midPoint = (segDrawLen/2) + startPix
                ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--color-gap-label-blue')
                ctx.textBaseline = 'bottom'
                const numBottomMargin = 15
                ctx.fillText( getLabel(index), midPoint, midH - numBottomMargin )
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
