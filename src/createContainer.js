import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map, List } from 'immutable'
import { getModal, getSignal } from './selectors'
import { getSignalInstanceId } from './utils'

import {
  destroySignal,
  modalEvent,
  setSignalState,
  feedbackQueueShift
} from './actions'

import * as ModalEvents from './constants/ModalEvents'
import * as ModalStates from './constants/ModalStates'

const createContainer = ({ Modal }) => {
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

      return (
        <div>
          {modals.map(modal => {
            const id = modal.get('id')
            const currentRawModal = rawModal.get(id)

            return (
              <Modal
                key={`signal-${id}`}
                onModalEvent={onModalEvent}
                toggle={() => onModalExited(id)}
                isFirst={currentRawModal.isFirst}
                isOpen={currentRawModal.isVisible}
                isRequired={modal.get('isRequired')}
                onClosed={() => onModalClose(id)}
                modal={modal}
              />
            )
          })}
        </div>
      )
    }
  }

  const mapStateToProps = state => {
    const modals = getSignal(state)

    const rawModal = Map(
      modals.map(modal => {
        return [
          modal.get('id'),
          getModal(getSignalInstanceId(modal.get('id')))(state)
        ]
      })
    )

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

        return [modal.get('id'), feedback]
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
        dispatch(modalEvent(modalId, ModalEvents.CLOSE))
        dispatch(setSignalState(modalId, ModalStates.DESTROYED))
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
            dispatch(modalEvent(modalId, ModalEvents.CLOSE))
            dispatch(setSignalState(modalId, ModalStates.DESTROYED))
          }
        })
      },

      onModalEvent: (modal, eventType) => {
        const modalId = modal.get('id')

        if (modal.get('eventHandlerId')) {
          dispatch(modalEvent(modalId, eventType))
        } else {
          // If we do not have an event handler, just close the modal on any button
          if (eventType.startsWith('BTN_')) {
            dispatch(setSignalState(modalId, ModalStates.DESTROYED))
          }
        }
      },

      updateModals: () => {
        modals.forEach(modal => {
          const modalId = modal.get('id')
          const { state } = rawModal.get(modalId)

          switch (state) {
            case ModalStates.CREATED:
              dispatch(setSignalState(modalId, ModalStates.VISIBLE))
              break
          }
        })
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    SignalContainer
  )
}

export default createContainer
