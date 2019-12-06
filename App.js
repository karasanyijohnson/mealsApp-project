import React,{useState} from 'react';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

import{useScreens} from 'react-native-screens';
import {createStore,combineReducers} from 'redux';
import { Provider } from 'react-redux';

import MealNavigator from './Navigation/MealNavigator';
import mealsReducer from './Store/Reduducers/Meals';

useScreens();

const rootReducer = combineReducers({
  meals:mealsReducer
});

const store= createStore(rootReducer);

const fetchFonts = () => {
 return Font.loadAsync({
  'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
const [fontLoaded, setFontLoaded]= useState(false)  
if(!fontLoaded){
  return(
    <AppLoading
   startAsync={fetchFonts} 
   onFinish={()=>setFontLoaded(true)}
    />
    ) 
   }
return(
<Provider store={store}>
    <MealNavigator/>
  </Provider> 
  ); 
}

