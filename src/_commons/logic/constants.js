const URI = {
    LINES: 'https://telematics.oasa.gr/api/?act=webGetLines',
    ROUTES_OF_LINE: 'https://telematics.oasa.gr/api/?act=webGetRoutes&p1=',
    STOPS_OF_ROUTE: 'https://telematics.oasa.gr/api/?act=webGetStops&p1=',
    ARRIVALS_OF_STOP: 'https://telematics.oasa.gr/api/?act=getStopArrivals&p1=',
    ROUTES_OF_STOP: 'https://telematics.oasa.gr/api/?act=webRoutesForStop&p1=',
    SCHEDULE_OF_LINE: 'http://telematics.oasa.gr/api/?act=getDailySchedule&line_code=',
    MAP_OF_ROUTE: 'http://telematics.oasa.gr/api/?act=webRouteDetails&p1=',
    MAP_OF_STOP: 'http://telematics.oasa.gr/api/?act=getClosestStops',
}

const ARRIVALS_REFRESH_TIME = 1000 * 20; // 20 secs

const CACHE_REFRESH_TIME = 1000 * 60 * 60 * 12; // 12 hours

export { 
    URI, 
    ARRIVALS_REFRESH_TIME,
    CACHE_REFRESH_TIME,
};