import React, { useContext, useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/lineGroups';

import { LineGroupsContext } from './LineGroupsContext';
import { LinesContext } from './LinesContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { linesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, Dialogue, ErrorMessage } from '../_commons/Messages';
import { ErrorButton } from '../_commons/Buttons';
import LineSearch from './LineSearch';
import LineGroup from './LineGroup';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const LineGroups = () => {

    const { lineGroups, saveLineGroups } = useContext( LineGroupsContext );
    const { lines, saveLines } = useContext( LinesContext );

    const { status, setStatus } = useRequest( {
        uri: URI.LINES,
        requestStatus: initRequestStatus( lineGroups ),
        responseHandler: response => linesResponseHandler( { saveLineGroups, saveLines, response } ),
    } );
    
    return (
        <Container testID='groups'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
                <LineSearch
                    key={ -1 }
                    lines={ lines }
                />

                { lineGroups.data.map( ( lineGroup, i ) => (
                    <LineGroup 
                        key={ i }
                        lineGroup={ lineGroup }
                    />
                ) ) }
            </List>

        : status.hasError ?
            <Dialogue>
                <ErrorMessage>{ lineGroups.error }</ErrorMessage>
                <ErrorButton 
                    label='Retry'
                    onPress={ () => setStatus( { toRequest: true } ) }
                />
            </Dialogue>

        : null }

        </Container>
    );
}

export default LineGroups;
