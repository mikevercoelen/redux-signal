import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { uid } from './utils'

import { eventQueueShift, queueDestroy } from './actions'
import { getModalEvents, getPayloadByEventQueueId } from './selectors'
import * as ModalEvents from './constants/ModalEvents'

const eventHandler = () => {
  const eventQueueId = uid(10)

  const Component = class extends React.Component {
    static propTypes = {
      destroyQueue: PropTypes.func.isRequired,

      /* eslint-disable react/no-unused-prop-types */
      handledEvent: PropTypes.func.isRequired,
      onOk: PropTypes.func,
      onCancel: PropTypes.func,
      onYes: PropTypes.func,
      onNo: PropTypes.func,
      payload: PropTypes.object
      /* eslint-enable */
    }

    componentWillMount () {
      this.processEvents(this.props)
    }

    componentWillReceiveProps (nextProps) {
      this.processEvents(nextProps)
    }

    componentWillUnmount () {
      this.props.destroyQueue()
    }

    callHandler = handler => {
      const { payload } = this.props
      const args = payload ? payload.toJS() : {}

      if (handler) {
        handler(args)
      }
    }

    processEvents (props) {
      if (props.event) {
        const handlers = {
          [ModalEvents.BTN_OK]: props.onOk,
          [ModalEvents.BTN_CANCEL]: props.onCancel,
          [ModalEvents.BTN_YES]: props.onYes,
          [ModalEvents.BTN_NO]: props.onNo,
          [ModalEvents.CLOSE]: props.onClose
        }

        this.callHandler(handlers[props.event.type])
        props.handledEvent()
      }
    }

    render () {
      return null
    }
  }

  const mapStateToProps = state => {
    const events = getModalEvents(eventQueueId)(state)
    const event = events ? events.first() : null

    return {
      event,
      payload: getPayloadByEventQueueId(eventQueueId)(state)
    }
  }

  const mapDispatchToProps = dispatch => ({
    handledEvent: () => dispatch(eventQueueShift(eventQueueId)),
    destroyQueue: () => dispatch(queueDestroy(eventQueueId))
  })

  const Connected = connect(mapStateToProps, mapDispatchToProps)(Component)

  Connected.eventQueueId = eventQueueId

  return Connected
}

export default eventHandler
