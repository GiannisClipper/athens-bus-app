import React, { useContext } from 'react';
import * as RootNavigation from '../_commons/RootNavigation';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { RouteIcon } from '../_commons/Icons';
import * as style from './style/routes';
import { RoutesContext } from './RoutesContext';

const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const Route = props => {

    const { routeCode } = props;
    const { routes, saveRoutes } = useContext( RoutesContext );
    const route = routes[ routeCode ];
    
    const onPress = () => {
        if ( route.schedule.data ) {
            // remove current data due to force request and get the most recent schedule
            route.schedule = { data: null, error: null };
            saveRoutes( { ...routes, [ route.RouteCode ]: route } );
        }

        RootNavigation.navigate( 'RouteNav', { route } );  
        // navigation.navigate() passes the parameters to the component throught 
        //`props.route.params`, so here `props.route` refers to a navigation property,
        // while `props.route.params.route` refers to application data, a bus route
    }

    return (
        <>
        <Row 
            testID='route-row'
            onPress={ onPress }
        >

            <Col1>
                <RouteIcon { ...style.icon } />
            </Col1>

            <Col2>
                <Col2Text>{ `[${ route.LineID }]   ${ route.RouteDescr } ${ route.LineDescr || '' }` }</Col2Text>
            </Col2>

        </Row>
        </>
    );
}

export default Route;
