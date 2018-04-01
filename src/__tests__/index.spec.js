import {
  showModal,
  getHasVisibleModal,
  withSignal,
  withSignalPropTypes,
  withModal,
  withModalPropTypes,
  eventHandler,
  reducer,
  createContainer,
  ModalSeverity,
  ModalStates,
  ModalEvents,
  ModalTypes
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

  it('should export withModal', () => {
    expect(typeof withModal).toBe('function')
  })

  it('should export withModalPropTypes', () => {
    expect(typeof withModalPropTypes).toBe('object')
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

  it('should export ModalSeverity', () => {
    expect(typeof ModalSeverity).toBe('object')
  })

  it('should export ModalStates', () => {
    expect(typeof ModalStates).toBe('object')
  })

  it('should export ModalTypes', () => {
    expect(typeof ModalTypes).toBe('object')
  })

  it('should export ModalEvents', () => {
    expect(typeof ModalEvents).toBe('object')
  })

  it('should export showModal', () => {
    expect(typeof showModal).toBe('function')
  })
})
