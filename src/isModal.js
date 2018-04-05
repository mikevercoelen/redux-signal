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
  close: PropTypes.func.isRequired,
  setBusy: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired
}

const isModal = WrappedComponent => {
  const Component = class extends React.Component {
    static propTypes = {
      ...isModalPropTypes,
      create: PropTypes.func.isRequired,
      destroy: PropTypes.func.isRequired
    }

    componentWillMount () {
      this.props.create()
    }

    componentWillUnmount () {
      this.props.destroy()
    }

    render () {
      const {
        instanceId,
        close,
        setBusy,
        modal
      } = this.props

      const componentProps = {
        instanceId,
        close,
        setBusy,
        modal
      }

      return <WrappedComponent {...componentProps} />
    }
  }

  const mapStateToProps = (state, { instanceId }) => ({
    modal: getModal(instanceId)(state)
  })

  const mapDispatchToProps = (dispatch, { instanceId }) => ({
    create: () => dispatch(createModal(instanceId)),
    destroy: () => dispatch(destroyModal(instanceId)),
    close: () => dispatch(hideModal(instanceId)),
    setBusy: isBusy => dispatch(setModalBusy(instanceId, isBusy))
  })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component)
}

export default isModal
