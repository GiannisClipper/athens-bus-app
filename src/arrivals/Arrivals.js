import React, { useState, useEffect } from 'react';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import Arrival from './Arrival';
import { normalizeStopRoutes } from '../stops/StopRoutes';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const Arrivals = props => {

    const { navigation, stop } = props;
    const { arrivals, routes } = stop;

    const [ refreshTime, setRefreshTime ] = useState( null );

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'focus', () => {
            setRefreshTime( 20000 );
            // console.log( 'setRefreshTime( 20000 )', routes )
        } );
        return unsubscribe;
    }, [ navigation ]);

    useEffect( () => {
        const unsubscribe = navigation.addListener( 'blur', () => {
            setRefreshTime( null );
            // console.log( 'setRefreshTime( null )' )
        } );
        return unsubscribe;
    }, [ navigation ]);

    const routesRequest = useRequest( {

        uri: URI.ROUTES_OF_STOP + stop.StopCode,

        normalize: normalizeStopRoutes,

        store: routes,
    } );

    const arrivalsRequest = useRequest( {

        uri: URI.ARRIVALS_OF_STOP + stop.StopCode,

        normalize: data => {
            return data === null ? // data is null when there are no arrivals
                [ {
                    RouteCode: 'No arrivals found.',
                    minutes: '',
                } ]
            :
                data.map( row => ( {
                    RouteCode: row.route_code,
                    minutes: row.btime2,
                } ) );

        },

        store: arrivals,

        refreshTime,  // 20000 milliseconds

    } );

    const routesStatus = routesRequest.status;
    const arrivalsStatus = arrivalsRequest.status;

    return (
        <Main testID='arrivals'>

            { arrivalsStatus.isRequesting || routesStatus.isRequesting ?
                <WorkingIndicator />

            : arrivalsStatus.hasData && routesStatus.hasData ?
                <List>
                    { arrivals.data.map( ( arrival, i ) => (
                        <Arrival
                            key={ i }
                            arrival={ arrival }
                            routes={ routes }
                        />
                    ) ) } 
                </List>

            : arrivalsStatus.hasError || routesStatus.hasError ?
                <ErrorMessage>{ arrivals.error + ' ' + routes.error }</ErrorMessage>

            : null }

        </Main>
    );
}

export default Arrivals;
