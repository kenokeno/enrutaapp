import React, { useState, useEffect } from 'react';
import { Container, Content, Grid, Spinner } from 'native-base';
import Loading from './../../components/Loading';
import { saveItem } from './../../api';
import { getRegistryById } from './../../api';
import { styles } from './';

export default ({ navigation }) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        redirect();
    });

    const redirect = async () => {
        let user = getRegistryById(1, 'Repartidor').result;
        await saveItem('@user_info', JSON.stringify(user));
        setVisible(false);
        navigation.navigate('HOME');
    }

    return <Loading isVisible={true} text="Cargando Datos..." />;
}

/*
<Container>
        <Content contentContainerStyle={styles.contenct}>
            <Grid style={styles.grid}>
                <Spinner color="red"/>
            </Grid>
        </Content>
    </Container>
*/
