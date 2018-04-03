import {
  showModal,
  getHasVisibleModal,
  withSignal,
  withSignalPropTypes,
  isModal,
  isModalPropTypes,
  eventHandler,
  reducer,
  createContainer,
  ModalStates,
  SignalEvents,
  SignalTypes
} from '../index'

describe('index', () => {
  it('should export getHasVisibleModal', () => {
    expect(typeof getHasVisibleModal).toBe('function')
  })

  it('should export withSignal', () => {
    expect(typeof withSignal).toBe('function')
  })

  it('should export withSignalPropTypes', () => {
    expect(typeof withSignalPropTypes).toBe('object')
  })

  it('should export isModal', () => {
    expect(typeof isModal).toBe('function')
  })

  it('should export isModalPropTypes', () => {
    expect(typeof isModalPropTypes).toBe('object')
  })

  it('should export eventHandler', () => {
    expect(typeof eventHandler).toBe('function')
  })

  it('should export reducer', () => {
    expect(typeof reducer).toBe('function')
  })

  it('should export createContainer', () => {
    expect(typeof createContainer).toBe('function')
  })

  it('should export ModalStates', () => {
    expect(typeof ModalStates).toBe('object')
  })

  it('should export SignalEvents', () => {
    expect(typeof SignalEvents).toBe('object')
  })

  it('should export SignalTypes', () => {
    expect(typeof SignalTypes).toBe('object')
  })

  it('should export showModal', () => {
    expect(typeof showModal).toBe('function')
  })
})
