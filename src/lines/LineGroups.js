import React, { useContext, useEffect } from 'react';

import { StyledView, StyledScrollView } from '../_abstract/Styled';
import { lineGroupStyles as styles } from './styles';

import { CacheContext } from '../_commons/CacheContext';
import { URI } from '../_commons/constants';
import { useRequest, initRequestStatus } from '../_abstract/useRequest';
import { linesResponseHandler } from './logic/responseHandlers';

import { WorkingIndicator, ErrorMessage } from '../_commons/Messages';
import LineSearch from './LineSearch';
import LineGroup from './LineGroup';

const Main = StyledView( { style: styles.main } );
const List = StyledScrollView( { style: styles.list } );

const LineGroups = () => {

    const { cache } = useContext( CacheContext );
    const { lines } = cache;

    const { status } = useRequest( {
        uri: URI.LINES,
        requestStatus: initRequestStatus( lines ),
        responseHandler: response => linesResponseHandler( lines, response ),
    } );
    
    return (
        <Main testID='groups'>

        { status.isRequesting ?
            <WorkingIndicator />

        : status.hasData ?
            <List>
                <LineSearch
                    key={ -1 }
                    lines={ lines }
                />

                { lines.groups.map( ( group, i ) => (
                    <LineGroup 
                        key={ i }
                        lines={ lines }
                        group={ group }
                    />
                ) ) }
            </List>

        : status.hasError ?
            <ErrorMessage>{ lines.error }</ErrorMessage>

        : null }

        </Main>
    );
}

export default LineGroups;
