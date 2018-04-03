import { fromJS } from 'immutable'
import { uid } from './utils'
import * as ModalStates from './constants/ModalStates'
import * as ActionTypes from './constants/ActionTypes'

const __DEV__ = process.env.NODE_ENV === 'development'

export const createSignal = ({
  type,
  eventHandler,
  ...props
}) => {
  if (__DEV__) {
    if (!type) {
      throw new Error('Signal requires a `type`')
    }
  }

  return {
    type: ActionTypes.SIGNAL_CREATE,
    modal: fromJS({
      id: uid(10),
      type,
      eventHandlerId: eventHandler ? eventHandler.eventQueueId : null,
      state: ModalStates.CREATED,
      ...props
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

export const setModalState = (id, state) => ({
  type: ActionTypes.MODAL_SET_STATE,
  id: id,
  value: state
})

export const signalEvent = (id, type) => ({
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
