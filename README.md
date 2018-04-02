[<img src="https://raw.githubusercontent.com/mikevercoelen/redux-signal/master/logo.png" class="logo" height="100" width="165"/>](http://mikevercoelen.github.io/redux-signal/)

# redux-signal

---

[![NPM Version](https://img.shields.io/npm/v/redux-signal.svg?style=flat)](https://www.npmjs.com/package/redux-signal)

## Installation

`npm install redux-signal --save`

## Introduction
It's hard to setup a flexible and scalable modal solution with Redux and React.
Most of our apps need simple modals such as confirms, warnings etc. but we also need modals for more advanced stuff like forms.

Besides that, we want our Redux state to be serializable (so no fn's in our state etc.) and clean.

Redux-signal is a flexible library for exactly that. Redux-signal does not contain any Modal components with styling etc.
It's only a solution purely for redux and your modal states, data, actions etc.

## Getting started

### Setting up your reducer

The first thing you need to do is to include the signal reducer in your rootReducer.

Please make sure it's mounted on your rootReducer as `signal`, we are working on making this flexible in the future.

`reducers/index.js`

```js
import { combineReducers } from 'redux'
import { reducer as signalReducer } from 'redux-signal'

export const rootReducer = combineReducers({
  signal: signalReducer
})
```

### Setting up the SignalContainer

The second thing you need to do, is to setup the `SignalContainer`.
Redux-signal is not responsible for rendering your Modal styles, you need your own Modal component.
The `SignalContainer` is the link between signal and your modal component etc.

Here is an example: 

```js
import React from 'react'
import PropTypes from 'prop-types'

import {
  createContainer,
  ModalEvents,
  ModalTypes
} from 'redux-signal'

import Modal from 'components/Modal'
import Button from 'components/Button'

const getModalLabel = (modal, labelType, otherwise) => {
  return modal.labels[labelType] || <span>{otherwise}</span>
}

const getFooter = (modal, onModalEvent) => {
  switch (modal.type) {
    case ModalTypes.YES_NO:
      return [
        <Button
          key='no'
          onClick={() => onModalEvent(ModalEvents.BTN_NO)}>
          {getModalLabel(modal, 'no', 'Nope')}
        </Button>,
        <Button
          key='yes'
          onClick={() => onModalEvent(ModalEvents.BTN_YES)}>
          {getModalLabel(modal, 'yes', 'Yep')}
        </Button>
      ]
    case ModalTypes.YES_NO_CANCEL:
      return [
        <Button
          key='cancel'
          onClick={() => onModalEvent(ModalEvents.BTN_CANCEL)}>
          {getModalLabel(modal, 'cancel', 'Cancel')}
        </Button>,
        <Button
          key='no'
          reject
          onClick={() => onModalEvent(ModalEvents.BTN_NO)}>
          {getModalLabel(modal, 'no', 'Nope')}
        </Button>,
        <Button
          key='yes'
          reject
          onClick={() => onModalEvent(ModalEvents.BTN_YES)}>
          {getModalLabel(modal, 'yes', 'Yep')}
        </Button>
      ]

    case ModalTypes.OK_CANCEL:
      return [
        <Button
          key='cancel'
          onClick={() => onModalEvent(ModalEvents.BTN_CANCEL)}>
          {getModalLabel(modal, 'cancel', 'Cancel')}
        </Button>,
        <Button
          key='ok'
          primary
          onClick={() => onModalEvent(ModalEvents.BTN_OK)}>
          {getModalLabel(modal, 'ok', 'Ok')}
        </Button>
      ]
    case ModalTypes.OK:
      return (
        <Button
          primary
          onClick={() => onModalEvent(ModalEvents.BTN_OK)}>
          {getModalLabel(modal, 'ok', 'Ok')}
        </Button>
      )
  }

  return null
}

const Modal = ({
  event,
  exit,
  close,
  modal
}) => {
  return (
    <Modal
      body={modal.message}
      centered
      header={modal.title}
      toggle={exit}
      isRequired={modal.isRequired}
      onClosed={close}
      footer={getFooter(modal, eventType => event(modal, eventType))}
      isFirst={modal.isFirst}
      isOpen={modal.isVisible} />
  )
}

Modal.propTypes = {
  event: PropTypes.func,
  exit: PropTypes.func,
  close: PropTypes.func,
  modal: PropTypes.object
}

export default createContainer({
  Modal
})
```

As you can see in the example above, we have a `createContainer` high order component which creates the signal container.

The Modal gets 4 params:

`event`: dispatch a signal event (BTN_OK, BTN_YES) etc.
`close`: closes the modal, this should be linked to your modal close button
`exit`:  destroys the modal, this should be linked to your onExited function (if possible, callback after show transition)
`modal`: an object with the modal data dispatched from the action (`message`, `title`, `isRequired`, `isFirst`, `isVisible`)

---

At this point you've setup the basics of signal. You can now create signals.

## Signals

Signals are simple modals, like confirms or notifications.

### Signal types

There are 4 signal types:

* `OK`: only a signal with an OK button
* `OK_CANCEL`: ok and cancel button
* `YES_NO`: yes and no button
* `YES_NO_CANCEL`: yes, no and cancel button

The `SignalContainer` is fully responsible for rendering these buttons, see the first code example @ `getFooter`.

### Creating signals

To create a signal use `withSignal` in the component where you want to show a signal. A good example would be
if you had a profile page, a user can upload an image but there is a max file size warning. You can show this
notification by using `createSignal` like so:

```js
import React from 'react'
import { withSignal, SignalTypes } from 'redux-signal'

class ProfileView extends React.Component {
  onAvatarFileUpload = () => {
    if (avatarIsToLarge) { // use your imagination...
      this.props.createSignal({
        type: SignalTypes.OK,
        title: 'Warning',
        message: 'The file was too large'
      })
    }
  }

  render () {
    // ...
  }
}

export default withSignal(ProfileView)
```
