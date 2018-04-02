import * as matchers from 'jest-immutable-matchers'
import reducer, { initialState } from '../reducer'
import { createSignal } from '../actions'
import * as ModalSeverity from '../constants/SignalSeverity'
import * as ModalTypes from '../constants/SignalTypes'

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
      severity: ModalSeverity.INFO,
      type: ModalTypes.OK,
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
    expect(resultJs).toHaveProperty('modal')
  })
})
