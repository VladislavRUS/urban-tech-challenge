import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loader = props => <ActivityIndicator color={props.color || '#fff'} />;

export default Loader;
