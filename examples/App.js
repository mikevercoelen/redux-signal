import React from 'react'
import Button from './components/Button/Button'
import ModalLogin from './components/ModalLogin/ModalLogin'

import {
  withSignal,
  withSignalPropTypes,
  SignalTypes,
  eventHandler
} from '../src/index'

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
      <div>
        <h1>
          Signals
        </h1>
        <Button
          primary
          onClick={onBtnKillClick}>
          Kill the world
        </Button>
      </div>
      <div>
        <h1>
          Modal
        </h1>
        <Button
          primary
          onClick={onBtnLoginClick}>
          Login
        </Button>
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
