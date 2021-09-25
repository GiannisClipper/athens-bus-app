import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

// to search available icons:
// https://oblador.github.io/react-native-vector-icons/
// https://pictogrammers.github.io/@mdi/font/6.1.95/

export const HomeIcon = props => <Icon { ...props } name='home' />

export const LineIcon = props => <Icon { ...props } name='bus' />

export const RouteIcon = props => <Icon { ...props } name='swap-horizontal' />

export const StopIcon = props => <Icon { ...props } name='bus-stop' />

export const ArrivalIcon = props => <Icon { ...props } name='bus-clock' />

export const ScheduleIcon = props => <Icon { ...props } name='calendar-clock' />

export const MapIcon = props => <Icon { ...props } name='map-marker' />

export const MySelectedIcon = props => <Icon { ...props } name='star' />

export const MyDeselectedIcon = props => <Icon { ...props } name='star-outline' />
