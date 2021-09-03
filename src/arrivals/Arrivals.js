import React from 'react';
import { Modal } from 'react-native';
import styles from './styles';
import { StyledView, StyledScrollView } from '../_abstract/Styled';
import ArrivalsNav from './ArrivalsNav';
import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import { SimpleStop as ArrivalsStop } from '../stops/Stop';
import Arrival from './Arrival';
import useRequest from '../_abstract/useRequest';
import { URI } from '../_commons/constants';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const Arrivals = props => {

    const { stop, closeArrivals, isMyStop, toggleMyStop } = props;
    const { arrivals, routes } = stop;

    const routesRequest = useRequest( {

        uri: URI.ROUTES_OF_STOP + stop.StopCode,

        normalize: data => data.map( row => ( {
            RouteCode: row.RouteCode,
            LineID: row.LineID,
            RouteDescr: row.RouteDescr,
        } ) ),

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

        refreshTime: 20000  // milliseconds
    } );

    const routesStatus = routesRequest.status;
    const arrivalsStatus = arrivalsRequest.status;

    return (
        <Modal animationType={ 'fade' } isVisible={ true }>
            <ArrivalsNav 
                closeArrivals={ closeArrivals }
                isMyStop={ isMyStop }
                toggleMyStop={ toggleMyStop } 
            />

            <Main>
 
            { arrivalsStatus.isRequesting || routesStatus.isRequesting ?
                <WorkingIndicator />

            : arrivalsStatus.hasData && routesStatus.hasData ?
                <List style={ styles.list }>
                    <ArrivalsStop 
                        key={ -1 } 
                        stop={ stop } 
                    />

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
        </Modal>
    );
}

export default Arrivals;
