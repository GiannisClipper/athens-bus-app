import React, { useContext, useState, useEffect } from 'react';
import { Map, MapMarker } from '../_commons/Map';

import { StyledView } from '../_abstract/Styled';
import * as style from './style/stops';

import { StopsContext } from '../stops/StopsContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { stopMapResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, InfoMessage, Dialogue, ErrorMessage } from '../_commons/Messages';
import { ErrorButton } from '../_commons/Buttons';

const Container = StyledView( { style: style.container } );

const StopMap = props => {

    const { stopCode } = props;
    const { stops, saveStops } = useContext( StopsContext );
    const stop = stops[ stopCode ];
    const { map } = stop;

    const { status, setStatus } = useRequest( {
        uri: URI.MAP_OF_STOP + `&p1=${ stop.StopLat }&p2=${ stop.StopLng }`,
        requestStatus: initRequestStatus( map ),
        responseHandler: response => stopMapResponseHandler( {
            stops, stopCode, stops, saveStops, response 
        } ),
    } );
    
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
        <Container testID='stopMap'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData && map.data && map.data.closestStops === 0 ?
            <InfoMessage>{ 'No map data found.' }</InfoMessage>

        : status.hasData && map.data ?
            <Map 
                initialRegion={ map.data.initialRegion }
                onRegionChangeComplete={ onRegionChangeComplete }
            >
                { map.data.closestStops.map( ( closestStop, i ) => { 

                    const isCurrent = 
                        stop.StopLat === closestStop.StopLat && 
                        stop.StopLng === closestStop.StopLng;

                    return (
                        <MapMarker
                            key={ i }
                            style={ isCurrent ? style.specialMarker : style.marker }
                            coordinate={ { latitude: closestStop.StopLat, longitude: closestStop.StopLng } }
                            title={ `${ closestStop.StopDescr }` }
                            description={ `(${ closestStop.StopCode })` }
                            // Icon={ zoom < 15 ? MapIcon : StopIcon }  // lower performance
                        />
                    );
                } ) }

            </Map>

        : status.hasError ?
            <Dialogue>
                <ErrorMessage>{ map.error }</ErrorMessage>
                <ErrorButton 
                    label='Retry'
                    onPress={ () => setStatus( { toRequest: true } ) }
                />
            </Dialogue>

        : null }

        </Container>
    );
}

export default StopMap;
