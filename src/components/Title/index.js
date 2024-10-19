import React from 'react';
import { Box, Button, HStack, Heading, Center, Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { styles } from './styles';
import colors from './../../constants/colors';

export default function Title(props) {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 3, y: 1 }}
            colors={props.new ?
                [colors.ENCABEZADO_COLOR_G1, colors.ENCABEZADO_COLOR_G2, colors.ENCABEZADO_COLOR_G3]
                :
                [colors.BACKGROUND_COLOR_SECONDARY, colors.BACKGROUND_COLOR_SECONDARY, colors.BACKGROUND_COLOR_SECONDARY]}
            style={styles.linearGradient}>
            <Box>
                {props.new ?
                    <HStack space={2} justifyContent="space-between">
                        <Center px={4}>
                            <Heading my={2} style={styles.heading}> {props.titulo}</Heading >
                        </Center>
                        <Center>
                            <HStack px={4}>
                                <Button
                                    onPress={() => props.new()}
                                    size={7}
                                    style={styles.buttonAddStyle}
                                    endIcon={<Icon as={<FontAwesome name='plus' />} size={2} textAlign='center' />}
                                />
                            </HStack>
                        </Center>
                    </HStack>
                    :
                    <HStack space={2} justifyContent="space-between">
                        <Center px={4}>
                            <Icon
                                onPress={() => {
                                    console.log("Back");
                                    props.navigation.goBack();
                                }}
                                size='sm'
                                mr={6}
                                size={6}
                                color={props.new ? "#ffffff" : '#000000'}
                                as={<FontAwesome name='arrow-left' color="red" size={60} />}
                            />
                        </Center>
                        <Center>
                            <HStack px={8}>
                                <Heading my={4} style={props.new ? styles.heading : styles.headingForm}> {props.titulo}</Heading >
                            </HStack>
                        </Center>
                    </HStack>
                }
            </Box>
        </LinearGradient >
    );
}