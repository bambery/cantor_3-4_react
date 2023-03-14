import React from 'react'
import PropTypes from 'prop-types'
import { RiCloseLine } from 'react-icons/ri'
import styles from './Modal.module.css'

function Modal({ setShowModal, name, instructions }) {
    return (
        <>
            <div className={styles.modalPlacement}>
                <div className={styles.modal} id={`modal-${name}`}>
                    <div className={styles.modalHeader }>
                        <div className={styles.modalTitleText}>
                            {instructions['title']}
                        </div>
                        <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                            <RiCloseLine style={{ marginBottom: '-3px' }} />
                        </button>
                    </div>
                    <div className={styles.modalContent}>
                        {instructions['message']}
                    </div>
                </div>
            </div>
            <div className={styles.darkBG} onClick={ () => setShowModal(false)} />
        </>
    )
}

export default Modal

Modal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    instructions: PropTypes.object.isRequired
}
