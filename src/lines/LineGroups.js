import React, { useContext, useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import * as style from './style/lineGroups';

import { LineGroupsContext } from './LineGroupsContext';
import { LinesContext } from './LinesContext';
import { URI } from '../_commons/logic/constants';
import { useRequest, initRequestStatus } from '../_abstract/logic/useRequest';
import { linesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import LineSearch from './LineSearch';
import LineGroup from './LineGroup';

const Container = StyledView( { style: style.container } );
const List = StyledScrollView( { style: style.list } );

const LineGroups = () => {

    const { lineGroups, saveLineGroups } = useContext( LineGroupsContext );
    const { lines, saveLines } = useContext( LinesContext );

    const { status } = useRequest( {
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
            <ErrorMessage>{ lineGroups.error }</ErrorMessage>

        : null }

        </Container>
    );
}

export default LineGroups;
