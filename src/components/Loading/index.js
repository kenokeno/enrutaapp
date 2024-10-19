import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import colors from './../../constants/colors';

import { styles } from './styles'

export default function Loading(props) {
    const { isVisible, text } = props;
    return (
        <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,,0.5)"
            overLayBackgroundColor="transparent"
            style={styles.overlay}
        >
            <View style={styles.view}>
                <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </Overlay>
    )
}