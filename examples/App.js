import React from 'react'
import Button from './components/Button/Button'

import {
  withSignal,
  withSignalPropTypes,
  SignalTypes,
  eventHandler
} from '../src/index'

const KillTheWorldEvent = eventHandler()

const App = ({ createSignal }) => {
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

  const onYes = () => {
    console.log('You killed everyone, you must be proud.')
  }

  const onNo = () => {
    console.log('That was close, we need more people like you.')
  }

  return (
    <div>
      <Button
        primary
        onClick={onBtnKillClick}>
        Kill the world
      </Button>
      <KillTheWorldEvent
        onNo={onNo}
        onYes={onYes} />
    </div>
  )
}

App.propTypes = {
  ...withSignalPropTypes
}

export default withSignal(App)
