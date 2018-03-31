import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSignal, setSignalState, modalEvent } from './actions'

export const withSignalPropTypes = {
  createSignal: PropTypes.func.isRequired,
  setSignalState: PropTypes.func.isRequired,
  modalEvent: PropTypes.func.isRequired
}

const withSignal = Component => {
  const mapDispatchToProps = {
    createSignal,
    setSignalState,
    modalEvent
  }

  Component.propTypes = {
    ...Component.propTypes,
    ...withSignalPropTypes
  }

  return connect(null, mapDispatchToProps)(Component)
}

export default withSignal
