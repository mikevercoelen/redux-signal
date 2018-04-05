import React from 'react'
import Button from './Button'

import {
  withSignal,
  withSignalPropTypes,
  SignalTypes,
  eventHandler
} from '../../src/index'

const KillTheWorldEvent = eventHandler('@app/kill-the-world')

const App = ({ createSignal, hideModal }) => {
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

  const onYes = (args) => {
    console.log(args)
    // window.alert('You just killed everyone, are you proud?')
    // hideModal(args.id)
  }

  const onNo = () => {
    // window.alert('Heh, thank god. We need more people like you.')
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
