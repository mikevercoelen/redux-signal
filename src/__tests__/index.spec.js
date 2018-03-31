import {
  withSignal,
  eventHandler,
  reducer,
  createContainer,
  ModalSeverity,
  ModalStates,
  ModalEvents,
  ModalTypes
} from '../index'

describe('index', () => {
  it('should export withSignal', () => {
    expect(typeof withSignal).toBe('function')
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
})
