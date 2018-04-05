import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { Modal } from 'react-modal-construction-kit'
import styles from './SignalContainer.scss'

import {
  createContainer,
  SignalEvents,
  SignalTypes
} from '../../src/index'

const SignalModal = ({
  event,
  destroy,
  close,
  modal
}) => {
  // modal contains all the properties you submit when calling `createSignal`, so you have all the freedom
  // to do whatever you want (title, message, isRequired) only isFirst and isVisible are required.

  return (
    <Modal
      contentClassName={styles.modalContent}
      dialogClassName={styles.modalDialog}
      isOpen={modal.isVisible}
      onClosed={close}
      onClickOutside={close}>
      <div className={styles.modalHeader}>
        {modal.title}
      </div>
      {modal.message && (
        <div className={styles.modalBody}>
          {modal.message}
        </div>
      )}
      <div className={styles.modalFooter}>
        {getFooter(modal, eventType => event(modal, eventType))}
      </div>
    </Modal>
  )
}

SignalModal.propTypes = {
  event: PropTypes.func,
  destroy: PropTypes.func,
  close: PropTypes.func,
  modal: PropTypes.object
}

function getModalLabel (modal, labelType, otherwise) {
  return (modal.labels && modal.labels[labelType]) || <span>{otherwise}</span>
}

function getFooter (modal, onModalEvent) {
  switch (modal.type) {
    case SignalTypes.YES_NO:
      return [
        <Button
          key='no'
          reject
          onClick={() => onModalEvent(SignalEvents.BTN_NO)}>
          {getModalLabel(modal, 'no', 'Nope')}
        </Button>,
        <Button
          key='yes'
          primary
          onClick={() => onModalEvent(SignalEvents.BTN_YES)}>
          {getModalLabel(modal, 'yes', 'Yep')}
        </Button>
      ]
    case SignalTypes.YES_NO_CANCEL:
      return [
        <Button
          key='cancel'
          onClick={() => onModalEvent(SignalEvents.BTN_CANCEL)}>
          {getModalLabel(modal, 'cancel', 'Cancel')}
        </Button>,
        <Button
          key='no'
          reject
          onClick={() => onModalEvent(SignalEvents.BTN_NO)}>
          {getModalLabel(modal, 'no', 'Nope')}
        </Button>,
        <Button
          key='yes'
          reject
          onClick={() => onModalEvent(SignalEvents.BTN_YES)}>
          {getModalLabel(modal, 'yes', 'Yep')}
        </Button>
      ]

    case SignalTypes.OK_CANCEL:
      return [
        <Button
          key='cancel'
          onClick={() => onModalEvent(SignalEvents.BTN_CANCEL)}>
          {getModalLabel(modal, 'cancel', 'Cancel')}
        </Button>,
        <Button
          key='ok'
          primary
          onClick={() => onModalEvent(SignalEvents.BTN_OK)}>
          {getModalLabel(modal, 'ok', 'Ok')}
        </Button>
      ]
    case SignalTypes.OK:
      return (
        <Button
          primary
          onClick={() => onModalEvent(SignalEvents.BTN_OK)}>
          {getModalLabel(modal, 'ok', 'Ok')}
        </Button>
      )
  }

  return null
}

export default createContainer(SignalModal)
