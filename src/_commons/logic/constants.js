const URI = {
    LINES: 'https://telematics.oasa.gr/api/?act=webGetLines',
    ROUTES_OF_LINE: 'https://telematics.oasa.gr/api/?act=webGetRoutes&p1=',
    STOPS_OF_ROUTE: 'https://telematics.oasa.gr/api/?act=webGetStops&p1=',
    ARRIVALS_OF_STOP: 'https://telematics.oasa.gr/api/?act=getStopArrivals&p1=',
    ROUTES_OF_STOP: 'https://telematics.oasa.gr/api/?act=webRoutesForStop&p1=',
    SCHEDULE_OF_LINE: 'http://telematics.oasa.gr/api/?act=getDailySchedule&line_code=',
    COORDS_OF_ROUTE: 'http://telematics.oasa.gr/api/?act=webRouteDetails&p1=',
}

export { URI };