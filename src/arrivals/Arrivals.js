import React, { useEffect, useState } from 'react';
import { Modal, View, ScrollView } from 'react-native';
import styles from './styles';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import ArrivalsNav from './ArrivalsNav';
// import Stop from './Stop';
import Arrival from './Arrival';

const Arrivals = props => {

    const { stop, closeArrivals, isMyStop, toggleMyStop } = props;
    const { arrivals, routes } = stop;

    const [ isVisible, setIsVisible ] = useState( true );

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

        refreshTime: 20000  // milliseconds
    } );

    const routesRequest = useRequest( {

        uri: URI.ROUTES_OF_STOP + stop.StopCode,

        normalize: data => data.map( row => ( {
            RouteCode: row.RouteCode,
            LineID: row.LineID,
            RouteDescr: row.RouteDescr,
        } ) ),

        store: routes,
    } );

    const arrivalsStatus = arrivalsRequest.status;
    const routesStatus = routesRequest.status;

    return (
        <Modal animationType={ 'fade' } isVisible={ isVisible }>
            <ArrivalsNav 
                closeArrivals={ closeArrivals }
                isMyStop={ isMyStop }
                toggleMyStop={ toggleMyStop } 
            />

            <View style={ styles.main }>
 
            { arrivalsStatus.isRequesting || routesStatus.isRequesting ?
                <WorkingIndicator />

            : arrivalsStatus.hasData && routesStatus.hasData ?
                <ScrollView style={ styles.list }>
                    {/* <Stop 
                        key={ -1 } 
                        stop={ stop } 
                    /> */}
                    { arrivals.data.map( ( arrival, i ) => (
                        <Arrival
                            key={ i }
                            arrival={ arrival }
                            routes={ routes }
                        />
                    ) ) } 
                </ScrollView>
            : arrivalsStatus.hasError || routesStatus.hasError ?
                <ErrorMessage>{ arrivals.error + ' ' + routes.error }</ErrorMessage>

            : null }

            </View>
        </Modal>
    );
}

export default Arrivals;
