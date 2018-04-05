import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  createSignal,
  setModalState,
  signalEvent,
  showModal,
  hideModal
} from './actions'

export const withSignalPropTypes = {
  createSignal: PropTypes.func.isRequired,
  setModalState: PropTypes.func.isRequired,
  signalEvent: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  hideModal: PropTypes.func.isRequired
}

const withSignal = Component => {
  const mapDispatchToProps = {
    createSignal,
    setModalState,
    signalEvent,
    showModal,
    hideModal
  }

  return connect(
    null,
    mapDispatchToProps
  )(Component)
}

export default withSignal
