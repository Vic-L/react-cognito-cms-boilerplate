import { call, takeLatest } from 'redux-saga/effects'

export function* alertsSaga() {
  yield takeLatest('ALERT_SHOW', showAlert)
}

export function* showAlert({ alert }) {
  yield({type: 'ALERT_SHOW', alert})
}