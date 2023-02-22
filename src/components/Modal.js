import React from 'react'
import PropTypes from 'prop-types'
import { RiCloseLine } from 'react-icons/ri'

const Modal = ({ setShowModal, name, instructions }) => {

    return (
        <>
            <div className='darkBG' onClick={ () => setShowModal(false)} />
            <div className='modal-placement'>
                <div className='modal' id={`modal-${name}`}>
                    <div className='modal-header'>
                        <div className='modal-title-text'>
                            {instructions['title']}
                        </div>
                        <button className='close-btn' onClick={() => setShowModal(false)}>
                            <RiCloseLine style={{ marginBottom: '-3px' }} />
                        </button>
                    </div>
                    <div className='modal-content'>
                        {instructions['message']}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal

Modal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    instructions: PropTypes.object.isRequired
}
