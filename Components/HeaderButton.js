import React from 'react';
import {Platform}from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons';

import {Ionicons} from '@expo/vector-icons'
import colors from '../Constants/colors';

const CustomHeaderButton = props => {
return<HeaderButton 
            {...props} 
            IconComponent={Ionicons}
            color={Platform.OS==='android'? 'white': colors.primaryColor}
            />
            }

export default CustomHeaderButton