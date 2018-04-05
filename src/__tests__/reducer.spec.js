import * as matchers from 'jest-immutable-matchers'
import reducer, { initialState } from '../reducer'
import { createSignal } from '../actions'
import * as SignalTypes from '../constants/SignalTypes'

describe('reducer', () => {
  beforeEach(function () {
    jest.addMatchers(matchers)
  })

  it('should return the initial state', () => {
    const result = reducer(undefined, {})
    expect(result.equals(initialState)).toBe(true)
    expect(result).toBeImmutable()
  })

  it('should handle createSignal', () => {
    const createSignalData = {
      type: SignalTypes.OK,
      title: 'test',
      message: 'test'
    }

    const result = reducer(initialState, createSignal(createSignalData))
    expect(result).toBeImmutable()
    const resultJs = result.toJS()
    expect(resultJs).toHaveProperty('signal')
    expect(resultJs).toHaveProperty('signal.data')
    expect(resultJs).toHaveProperty('signal.eventQueue')
    expect(resultJs).toHaveProperty('signal.feedbackQueue')
    expect(resultJs).toHaveProperty('modals')
  })
})
