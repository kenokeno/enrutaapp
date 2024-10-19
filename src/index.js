import React from 'react';
import { NativeBaseProvider } from 'native-base';

import AppStack from './routes';
import MyHeader from './components/Header';

export default () => {
    return (
        <NativeBaseProvider>
            <MyHeader imageUri={'Hola'} />
            <AppStack />
        </NativeBaseProvider>
    );
};