import { fromJS, List, Map } from 'immutable'
import * as ActionTypes from './constants/ActionTypes'
import * as ModalStates from './constants/ModalStates'
import { getSignalInstanceId } from './utils'

const initialState = fromJS({
  signal: {
    data: {},
    eventQueue: {},
    feedbackQueue: {},
    order: []
  },
  modal: {}
})

const emptyModal = Map({
  isBusy: false,
  state: ModalStates.CREATED
})

function signalCreate (state, action) {
  const modalInstanceId = getSignalInstanceId(action.modal.get('id'))

  return state
    .setIn(['modal', modalInstanceId], emptyModal)
    .setIn(['signal', 'data', action.modal.get('id')], action.modal)
    .updateIn(['signal', 'order'], e => e.push(action.modal.get('id')))
    .update('signal', state => {
      const eventHandlerId = action.modal.get('eventHandlerId')

      if (!eventHandlerId) {
        return state
      }

      return state
        .setIn(['eventQueue', eventHandlerId], List())
        .setIn(['feedbackQueue', eventHandlerId], List())
    })
}

function signalDestroy (state, action) {
  const modalInstanceId = getSignalInstanceId(action.id)

  return state
    .deleteIn(['signal', 'data', action.id])
    .updateIn(['signal', 'order'], e => e.delete(e.indexOf(action.id)))
    .deleteIn(['modal', modalInstanceId])
}

function signalSetState (state, action) {
  const translatedAction = {
    instanceId: getSignalInstanceId(action.id),
    value: action.value
  }

  return state.setIn(
    ['modal', translatedAction.instanceId, 'state'],
    translatedAction.value
  )
}

function signalEvent (state, action) {
  const eventHandlerId = state.getIn([
    'signal',
    'data',
    action.id,
    'eventHandlerId'
  ])

  if (eventHandlerId !== null) {
    return state.updateIn(['signal', 'eventQueue', eventHandlerId], e =>
      e.push(action.event)
    )
  }

  return state
}

function signalEventQueueShift (state, action) {
  const event = state
    .getIn(['signal', 'eventQueue', action.eventQueueId])
    .first()

  // Move event from eventQueue to feedbackQueue
  return state
    .updateIn(['signal', 'eventQueue', action.eventQueueId], e => e.shift())
    .updateIn(['signal', 'feedbackQueue', action.eventQueueId], e =>
      e.push(event)
    )
}

export default function reduxSignalReducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.MODAL_CREATE:
    case ActionTypes.MODAL_HIDE:
      return state.setIn(['modal', action.instanceId], emptyModal)
    case ActionTypes.MODAL_DESTROY:
      return state.deleteIn(['modal', action.instanceId])
    case ActionTypes.MODAL_SHOW:
      return state.updateIn(['modal', action.instanceId], modal => {
        return modal
          .set('isBusy', false)
          .set('state', ModalStates.VISIBLE)
          .set('data', action.data)
      })
    case ActionTypes.MODAL_SET_BUSY:
      return state.setIn(['modal', action.instanceId, 'isBusy'], action.isBusy)
    case ActionTypes.SIGNAL_CREATE:
      return signalCreate(state, action)
    case ActionTypes.SIGNAL_DESTROY:
      return signalDestroy(state, action)
    case ActionTypes.SIGNAL_SET_STATE:
      return signalSetState(state, action)
    case ActionTypes.SIGNAL_EVENT:
      return signalEvent(state, action)
    case ActionTypes.SIGNAL_EVENT_QUEUE_SHIFT:
      return signalEventQueueShift(state, action)
    case ActionTypes.SIGNAL_FEEDBACK_QUEUE_SHIFT:
      return state.updateIn(
        ['signal', 'feedbackQueue', action.eventQueueId],
        e => e.shift()
      )
    case ActionTypes.SIGNAL_QUEUE_DESTROY:
      return state
        .deleteIn(['signal', 'eventQueue', action.eventQueueId])
        .deleteIn(['signal', 'feedbackQueue', action.eventQueueId])
    default:
      return state
  }
}
