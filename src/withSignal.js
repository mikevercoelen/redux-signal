import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSignal, setSignalState, modalEvent } from './actions'

const withSignal = Component => {
  const mapDispatchToProps = {
    createSignal,
    setSignalState,
    modalEvent
  }

  return connect(null, mapDispatchToProps)(Component)
}

withSignal.propTypes = {
  createSignal: PropTypes.func.isRequired,
  setSignalState: PropTypes.func.isRequired,
  modalEvent: PropTypes.func.isRequired
}

export default withSignal
