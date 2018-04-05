import React from 'react'
import Modal from '../Modal/Modal'
import Button from '../Button/Button'
import { isModal, isModalPropTypes } from '../../../src'
import styles from './ModalLogin.scss'

const ModalLogin = ({
  modal,
  setBusy,
  close
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    setBusy(true)

    setTimeout(() => {
      close()
    }, 2000)
  }

  return (
    <Modal
      onClosed={close}
      onClickOutside={close}
      dialogClassName={styles.modalDialog}
      isOpen={modal.isVisible}
      title='Login'>
      <form onSubmit={handleSubmit}>
        <div className='form-field'>
          <input type='text' placeholder='email' />
        </div>
        <div className='form-field'>
          <input type='password' placeholder='password' />
        </div>
        <Button
          primary
          disabled={modal.isBusy}>
          {modal.isBusy ? 'Submitting...' : 'Login'}
        </Button>
      </form>
    </Modal>
  )
}

ModalLogin.propTypes = {
  ...isModalPropTypes
}

export default isModal(ModalLogin)
