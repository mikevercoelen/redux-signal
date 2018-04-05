import React from 'react'
import PropTypes from 'prop-types'
import { Modal as ModalConstruct } from 'react-modal-construction-kit'
import styles from './Modal.scss'
import cx from 'classnames'

const Modal = ({
  title,
  children,
  footer,
  dialogClassName,
  ...props
}) => (
  <ModalConstruct
    {...props}
    contentClassName={styles.content}
    dialogClassName={cx(styles.dialog, {
      [dialogClassName]: dialogClassName
    })}>
    <div className={styles.header}>
      {title}
    </div>
    {children && (
      <div className={styles.body}>
        {children}
      </div>
    )}
    {footer && (
      <div className={styles.footer}>
        {footer}
      </div>
    )}
  </ModalConstruct>
)

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.node,
  ...ModalConstruct.propTypes
}

export default Modal
