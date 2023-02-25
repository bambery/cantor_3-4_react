import React from 'react'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import IntervalCollection from '../models/interval_collection'
import Fraction from '../models/fraction'
import { getLabel } from '../shared/utils'

const Numberline = ({ intCol, isDemo, toRemove = [] }) => {
    //////////////////////////////////////////////
    // thank you to:
    // https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html
    //////////////////////////////////////////////
    const canvasRef = useRef()
    let config
    const canvasConfig = {
        'canvas': {
            'margin':       30,
            'canvasColor':  'black',
            'fontFamily':   'Verdana'
        },
        'numberline': {
            'lineWidth':    2.0,
            'fillStyle':    'white',
            'strokeStyle':  'white',
            'textAlign':    'center'
        },
        'interval': {
            'lineWidth':    5.0,
            'color':        'red'
        },
        'label': {
            'fillStyle': {
                'segment':  'red',
                'gap':      'white'
            },
            'textBaseline': 'bottom',
            'bottomMargin': 15,
            'fontFamily':   'Verdana',
            'normal': {
                'fontSize': 30
            },
            'small': {
                'fontSize': 17
            }
        },
        'dot':{
            'size':     5,
            'color':    'white'
        },
        'frac': {
            'lineWidth':        1.0, // fraction bar width
            'fillStyle':        'white',
            'strokeStyle':      'white',
            'fontFamily':       'Verdana',
            'textBaseline':     'top',
            'endpointFontTop':  15,
            'fracBarPad':   2,
            'normal': {
                'fontSize':     15,
            },
            'small' : {
                'fontSize':     9,
            }
        },
        'title': {
            'fontSize':         25,
            'fontColor':        '--color-gold',
            'fontFamily':       'Verdana',
            'textBaseline':     'top',
            'topMargin':        10,
            'leftMargin':       20,
            'text':             '1st Iteration Demo',
            'legend': {
                'leftMargin':   8,
                'fontSize':     10,
                'fontColor':    'white',
                'outlineColor': 'white',
                'boxSize':      10,
                'textBaseline': 'middle',
                'segText':      '= Line Segment',
                'gapText':      '= Gap in Interval'
            }
        }
    }

    useEffect( () => {
        const ctx = drawCanvas(canvasRef)
        config = canvasConfig['canvas']
        const margin = config['margin']
        const width = ctx.canvas.offsetWidth
        const height = ctx.canvas.offsetHeight
        const midH = Math.floor(height/2)
        const intColCommon = intCol.commonDen()
        const commonD = intColCommon[0].left.den
        // the number of pixels representing 1/commonDen on the numberline
        const segmentLen = ( width - (margin * 2) ) / commonD
        // TODO: #60 - font size threshold
        let size = segmentLen < 50 ? 'small' : 'normal'

        // I dont need to pass anything actually?
        drawNumberline(ctx, width, margin, midH)
        drawIntervals(ctx, intColCommon, segmentLen, margin, midH)
        drawPoints(ctx, intColCommon, commonD, segmentLen, margin, midH, size)
    }, [intCol, isDemo])

    const drawCanvas = (canvasRef) => {
        config = canvasConfig['canvas']

        const canvas = canvasRef.current
        var rect = canvas.parentNode.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height
        const ctx = canvas.getContext('2d')
        const width = ctx.canvas.offsetWidth
        const height = ctx.canvas.offsetHeight
        ctx.fillStyle = config['canvasColor']
        ctx.fillRect(0, 0, width, height)

        if(isDemo){
            config = canvasConfig['title']
            const colorGold = getComputedStyle(document.body).getPropertyValue(config['fontColor'])
            ctx.fillStyle = colorGold
            ctx.font = `${config['fontSize']}px ${config['fontFamily']}`
            ctx.textBaseline = config['textBaseline']
            // draw the title
            ctx.fillText(config['text'], config['leftMargin'], config['topMargin'])
            // measure for drawing the legend
            const textMeasure = ctx.measureText(config['text'])
            // exploiting that my fontsize is very close to the height in px for this font
            const titleMidpointY = Math.floor(config['fontSize']/2) + config['topMargin']
            let titleLeftCursor = config['leftMargin'] + textMeasure.width
            // draw legend
            config = canvasConfig['title']['legend']
            ctx.font = `${config['fontSize']}px ${canvasConfig['canvas']['fontFamily']}`
            ctx.textBaseline = config['textBaseline']
            // draw segment key
            ctx.fillStyle = canvasConfig['label']['fillStyle']['segment']
            titleLeftCursor += (config['leftMargin'] * 2)
            ctx.fillRect(titleLeftCursor, Math.floor(titleMidpointY - config['boxSize']/2), config['boxSize'], config['boxSize'])
            titleLeftCursor += config['boxSize'] + config['leftMargin']
            ctx.fillStyle = colorGold
            ctx.fillText(config['segText'], titleLeftCursor, titleMidpointY)
            // draw gap key
            ctx.fillStyle = canvasConfig['label']['fillStyle']['gap']
            titleLeftCursor += ctx.measureText(config['segText']).width + (config['leftMargin'] * 2)
            ctx.fillRect(titleLeftCursor, Math.floor(titleMidpointY - config['boxSize']/2), config['boxSize'], config['boxSize'])
            titleLeftCursor += config['boxSize'] + config['leftMargin']
            ctx.fillStyle = colorGold
            ctx.fillText(config['gapText'], titleLeftCursor, titleMidpointY)
        }

        return ctx
    }

    const drawNumberline = (ctx, width, margin, midH) => {
        config = canvasConfig['numberline']
        ctx.lineWidth = config['lineWidth']
        ctx.strokeStyle = config['strokeStyle']
        ctx.fillStyle = config['fillStyle']
        ctx.textAlign = config['textAlign']
        // draw numberline
        ctx.beginPath()
        ctx.moveTo(margin, midH)
        ctx.lineTo(width - margin, midH)
        ctx.stroke()
    }

    const drawIntervals = (ctx, intColCommon, segmentLen, margin, midH) => {
        config = canvasConfig['interval']
        ctx.lineWidth = config['lineWidth']
        ctx.strokeStyle = config['color']

        // draw red lines representing intervals
        intColCommon.forEach( interval => {
            const startPix = margin + (interval.left.num * segmentLen)
            const segDrawLen = interval.len.num * segmentLen
            const endPix = startPix + segDrawLen
            ctx.beginPath()
            ctx.moveTo(startPix, midH)
            ctx.lineTo(endPix, midH)
            ctx.stroke()
        })
    }

    const drawSegmentLabel = (ctx, text, midpoint, midH, size, kind) => {
        config = canvasConfig['label']
        ctx.textBaseline = config['textBaseline']
        ctx.font = `${config[size]['fontSize']}px ${config['fontFamily']}`
        ctx.fillStyle = config['fillStyle'][kind]
        ctx.fillText( text, midpoint, midH - config['bottomMargin'])
    }

    const drawPoints = (ctx, intColCommon, commonD, segmentLen, margin, midH, size) => {
        if(isDemo){
            for( let i = 0; i < commonD; i++){
                // draw left endpoint and fraction
                const dotPix = margin + (i * segmentLen)
                fillCircle(ctx, dotPix, midH)
                drawFrac(ctx, new Fraction(i, commonD), dotPix, midH, size)
                // label segments numerically from left to right
                if(i < commonD){
                    const midpoint = margin + (segmentLen * i) + segmentLen/2
                    const kind = toRemove.includes(i + 1)
                        ? 'gap'
                        : 'segment'
                    drawSegmentLabel(ctx, i+1, midpoint, midH, size, kind)
                }

                // draw rightmost endpoint and fraction
                if(i === commonD - 1){
                    config = canvasConfig['dot']
                    ctx.fillStyle = config['color']
                    const endPix = dotPix + segmentLen
                    fillCircle(ctx, endPix, midH)
                    drawFrac(ctx, new Fraction(i + 1, commonD), endPix, midH, size)
                }
            }
        } else {
            intColCommon.forEach( (interval, idx) => {
                const startPix = margin + (interval.left.num * segmentLen)
                const segDrawLen = interval.len.num * segmentLen
                const endPix = startPix + segDrawLen
                const midpoint = (segDrawLen/2) + startPix
                // draw endpoint and fraction labels for segment
                fillCircle(ctx, startPix, midH)
                drawFrac(ctx, interval.left, startPix, midH, size)
                fillCircle(ctx, endPix, midH)
                drawFrac(ctx, interval.right, endPix, midH, size)

                // label segments numerically right to left
                drawSegmentLabel(ctx, idx+1, midpoint, midH, size, 'segment')
            })

            // label gaps alphabetically
            const commonGaps = new IntervalCollection(intCol.gaps).commonDen()
            // TODO: #66 - gap labels should be consistent over iterations
            commonGaps.forEach( (interval, idx) => {
                const startPix = margin + (interval.left.num * segmentLen)
                const segDrawLen = interval.len.num * segmentLen
                const midpoint = (segDrawLen/2) + startPix
                drawSegmentLabel(ctx, getLabel(idx), midpoint, midH, size, 'gap')
            })
        }
    }

    const drawFrac = (ctx, frac, x, y, size) => {
        config = canvasConfig['frac']
        // position where the top of the fraction will go
        const numTop = y + config['endpointFontTop']
        const fontSize = config[size]['fontSize']

        ctx.font = `${fontSize}px ${config['fontFamily']}`
        ctx.lineWidth = config['lineWidth']
        ctx.textBaseline = config['textBaseline']
        ctx.fillStyle = config['fillStyle']
        ctx.strokeStyle = config['strokeStyle']

        // draw numerator
        ctx.fillText(frac.num, x, numTop)
        // draw bar
        const lineLen = Math.max( ctx.measureText(frac.num).width, ctx.measureText(frac.den).width )
        // 0.5 added to the end to make line smooth. https://bucephalus.org/text/CanvasHandbook/CanvasHandbook.html#linewidth
        // exploiting that my fontsize is very close to the height in px for this font
        const barTop = numTop + fontSize + config['fracBarPad'] + 0.5
        ctx.beginPath()
        ctx.moveTo( x - lineLen/2, barTop)
        ctx.lineTo(x + lineLen/2, barTop)
        ctx.stroke()
        // draw denominator
        const denTop = barTop + config['lineWidth'] + config['fracBarPad']
        ctx.fillText(frac.den, x, denTop)
    }

    const fillCircle = (ctx, x, y) => {
        config = canvasConfig['dot']
        ctx.fillStyle = config['color']
        ctx.beginPath()
        ctx.arc(x, y, config['size'], 0, 2* Math.PI)
        ctx.fill()
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
    isDemo: PropTypes.bool.isRequired,
    toRemove: PropTypes.array
}
export default Numberline
