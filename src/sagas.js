import { put, takeEvery, all } from 'redux-saga/effects'

// ****************************************************************************
// ***** My limited fake generator function for "cheating" saga
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
// ****************************************************************************

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

// ****************************************************************************
// ***** incrementAsync generator function
function* incrementAsync() {
  yield delay(3000)
  yield put({ type: 'INCREMENT' })
}

// ***** incrementAsyncWithoutGenerator normal function for "cheating" saga
function incrementAsyncWithoutGenerator() {
  return generatorWithoutGenerator([delay(3000), put({ type: 'INCREMENT' })])
}
// ****************************************************************************

// ****************************************************************************
// ***** watchIncrementAsync generator function
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// ***** watchIncrementAsyncWithoutGenerator normal function for "cheating" saga
function watchIncrementAsyncWithoutGenerator() {
  return generatorWithoutGenerator([
    takeEvery('INCREMENT_ASYNC', incrementAsyncWithoutGenerator),
  ])
}
// ****************************************************************************

// ****************************************************************************
// ***** generator with iterator helper (inside saga)
function* incrementAsyncWithoutSaga(action) {
  yield delay(3000)
  yield action('INCREMENT')
}

export function incrementAsyncIterator(action) {
  const iterator = incrementAsyncWithoutSaga(action)
  const iteration = iterator.next()
  iteration.value.then(() => {
    iterator.next()
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

export default function* rootSaga() {
  yield all([watchIncrementAsync(), watchIncrementAsyncWithoutGenerator])
}
