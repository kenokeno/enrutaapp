import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import sagas from './../sagas'
import reducers from './../reducers'

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    return {
        ...createStore(reducers, applyMiddleware(sagaMiddleware)),
        runSaga: sagaMiddleware.run(sagas)
    }
}