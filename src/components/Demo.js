import React from 'react'
import PropTypes from 'prop-types'
import Numberline from './Numberline'
import Cantor from '../models/cantor'

const Demo = ({ cantor }) => {
    return(
        <Numberline
            intCol={cantor.iterations[0]}
            isDemo={true}
        />
    )
}

Demo.propTypes = {
    cantor: PropTypes.instanceOf(Cantor)
}

export default Demo
