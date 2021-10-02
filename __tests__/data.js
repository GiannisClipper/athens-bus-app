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
        routeCodes: { data: [ '130a', '130b' ], error },
    },
}

const routes = {
    '16a': {
        LineID: '16',
        LineCode: '16',
        RouteCode: '16a',
        RouteDescr: 'Go route of line 16',
        RouteType: '1',
        stopCodes: { data: null, error: null },
        schedule: { data: null, error: null },
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

export { lineGroups, lines, routes };

