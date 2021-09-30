import React from 'react';
import { StyledView, StyledText } from '../_abstract/Styled';
import * as style from './style/stopArrivals';

const Row = StyledView( { style: style.row } );
const Col1 = StyledView( { style: style.col1.view } );
const Col1Text = StyledText( { style: style.col1.text } );
const Col2 = StyledView( { style: style.col2.view } );
const Col2Text = StyledText( { style: style.col2.text } );

const StopArrival = props => {

    const { arrival, routes } = props;

    const route = routes[ arrival.RouteCode ];

    const minutes = arrival.minutes ? `${ arrival.minutes }'` : '';
    const LineID = route ? `[ ${ route.LineID } ]` : '';
    const RouteDescr = route ? route.RouteDescr : arrival.RouteCode;

    return (
        <Row testID='arrival-row'>

            <Col1>
                <Col1Text>{ minutes }</Col1Text>
            </Col1>

            <Col2>
                <Col2Text>{ `${ LineID } ${ RouteDescr }` }</Col2Text>
            </Col2>

        </Row>
    );
}

export default StopArrival;
