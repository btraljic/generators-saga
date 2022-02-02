import React from 'react'

const Counter = ({
  value,
  onIncrement,
  onDecrement,
  onIncrementAsync,
  onIncrementAsyncWithoutGenerator,
  onincrementAsyncIterator,
  onincrementAsyncAwait,
}) => (
  <div>
    <button onClick={onincrementAsyncAwait}>
      Increment after 3 second (async/await)
    </button>
    <br />
    <button onClick={onincrementAsyncIterator}>
      Increment after 3 second (fake saga without generators)
    </button>
    <br />
    <button onClick={onIncrementAsync}>Increment after 3 second (saga)</button>
    <br />
    <button onClick={onIncrement}>Increment</button>
    <br />
    <button onClick={onDecrement}>Decrement</button>
    <hr />
    <div>Clicked: {value} times</div>
  </div>
)

export default Counter
