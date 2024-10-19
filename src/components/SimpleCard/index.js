import React, { useState } from 'react';
import { Container, Text, Heading, Center, Stack, HStack, Box } from 'native-base';
import IconMaterialcommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
//import { TrashIcon, PecilIcon } from './../Icons';
import colors from './../../constants/colors';
import { styles } from './styles';

export default (props) => {
    if (!props.nombre)
        return <Text style={styles.generalFontSize}>Información no valida!</Text>

    return (
        <Center>
            <Box
                bg={colors.TERTIARY_COLOR}
                shadow={2}
                rounded="lg"
                width="100%"
                p="2"
                direction="row"
            >
                <Stack space={2}>
                    <Heading size={["md", "lg", "md"]} noOfLines={2}>
                        {props.nombre}
                    </Heading>
                    <HStack space={2} alignItems="center">
                        <Container direction="row" px={1}>
                            <Text style={styles.generalFontSize} color="gray.700">
                                {props.renderDetail}
                            </Text>
                        </Container>
                        <HStack space={4} px={2}>
                            <IconMaterialcommunityIcons
                                name='delete-circle'
                                style={styles.icon}
                                color='red'
                                size={30}
                                onPress={props.handleRemove}
                            />
                            <IconFontAwesome
                                name='edit'
                                style={styles.icon}
                                color='green'
                                size={30}
                                onPress={props.handleUpdateListaPrecios}
                            />
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
        </Center>
    );
};