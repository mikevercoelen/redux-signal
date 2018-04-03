[<img src="https://raw.githubusercontent.com/mikevercoelen/redux-signal/master/logo.png" class="logo" height="100" width="165"/>](http://mikevercoelen.github.io/redux-signal/)

# Redux Signal

Flexible, scalable library for creating modals with React and Redux.

* `signals`: small, quick notification modals (confirmations, alerts etc.)
* `modals`: fully customizable modals for your forms etc.

```js
import React from 'react'
import { withSignal, SignalTypes } from 'redux-signal'

// As an example, this app has a ProfileView. The user can upload an avatar,
// and if the avatar file is too large, we want to display a notification popup

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

## Table of Contents

- [Installation](#installation)
- [Introduction](#introduction)
  - [The problem](#the-problem)
- [Setup](#setup)
  - [Reducer](#reducer-setup)
  - [SignalContainer](#signalcontainer-setup)
- [API](#api)
  - [`withSignal`](#withsignalcomponent)
  - [`createSignal`](#createsignaloptions)
  - [`isModal`](#ismodalcomponent)
  - [`showModal`](#showmodal)
  - [`SignalTypes`](#signaltypes)
  - [`SignalEvents`](#signalevents)

## Installation

`npm install redux-signal --save`

## Introduction

### The problem
It's hard to setup a flexible and scalable modal solution with Redux and React. Most of our apps need simple modals such as confirms, warnings etc. but we also need modals for more advanced stuff like forms.

Besides that, we want our Redux state to be serializable (so no fn's in our state etc.) and clean.

Redux-signal is a flexible library for exactly that. Redux-signal does not contain any Modal components with styling etc. It's only a solution purely for redux and your modal states, data, actions etc.

## Setup

### Reducer setup

The first thing you need to do is to include the signal reducer in your rootReducer. Please make sure it's mounted on your rootReducer as `signal`, we are working on making this flexible in the future.

`reducers/index.js`

```js
import { combineReducers } from 'redux'
import { reducer as signalReducer } from 'redux-signal'

export const rootReducer = combineReducers({
  signal: signalReducer
})
```

### SignalContainer setup

The second thing you need to do, is to setup the `SignalContainer`. Redux-signal is not responsible for rendering your Modal styles, you need your own Modal component. The `SignalContainer` is the link between signal and your modal component etc.

```js
import React from 'react'
import PropTypes from 'prop-types'

import {
  createContainer,
  SignalEvents,
  SignalTypes
} from 'redux-signal'

import Modal from 'components/Modal'
import Button from 'components/Button'

const Modal = ({
  event,
  destroy,
  close,
  modal
}) => {
  // modal contains all the properties you submit when calling `createSignal`, so you have all the freedom
  // to do whatever you want (title, message, isRequired) only isFirst and isVisible are required.

  return (
    <Modal
      body={modal.message}
      centered
      header={modal.title}
      close={close}
      onExited={destroy}
      footer={getFooter(modal, eventType => event(modal, eventType))}
      isFirst={modal.isFirst}
      isOpen={modal.isVisible} />
  )
}

Modal.propTypes = {
  event: PropTypes.func,
  destroy: PropTypes.func,
  close: PropTypes.func,
  modal: PropTypes.object
}

function getModalLabel (modal, labelType, otherwise) {
  return modal.labels[labelType] || <span>{otherwise}</span>
}

function getFooter (modal, onModalEvent) {
  switch (modal.type) {
    case SignalTypes.YES_NO:
      return [
        <Button
          key='no'
          onClick={() => onModalEvent(SignalEvents.BTN_NO)}>
          {getModalLabel(modal, 'no', 'Nope')}
        </Button>,
        <Button
          key='yes'
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

export default createContainer(Modal)
```

## API

### withSignal(Component)

If you want to show a signal or a modal, you need to wrap the component with the `withSignal` hoc. which gives the component the following props:

* `createSignal`: creates a signal modal see [`createSignal`](#createsignaloptions).
* `showModal(instanceId)`: show a modal
* `hideModal(instanceId`: hide a model

#### Low-level
* `setModalState`: sets a modal state
* `signalEvent`: dispatch a signal event

### createSignal(options)

Creates and shows a signal.

#### options
* `type`: (required) [`SignalTypes`](#signaltypes)
* `eventHandler`: (optional) insert an event handler
* `...props`: (optional) all the extra props you pass in `createSignal` can be used in your `SignalContainer` to display a modal, a common situation would be to add `isRequired` and you handle this value in your `SignalContainer` to toggle your modal close button. Other props: title, message etc.

### isModal(Component)

Use `isModal` to create a modal, so remember the difference between a signal and a modal: a signal is simple, less flexible, a modal gives you full control. `isModal` is a hoc that gives the component the following props:
* `instanceId`: string
* `hide`: function that hides the modal
* `destroy`: function that destroys the modal
* `setBusy`: function to set busy state of the modal (can be used for showing loaders etc.)
* `modal`: modal object

### SignalEvents

An enum of Signal of events:

You use this in your `SignalContainer` to render different buttons in your footer for example.

* `CLOSE`: close event
* `BTN_CANCEL`: clicked button cancel
* `BTN_OK`: clicked button ok
* `BTN_YES`: clicked button yes
* `BTN_NO`: clicked button no

### SignalTypes

An enum of Signal types, you need a type when calling `createSignal`, use a SignalType here

* `OK`: modal with ok button
* `OK_CANCEL`: modal with ok + cancel button
* `YES_NO`: modal with yes + no button
* `YES_NO_CANCEL`: modal with yes no cancel button

### ModalStates

An enum of Signal types, you need a type when calling `createSignal`, use a SignalType here

* `CREATED`: the modal is initialized (in the dom) but not visible
* `VISIBLE`: is visible
* `DESTROYED`: destroyed, modal is removed from the dom
