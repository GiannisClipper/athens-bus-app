import React from 'react';
import * as RootNavigation from '../_commons/RootNavigation';
import { StyledView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import { RouteIcon } from '../_commons/Icons';
import stylePatterns from '../_commons/stylePatterns';
import styles from './styles';

const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const Route = props => {

    const { route } = props;

    const onPress = () => {
        if ( route.stops && route.stops.error ) { 
            route.stops = {};  // clear cache in case of error to request again
        }
        route.schedule = {};  // clear cache due to always request up to date values

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

            <RowIcon>
                <RouteIcon { ...stylePatterns.tab.item.icon } />
            </RowIcon>

            <RowDescr>
                <RowDescrText>{ `[${ route.LineID }]   ${ route.RouteDescr } ${ route.LineDescr || '' }` }</RowDescrText>
            </RowDescr>

        </Row>
        </>
    );
}

export default Route;
