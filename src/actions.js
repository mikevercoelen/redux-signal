import { fromJS } from 'immutable'
import { uid } from './utils'
import * as ModalStates from './constants/ModalStates'
import * as ActionTypes from './constants/ActionTypes'

const __DEV__ = process.env.NODE_ENV === 'development'

export const createSignal = ({
  severity,
  type,
  title,
  message,
  isRequired = false,
  eventHandler,
  labels = {}
}) => {
  if (__DEV__) {
    if (!severity) {
      throw new Error('Signal requires a `severity`')
    }

    if (!type) {
      throw new Error('Signal requires a `type`')
    }
  }

  return {
    type: ActionTypes.SIGNAL_CREATE,
    modal: fromJS({
      id: uid(10),
      eventHandlerId: eventHandler ? eventHandler.eventQueueId : null,
      state: ModalStates.CREATED,
      severity,
      type,
      title,
      message,
      isRequired,
      labels
    })
  }
}

export const createModal = instanceId => ({
  instanceId,
  type: ActionTypes.MODAL_CREATE
})

export const destroyModal = instanceId => ({
  instanceId,
  type: ActionTypes.MODAL_DESTROY
})

export const showModal = (instanceId, data) => ({
  data,
  instanceId,
  type: ActionTypes.MODAL_SHOW
})

export const hideModal = instanceId => ({
  instanceId,
  type: ActionTypes.MODAL_HIDE
})

export const setModalBusy = (instanceId, isBusy) => ({
  instanceId,
  isBusy,
  type: ActionTypes.MODAL_SET_BUSY
})

export const destroySignal = id => ({
  type: ActionTypes.SIGNAL_DESTROY,
  id: id
})

export const setSignalState = (id, state) => ({
  type: ActionTypes.SIGNAL_SET_STATE,
  id: id,
  value: state
})

export const modalEvent = (id, type) => ({
  type: ActionTypes.SIGNAL_EVENT,
  id: id,
  event: {
    type,
    modalId: id
  }
})

export const eventQueueShift = eventQueueId => ({
  eventQueueId,
  type: ActionTypes.SIGNAL_EVENT_QUEUE_SHIFT
})

export const feedbackQueueShift = eventQueueId => ({
  eventQueueId,
  type: ActionTypes.SIGNAL_FEEDBACK_QUEUE_SHIFT
})

export const queueDestroy = eventQueueId => ({
  eventQueueId,
  type: ActionTypes.SIGNAL_QUEUE_DESTROY
})
