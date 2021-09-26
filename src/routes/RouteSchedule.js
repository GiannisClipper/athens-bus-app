import React, { useContext, useEffect } from 'react';

import { StyledView, StyledScrollView, StyledTouchableOpacity, StyledText } from '../_abstract/Styled';
import stylePatterns from '../_commons/stylePatterns';
import styles from './styles';

import { CacheContext } from '../_commons/CacheContext';
import { URI } from '../_commons/constants';
import { useRequest, initRequestStatus } from '../_abstract/useRequest';
import { routeScheduleResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, InfoMessage, ErrorMessage } from '../_commons/Messages';
import { ScheduleIcon } from '../_commons/Icons';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );
const Row = StyledTouchableOpacity( { style: styles.row } );
const RowIcon = StyledView( { style: styles.rowIcon } );
const RowDescr = StyledView( { style: styles.rowDescr } );
const RowDescrText = StyledText( { style: styles.rowDescrText } );

const RouteSchedule = props => {

    const { data } = props;
    const { route } = data;
    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    // is still usefull ????????
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
        <Main testID='routeSchedule'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData && schedule.data.length === 0 ?
                <InfoMessage>{ 'No schedule found.' }</InfoMessage>

            : status.hasData ?
                <List>
                { schedule.data.map( ( time, i ) => (
                    <Row key={ i }>

                        <RowIcon>
                            <ScheduleIcon { ...stylePatterns.tab.item.icon } />
                        </RowIcon>

                        <RowDescr>
                            <RowDescrText>{ time }</RowDescrText>
                        </RowDescr>

                    </Row>
                ) ) } 
                </List>

            : status.hasError ?
                <ErrorMessage>{ schedule.error }</ErrorMessage>

            : null }

        </Main>
    );
}

export default RouteSchedule;
