import React from 'react'
import PropTypes from 'prop-types'
import { Overlay } from 'react-modal-construction-kit'
import { connect } from 'react-redux'
import { getHasVisibleModal } from '../../src/index'

const SignalOverlayContainer = ({ isVisible }) => (
  <Overlay isVisible={isVisible} opacity={0.85} />
)

SignalOverlayContainer.propTypes = {
  isVisible: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isVisible: getHasVisibleModal(state)
})

export default connect(
  mapStateToProps
)(SignalOverlayContainer)
