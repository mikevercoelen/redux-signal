import React from 'react'
import Button from '../Button/Button'
import Logo from '../Logo/Logo'
import ModalLogin from '../ModalLogin/ModalLogin'
import styles from './App.scss'

import {
  withSignal,
  withSignalPropTypes,
  SignalTypes,
  eventHandler
} from '../../../src/index'

const modalLoginId = '@app/modal-login'
const KillTheWorldEvent = eventHandler()

const App = ({ createSignal, showModal }) => {
  const onBtnKillClick = () => {
    createSignal({
      type: SignalTypes.YES_NO,
      title: 'Are you sure?',
      message: 'You are about to kill the world, are you sure?',
      labels: {
        yes: 'Yes, kill it!',
        no: 'No, there is still hope'
      },
      eventHandler: KillTheWorldEvent
    })
  }

  const onBtnErrorClick = () => {
    createSignal({
      type: SignalTypes.OK,
      title: 'Oeps',
      message: 'Something has gone wrong'
    })
  }

  const onBtnLoginClick = () => {
    showModal(modalLoginId)
  }

  const onYes = () => {
    console.log('You killed everyone, you must be proud.')
  }

  const onNo = () => {
    console.log('That was close, we need more people like you.')
  }

  return (
    <div>
      <div className={styles.header}>
        <Logo />
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <h1>
            Signals
          </h1>
          <p>
            Quick popups that require no custom logic (confirms, notifications etc.)
          </p>
          <div className={styles.subSection}>
            <p>
              <code>SignalTypes.YES_NO</code>
            </p>
            <Button
              primary
              onClick={onBtnKillClick}>
              Kill the world
            </Button>
          </div>
          <div className={styles.subSection}>
            <p>
              <code>SignalTypes.OK</code>
            </p>
            <Button
              reject
              onClick={onBtnErrorClick}>
              Display error
            </Button>
          </div>
        </div>
        <div className={styles.section}>
          <h1>
            Modal
          </h1>
          <p>
            Fully customizable modals
          </p>
          <Button
            primary
            onClick={onBtnLoginClick}>
            Login
          </Button>
        </div>
        <KillTheWorldEvent
          onNo={onNo}
          onYes={onYes} />
        <ModalLogin instanceId={modalLoginId} />
      </div>
    </div>
  )
}

App.propTypes = {
  ...withSignalPropTypes
}

export default withSignal(App)
