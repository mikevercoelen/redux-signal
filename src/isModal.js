import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  createModal,
  destroyModal,
  hideModal,
  setModalBusy
} from './actions'

import { getModal } from './selectors'

export const isModalPropTypes = {
  instanceId: PropTypes.string.isRequired,
  create: PropTypes.func.isRequired,
  destroy: PropTypes.func.isRequired,
  hide: PropTypes.func.isRequired,
  setBusy: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired
}

const isModal = WrappedComponent => {
  const Component = class extends React.Component {
    static propTypes = isModalPropTypes

    componentWillMount () {
      this.props.create()
    }

    componentWillUnmount () {
      this.props.destroy()
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state, { instanceId }) => ({
    modal: getModal(instanceId)(state)
  })

  const mapDispatchToProps = (dispatch, { instanceId }) => ({
    create: () => dispatch(createModal(instanceId)),
    destroy: () => dispatch(destroyModal(instanceId)),
    hide: () => dispatch(hideModal(instanceId)),
    setBusy: isBusy => dispatch(setModalBusy(instanceId, isBusy))
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
}

export default isModal
