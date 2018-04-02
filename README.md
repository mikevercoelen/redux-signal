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

*NOTE:* Please make sure it's mounted on your rootReducer as `signal`, we are working on making this flexible in the future.

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

const getFooterModal = (modal, onModalEvent) => {
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
      footer={getFooterModal(modal, eventType => event(modal, eventType))}
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
