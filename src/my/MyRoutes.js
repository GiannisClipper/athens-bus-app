import React, { useContext } from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/my';
import { MyContext } from '../my/MyContext';
import { InfoMessage } from '../_commons/Messages';
import Route from '../routes/Route';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const MyRoutes = props => {

    const { myRoutes } = useContext( MyContext );

    return ( 
        <Container testID='routes'>

        { myRoutes.length === 0 
        ?
            <InfoMessage>{ 'No favourite routes found.' }</InfoMessage>
        :
            <List>
            { myRoutes.map( ( route, i ) => (
                <Route 
                    key={ i }
                    routeCode={ route.RouteCode }
                />
            ) ) } 
            </List>
        }

        </Container>
    );
}

export default MyRoutes;
