import { put, takeEvery, all } from 'redux-saga/effects'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// ****************************************************************************
// ***** real saga
function* incrementAsync() {
  yield delay(3000)
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export default function* rootSaga() {
  yield all([watchIncrementAsync()])
}
// ****************************************************************************

// ****************************************************************************
// ***** fake saga without generators
// ***** with my limited fake generator function - generatorWithoutGenerator
// ***** with iterator helpers (inside saga, limited without effects)
function generatorWithoutGenerator(yields) {
  let index = 0

  return {
    next: function () {
      const ret = {
        value: yields[index],
        done: index + 1 === yields.length,
      }
      ++index
      return ret
    },
  }
}

function incrementAsyncWithoutSaga(action) {
  return generatorWithoutGenerator([delay(3000), action])
}

export function incrementAsyncIterator(action) {
  const iterator = incrementAsyncWithoutSaga(action)
  const iteration = iterator.next()
  iteration.value.then(() => {
    iterator.next().value('INCREMENT')
  })
}
// ****************************************************************************

// ****************************************************************************
// ***** async/await
export async function incrementAsyncAwait(action) {
  await delay(3000)
  action('INCREMENT')
}
// ****************************************************************************
