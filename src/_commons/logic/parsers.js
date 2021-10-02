import { calcPointsFrame } from '../../_abstract/logic/calcPointsFrame';

const initialRegionParser = points => {

    if ( points.length === 0 ) {
        return {};
    }

    const frame = calcPointsFrame( points );
    const [ left, top ] = frame[ 0 ];
    const [ right, bottom ] = frame[ 1 ];
    const width = right - left;
    const height = bottom - top;  

    const initialRegion = {
        latitude: left + width / 2,
        longitude: top + height / 2,
        latitudeDelta: width * 1.1,
        longitudeDelta: height * 1.1,
    };

    return initialRegion;
}

export { initialRegionParser };