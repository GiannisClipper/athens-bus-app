import React, { useEffect, useState, useContext } from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import styles from './styles';
import { CacheContext } from '../_commons/CacheContext';
import { InfoMessage } from '../_commons/Messages';
import { Stop } from './Stop';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const MyStops = props => {

    const [ rerender, setRerender ] = useState( 0 );
    const { cache } = useContext( CacheContext );
    const { myStops } = cache;

    useEffect( async () => {
        myStops.info = myStops.data.length === 0 ? 'No favourite stops found.' : null;
        setRerender( rerender + 1 );
    }, [ myStops.data ] );

    return ( 
        <Main testID='stops'>

        { myStops.info ?
            <InfoMessage>{ myStops.info }</InfoMessage>

        : myStops.data ?
            <List>
            { myStops.data.map( ( stop, i ) => (
                <Stop 
                    key={ i }
                    stop={ stop }
                    setRerender={ setRerender }
                />
            ) ) } 
            </List>

        : null }

        </Main>
    );
}

export default MyStops;
