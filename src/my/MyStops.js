import React, { useContext } from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/my';
import { MyContext } from '../my/MyContext';
import { InfoMessage } from '../_commons/Messages';
import Stop from '../stops/Stop';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const MyStops = props => {

    const { myStops } = useContext( MyContext );

    return ( 
        <Container testID='stops'>

        { myStops.length === 0 
        ?
            <InfoMessage>{ 'No favourite stops found.' }</InfoMessage>
        :
            <List>
                { myStops.map( ( stop, i ) => (
                    <Stop 
                        key={ i }
                        stopCode={ stop.StopCode }
                    />
                ) ) } 
            </List>
        }

        </Container>
    );
}

export default MyStops;
