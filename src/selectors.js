import { createSelector, createSelectorCreator } from 'reselect'
import lrumemoize from 'lru-memoize'

import * as ModalStates from './constants/ModalStates'

// 8 seems to be a reasonable default, increase if you
// have more modals within a container
const customSelectorCreator = createSelectorCreator(
  (s, n) => lrumemoize(n)(s),
  8
)

export const getModal = customSelectorCreator(
  instanceId => instanceId,
  instanceId =>
    createSelector(
      state => state.signal.get('modal'),
      state => {
        const modalState = state.get(instanceId)

        if (!modalState) {
          return {
            data: null,
            isBusy: false,
            isFirst: false,
            isVisible: false,
            state: null
          }
        }

        let firstVisibleModal = null
        for (const [key, value] of state.entries()) {
          if (value.get('state') === ModalStates.VISIBLE) {
            firstVisibleModal = key
            break
          }
        }

        return {
          instanceId,
          data: modalState.get('data'),
          isBusy: modalState.get('isBusy'),
          isFirst: firstVisibleModal === instanceId,
          isVisible: modalState.get('state') === ModalStates.VISIBLE,
          state: modalState.get('state')
        }
      }
    )
)

export const getHasVisibleModal = createSelector(
  state => state.signal.get('modal'),
  modal => {
    for (const value of modal.valueSeq()) {
      if (value.get('state') === ModalStates.VISIBLE) {
        return true
      }
    }

    return false
  }
)

export const getSignal = createSelector(
  state => state.signal.get('signal'),
  signal => signal.get('order').map(id => signal.getIn(['data', id]))
)

export const getModalEvents = createSelector(
  eventQueueId => eventQueueId,
  eventQueueId =>
    createSelector(
      state => state.signal.getIn(['signal', 'eventQueue']),
      eventQueue => eventQueue.get(eventQueueId)
    )
)

export const getModalByEventQueueId = createSelector(
  eventQueueId => eventQueueId,
  eventQueueId =>
    createSelector(
      state => state.signal.getIn(['signal', 'data']),
      data => {
        if (!data) {
          return null
        }

        for (const value of data.valueSeq()) {
          if (value.get('eventHandlerId') === eventQueueId) {
            return value
          }
        }

        return null
      }
    )
)
