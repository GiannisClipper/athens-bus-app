import React, { useEffect, useState, useContext } from 'react';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import styles from './styles';
import { MyContext } from '../_commons/MyContext';
import { InfoMessage } from '../_commons/Messages';
import Route from '../routes/Route';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const MyRoutes = props => {

    const { routeNavNavigation } = props;
    const { myRoutes } = useContext( MyContext );

    return ( 
        <Main testID='routes'>

        { myRoutes.length === 0 
        ?
            <InfoMessage>{ 'No favourite routes found.' }</InfoMessage>
        :
            <List>
            { myRoutes.map( ( route, i ) => (
                <Route 
                    key={ i }
                    route={ route }
                    routeNavNavigation={ routeNavNavigation }
                />
            ) ) } 
            </List>
        }

        </Main>
    );
}

export default MyRoutes;
