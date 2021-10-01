import React, { useContext } from 'react';
import { View } from 'react-native';

import { SettingsContext } from './SettingsContext';
//import { settingsHandler } from './logic/settingsHandler';
import { URI, CACHE_REFRESH_TIME } from '../_commons/logic/constants';

import { WorkingIndicator, Dialogue, ErrorMessage } from '../_commons/Messages';
import { ErrorButton } from '../_commons/Buttons';

const Settings = props => {

    const { lines, saveLines } = useContext( LinesContext );
    const line = lines[ lineCode ];
    const { routeCodes } = line;

    const { routes, saveSettings } = useContext( SettingsContext );

    const { status, setStatus } = useRequest( {
        uri: URI.ROUTES_OF_LINE + lineCode,
        requestStatus: initRequestStatus( routeCodes ),
        responseHandler: response => routesResponseHandler( {
            lines, lineCode, saveLines, routes, saveSettings, response,
        }),
    } );
 
    return (
        <View testID='routes'>

            { status.isRequesting ?
                <WorkingIndicator />

            : status.hasData ?
                <>
                { routeCodes.data.map( ( routeCode, i ) => (
                    <Route 
                        key={ i }
                        routeCode={ routeCode }
                    />
                ) ) } 
                </>

            : status.hasError ?
                <Dialogue>
                    <ErrorMessage>{ routeCodes.error }</ErrorMessage>
                    <ErrorButton 
                        label='Retry'
                        onPress={ () => setStatus( { toRequest: true } ) }
                    />
                </Dialogue>
            : null }

        </View>
    );
}

export default Settings;
