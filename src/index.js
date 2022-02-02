import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css'

import reportWebVitals from './reportWebVitals'
import rootSaga, { incrementAsyncIterator, incrementAsyncAwait } from './sagas'
import Counter from './Counter'
import reducer from './reducers'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const action = (type) => store.dispatch({ type })

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Counter
        value={store.getState()}
        onIncrement={() => action('INCREMENT')}
        onDecrement={() => action('DECREMENT')}
        onIncrementAsync={() => action('INCREMENT_ASYNC')}
        onincrementAsyncIterator={() => incrementAsyncIterator(action)}
        onincrementAsyncAwait={() => incrementAsyncAwait(action)}
      />
    </React.StrictMode>,

    document.getElementById('root')
  )
}

render()
store.subscribe(render)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
