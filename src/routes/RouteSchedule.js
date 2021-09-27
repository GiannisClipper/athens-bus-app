import React, { useContext, useEffect } from 'react';

import { StyledView, StyledScrollView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import * as style from './style/routes';

import { CacheContext } from '../_commons/CacheContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { routeScheduleResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import { ScheduleIcon } from '../_commons/Icons';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );
const Row = StyledTouchableOpacity( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const RouteSchedule = props => {

    const { data } = props;
    const { route } = data;
    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    if ( ! route.LineCode ) {
        const matchLines = lines.data.filter( line => line.LineID === route.LineID );
        route.LineCode = matchLines.length > 0 ? matchLines[ 0 ].LineCode : '';
    }

    const { LineCode, RouteType, schedule } = route;

    const { status } = useRequest( {
        uri: URI.SCHEDULE_OF_LINE + LineCode,
        requestStatus: initRequestStatus( schedule ),
        responseHandler: response => routeScheduleResponseHandler( schedule, response, LineCode, RouteType ),
    } );

    // useEffect( () => console.log( 'route', route ) );

    return ( 
        <Container testID='routeSchedule'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData && schedule.data.length === 0 ?
                <InfoMessage>{ 'No schedule found.' }</InfoMessage>

            : status.hasData ?
                <List>
                { schedule.data.map( ( time, i ) => (
                    <Row key={ i }>

                        <Col1>
                            <ScheduleIcon { ...style.icon } />
                        </Col1>

                        <Col2>
                            <Col2Text>{ time }</Col2Text>
                        </Col2>

                    </Row>
                ) ) } 
                </List>

            : status.hasError ?
                <ErrorMessage>{ schedule.error }</ErrorMessage>

            : null }

        </Container>
    );
}

export default RouteSchedule;
