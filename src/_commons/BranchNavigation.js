import { CommonActions } from '@react-navigation/native';

const resetNavigation = navigation => {
    // remove navigation route states to have initial rendering
 
    return navigation.dispatch( state => {

        const routes = state.routes.map( route => {
            const { state, key, ...rest } = route;
            return { ...rest };
        } );

        return CommonActions.reset( {
            ...state,
            routes,
            index: 0,
        } );
    } );
}

export { resetNavigation };
