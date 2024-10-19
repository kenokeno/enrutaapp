import React from 'react';
import { Fab } from 'native-base'
import { PlusIcon } from './../Icons';
import colors from './../../constants/colors';

export default function PlusFab(props) {
    return (
        <Fab
            right={2}
            top={100}
            //placement='top-right'
            size={6}
            borderWidth={1}
            borderColor={colors.PRIMARY_COLOR}
            backgroundColor={colors.BACKGROUND_COLOR}
            paddingRight={8}
            icon={<PlusIcon width="1112" heigth="560" />}
            onPress={props.action}
        />
    )
}