import React, { useContext } from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import styles from './styles';
import { MyContext } from '../_commons/MyContext';
import { InfoMessage } from '../_commons/Messages';
import Stop from '../stops/Stop';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const MyStops = props => {

    const { stopNavNavigation } = props;
    const { myStops } = useContext( MyContext );

    return ( 
        <Main testID='stops'>

        { myStops.length === 0 
        ?
            <InfoMessage>{ 'No favourite stops found.' }</InfoMessage>
        :
            <List>
                { myStops.map( ( stop, i ) => (
                    <Stop 
                        key={ i }
                        stop={ stop }
                        stopNavNavigation={ stopNavNavigation }
                    />
                ) ) } 
            </List>
        }

        </Main>
    );
}

export default MyStops;
