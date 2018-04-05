import React from 'react'
import PropTypes from 'prop-types'
import styles from './Button.scss'
import cx from 'classnames'

const Button = ({ children, primary, reject, onClick }) => (
  <button
    onClick={onClick}
    className={cx(styles.component, {
      [styles.reject]: reject,
      [styles.primary]: primary
    })}>
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.bool,
  reject: PropTypes.bool,
  onClick: PropTypes.func
}

export default Button
