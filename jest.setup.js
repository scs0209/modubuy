import '@testing-library/jest-dom'
import 'jest-canvas-mock'
import 'whatwg-fetch'
import * as ResizeObserverModule from 'resize-observer-polyfill'

global.ResizeObserver = ResizeObserverModule.default
