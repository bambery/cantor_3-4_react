import React from 'react'
import PropTypes from 'prop-types'
import { RiCloseLine } from 'react-icons/ri'

const Modal = ({ setShowModal, id }) => {
    const iconPos = document.getElementById( id ).getBoundingClientRect()

    const modalPos = {
        position: 'fixed',
    }

    return (
        <>
            <div className='darkBG' onClick={ () => setShowModal(false)} />
            <div className='centered'>
                <div className='modal'>
                    <div className='modal-header'>
                        <h5 className='heading'>Dialog</h5>
                    </div>
                    <button className='close-btn' onClick={() => setShowModal(false)}>
                        <RiCloseLine style={{ marginBottom: '-3px' }} />
                    </button>
                    <div className='modal-content'>
                        Hello this is a modal.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal

Modal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
}
