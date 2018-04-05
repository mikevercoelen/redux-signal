import React from 'react'
import PropTypes from 'prop-types'
import { Modal as ModalConstruct } from 'react-modal-construction-kit'
import styles from './Modal.scss'

const Modal = ({
  title,
  message,
  footer,
  ...props
}) => (
  <ModalConstruct
    {...props}
    contentClassName={styles.content}
    dialogClassName={styles.dialog}>
    <div className={styles.header}>
      {title}
    </div>
    {message && (
      <div className={styles.body}>
        {message}
      </div>
    )}
    <div className={styles.footer}>
      {footer}
    </div>
  </ModalConstruct>
)

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  footer: PropTypes.node
}

export default Modal
