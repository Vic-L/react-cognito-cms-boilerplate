import { all } from 'redux-saga/effects'

import { alertsSaga } from './alerts'

export default function* rootSaga() {
  yield all([
    alertsSaga(),
  ])
}