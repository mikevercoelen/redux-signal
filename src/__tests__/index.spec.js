import { withSignal, eventHandler, reducer } from '../index'

describe('index', () => {
  it('should export reducer', () => {
    expect(typeof reducer).toBe('function')
  })

  it('should export withSignal', () => {
    expect(typeof withSignal).toBe('function')
  })

  it('should export eventHandler', () => {
    expect(typeof eventHandler).toBe('function')
  })

  it('should export createContainer', () => {
    expect(typeof createContainer).toBe('function')
  })
})
