import React, { useContext, useState, useEffect } from 'react';
import { Map, MapPolyline, MapMarker } from '../_commons/Map';

import { StyledView } from '../_abstract/Styled';
import * as style from './style/routes';

import { RoutesContext } from './RoutesContext';
import { StopsContext } from '../stops/StopsContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { routeMapResponseHandler } from './logic/responseHandlers';
import { stopsResponseHandler } from '../stops/logic/responseHandlers';

import { WorkingIndicator, InfoMessage, Dialogue, ErrorMessage } from '../_commons/Messages';
import { ErrorButton } from '../_commons/Buttons';
// import { MapIcon, StopIcon } from '../_commons/Icons';

const Container = StyledView( { style: style.container } );

const RouteMap = props => {

    const { routeCode } = props;
    const { routes, saveRoutes } = useContext( RoutesContext );
    const route = routes[ routeCode ];
    const { stopCodes, map } = route;
    const { stops, saveStops } = useContext( StopsContext );

    const mapRequest = useRequest( {
        uri: URI.MAP_OF_ROUTE + routeCode,
        requestStatus: initRequestStatus( map ),
        responseHandler: response => routeMapResponseHandler( {
            routes, routeCode, routes, saveRoutes, response 
        } ),
    } );

    const stopsRequest = useRequest( {
        uri: URI.STOPS_OF_ROUTE + routeCode,
        requestStatus: initRequestStatus( stopCodes ),
        responseHandler: response => stopsResponseHandler( {
            routes, routeCode, saveRoutes, stops, saveStops, response 
        } ),
    } );

    const mapStatus = mapRequest.status;
    const mapSetStatus = mapRequest.setStatus;
    const stopsStatus = stopsRequest.status;
    const stopsSetStatus = stopsRequest.setStatus;

    const [ zoom, setZoom ] = useState( null );

    const onRegionChangeComplete = region => {
        const newZoom = Math.round( Math.log( 360 / region.longitudeDelta ) / Math.LN2 );
        // https://stackoverflow.com/questions/46568465/convert-a-region-latitudedelta-longitudedelta-into-an-approximate-zoomlevel
        
        if ( zoom !== newZoom ) {
            setZoom( newZoom );
        }
    }

    // useEffect( () => console.log( 'Rerender map with zoom:', zoom ) );
    // TODO: using the zoom value to rescale marker icons on the map

    return ( 
        <Container testID='routeMap'>

        { mapStatus.isRequesting || stopsStatus.isRequesting ?
            <WorkingIndicator />

        : mapStatus.hasData && stopsStatus.hasData && map.data && map.data.polyline.length === 0 ?
            <InfoMessage>{ 'No map data found.' }</InfoMessage>

        : mapStatus.hasData && stopsStatus.hasData && map.data && stopCodes.data ?
            <Map 
                initialRegion={ map.data.initialRegion }
                onRegionChangeComplete={ onRegionChangeComplete }
            >
                <MapPolyline coordinates={ map.data.polyline } />

                { stopCodes.data.map( ( stopCode, i ) => { 
                    const stop = stops[ stopCode ];
                    const isTerminal = i === 0 || i === stopCodes.data.length - 1;

                    return (
                        <MapMarker
                            key={ i }
                            style={ isTerminal ? style.specialMarker : style.marker }
                            coordinate={ { latitude: stop.StopLat, longitude: stop.StopLng } }
                            title={ `${ stop.StopDescr }` }
                            description={ `(${ stop.StopCode })` }
                            // Icon={ zoom < 15 ? MapIcon : StopIcon }  // lower performance
                        />
                    );
                } ) }

            </Map>

        : mapStatus.hasError || stopsStatus.hasError ?
            <Dialogue>
                { map.error ? <ErrorMessage>{ map.error }</ErrorMessage> : null }
                { stops.error ? <ErrorMessage>{ stop.error }</ErrorMessage> : null }
                <ErrorButton 
                    label='Retry'
                    onPress={ () => {
                        if ( map.error ) {
                            mapSetStatus( { toRequest: true } ) 
                        }
                        if ( stops.error ) {
                            stopsSetStatus( { toRequest: true } ) 
                        }
                    } }
                />
            </Dialogue>

        : null }

        </Container>
    );
}

export default RouteMap;
