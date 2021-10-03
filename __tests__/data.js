const error = 'Just an error message...';

const lineGroups = {
    data: [
        { lineGroup: '1', lineCodes: [ '16', '130' ] },
        { lineGroup: '2', lineCodes: [ '221', '222' ] }
    ],
    error
}

const lines = {
    '16': {
        LineCode: '16',
        LineID: '16',
        LineDescr: 'Trolley line 16',
        routeCodes: { data: [ '16a', '16b' ], error },
    },
    '130': {
        LineCode: '130',
        LineID: '130',
        LineDescr: 'Bus line 130',
        routeCodes: { data: null, error: null },
    },
}

const routes = {
    '16a': {
        LineID: '16',
        LineCode: '16',
        RouteCode: '16a',
        RouteDescr: 'Go route of line 16',
        RouteType: '1',
        stopCodes: { data: [ '16a1', '16a2', '16a3' ], error },
        schedule: { data: [ '05:00', '05:15', '05:30' ], error: error },
        map: { data: null, error: null },
    },
    '16b': {
        LineID: '16',
        LineCode: '16',
        RouteCode: '16b',
        RouteDescr: 'Come route of line 16',
        RouteType: '2',
        stopCodes: { data: null, error: null },
        schedule: { data: null, error: null },
        map: { data: null, error: null },
    },
}

const stops = {
    '16a1': {
        StopCode: '16a1',
        StopDescr: 'Stop 1 of route 16a',
        StopLat: 0,
        StopLng: 0,
        RouteStopOrder: 1,
        routeCodes: { data: [ '16a', '16b' ], error },
        arrivals: { data: [ { RouteCode: '16a', minutes: 1 }, { RouteCode: '16b', minutes: 2 } ], error },
        map: { data: null, error: null },
    },
    '16a2': {
        StopCode: '16a2',
        StopDescr: 'Stop 2 of route 16a',
        StopLat: 0,
        StopLng: 0,
        RouteStopOrder: 2,
        routeCodes: { data: null, error: null },
        arrivals: { data: null, error: null },
        map: { data: null, error: null },
    },
    '16a3': {
        StopCode: '16a3',
        StopDescr: 'Stop 3 of route 16a',
        StopLat: 0,
        StopLng: 0,
        RouteStopOrder: 3,
        routeCodes: { data: null, error: null },
        arrivals: { data: null, error: null },
        map: { data: null, error: null },
    },
}
export { lineGroups, lines, routes, stops };

