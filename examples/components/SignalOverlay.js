import React from 'react'
import PropTypes from 'prop-types'
import { Overlay } from 'react-modal-construction-kit'
import { connect } from 'react-redux'
import { getHasVisibleModal } from '../../src/index'

const SignalOverlay = ({ isVisible }) => (
  <Overlay isVisible={isVisible} />
)

SignalOverlay.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isVisible: getHasVisibleModal(state)
})

export default connect(
  mapStateToProps
)(SignalOverlay)
