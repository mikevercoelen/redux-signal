import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { getModal, getSignal } from './selectors'
import { getSignalModalId } from './utils'

import {
  destroySignal,
  signalEvent,
  setModalState,
  feedbackQueueShift
} from './actions'

import * as ModalEvents from './constants/SignalEvents'
import * as ModalStates from './constants/ModalStates'

const createContainer = Modal => {
  class SignalContainer extends React.Component {
    static propTypes = {
      updateModals: PropTypes.func.isRequired,
      handleEventFeedback: PropTypes.func.isRequired,
      onModalExited: PropTypes.func.isRequired,
      onModalClose: PropTypes.func.isRequired,
      onModalEvent: PropTypes.func.isRequired,
      modals: PropTypes.instanceOf(List),
      rawModal: PropTypes.instanceOf(Map)
    }

    componentWillMount () {
      this.props.updateModals()
    }

    componentWillReceiveProps (nextProps) {
      nextProps.updateModals()
      nextProps.handleEventFeedback()
    }

    render () {
      const {
        modals,
        rawModal,
        onModalExited,
        onModalClose,
        onModalEvent
      } = this.props

      return modals.map(modal => {
        const id = modal.get('id')
        const currentRawModal = rawModal.get(id)

        return (
          <Modal
            key={`signal-${id}`}
            event={onModalEvent}
            destroy={() => onModalExited(id)}
            close={() => onModalClose(id)}
            modal={{
              ...modal.toJS(),
              ...currentRawModal
            }}
          />
        )
      })
    }
  }

  const mapStateToProps = state => {
    const modals = getSignal(state)

    const rawModal = Map(modals.map(modal => [
      modal.get('id'),
      getModal(getSignalModalId(modal.get('id')))(state)
    ]))

    const eventFeedback = Map(
      modals.map(modal => {
        let feedback = null

        const eventQueueId = modal.get('eventHandlerId')
        if (eventQueueId) {
          const events = state.signal.getIn([
            'signals',
            'feedbackQueue',
            eventQueueId
          ])

          if (events && events.size > 0) {
            feedback = events.first()
          }
        }

        return [
          modal.get('id'),
          feedback
        ]
      })
    )

    return {
      eventFeedback,
      modals,
      rawModal
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      dispatch,

      onModalExited: modalId => {
        dispatch(destroySignal(modalId))
      },

      onModalClose: modalId => {
        dispatch(signalEvent(modalId, ModalEvents.CLOSE))
        dispatch(setModalState(modalId, ModalStates.DESTROYED))
      }
    }
  }

  const mergeProps = (stateProps, dispatchProps) => {
    const { eventFeedback, modals, rawModal } = stateProps
    const { dispatch } = dispatchProps

    return {
      ...stateProps,
      ...dispatchProps,

      handleEventFeedback: () => {
        modals.forEach(modal => {
          const event = eventFeedback.get(modal.get('id'))

          if (!event) {
            return
          }

          const modalId = modal.get('id')

          dispatch(feedbackQueueShift(modal.get('eventHandlerId')))

          // By default, BTN_* events trigger modal close
          if (event.type.startsWith('BTN_')) {
            dispatch(signalEvent(modalId, ModalEvents.CLOSE))
            dispatch(setModalState(modalId, ModalStates.DESTROYED))
          }
        })
      },

      onModalEvent: (modal, eventType) => {
        const modalId = modal.id

        if (modal.eventHandlerId) {
          dispatch(signalEvent(modalId, eventType))
        } else {
          // If we do not have an event handler, just close the modal on any button
          if (eventType.startsWith('BTN_')) {
            dispatch(setModalState(modalId, ModalStates.DESTROYED))
          }
        }
      },

      updateModals: () => {
        modals.forEach(modal => {
          const modalId = modal.get('id')
          const state = rawModal.getIn([modalId]).state

          switch (state) {
            case ModalStates.CREATED:
              dispatch(setModalState(modalId, ModalStates.VISIBLE))
              break
          }
        })
      }
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(SignalContainer)
}

export default createContainer
