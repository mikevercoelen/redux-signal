import { reduxSignal } from '../index'

describe('index', () => {
  it('should export reduxSignal', () => {
    expect(typeof reduxSignal).toBe('function')
  })
})
