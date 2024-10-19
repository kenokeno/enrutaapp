import React from 'react';
import { Stack, Input, Icon } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './style';
import colors from './../../constants/colors';

export default function SearchBar(props) {
    return (
        <Stack space={2} p={4} w="100%">
            <Input
                defaultValue=''
                autoCapitalize='none'
                autoCorrect={false}
                variant="rounded"
                backgroundColor={colors.BACKGROUND_INPUT_COLOR}
                borderColor={colors.PRIMARY_COLOR}
                _focus={{
                    borderColor: colors.SECONDARY_COLOR,
                }}
                InputRightElement={<Icon size='sm' mr={6} size={6} color="gray.400" as={<FontAwesome name={props.icon ? props.icon : 'search'} size={60} />} />}
                onChangeText={(e) => props.handleSearch(e)}
                status='info'
                placeholder='Buscar'
            />
        </Stack>
    )
}