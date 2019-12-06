// this where to put the navigation confifuration to but my code clean
import React from 'react'
import {Platform, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Ionicons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

import CategoriesScreen from '../Screens/CategoriesScreen';
import CategoryMealScreen from '../Screens/CategoryMealScreen';
import MealDetailsScreen from '../Screens/MealDetailsScreen';
import FavoritesScreen from '../Screens/FavoritesScreen';
import FiltersScreen from '../Screens/FiltersScreen'
import colors from '../Constants/colors'

const defaultNavigationOptions={
    headerStyle:{
        backgroundColor:Platform.OS ==='android' ? colors.primaryColor: ''
           },
           //this fonts does not have have an effect on android but ios.
    headerTitleStyle:{
    fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
 fontFamily:'open-sans-bold'
    },
    headerTintColor:Platform.OS === 'android' ? 'white': colors.primaryColor,
    headerTitle:'A Screen'
  }

const MealNavigator = createStackNavigator({

    Category:{
        screen:CategoriesScreen,
          },
    CategoryMeals:{
        screen:CategoryMealScreen,
    },
    MealDetail:MealDetailsScreen,  
       },
        {
         defaultNavigationOptions: defaultNavigationOptions
         }
       );

  const FavoNavigator = createStackNavigator({
    Favorites:FavoritesScreen,
    MealDetail:MealDetailsScreen
  },
  {
      defaultNavigationOptions: defaultNavigationOptions
   })
   const tabScreenConfig = {
      Meals:{
        screen:MealNavigator,
        navigationOptions:{
        tabBarIcon:(tabInfo) => {
                return<Ionicons  name="ios-restaurant" size={25} color={tabInfo.tintColor}/>
                    },
                    tabBarColor:colors.primaryColor
                    },
                    tabBarLabel:Platform.OS==='android'?<Text style={{fontFamily:'open-sans-bold'}}>Meals</Text>:'Meals'     
                    },

      Favorites: {
        screen:FavoNavigator,
        navigationOptions:{
        tabBarIcon:(tabInfo) => {
                return<Ionicons  name="ios-star" size={25} color={tabInfo.tintColor}/>
                    },
                    tabBarColor:colors.accentColor
                    },
                    tabBarLabel:Platform.OS==='android'?<Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text>:'Favorites'     
                    },
                    }

    const MealsFavTabNavigator = Platform.OS==='android'
    ?createMaterialBottomTabNavigator(tabScreenConfig , {
     activeTintColor:colors.accentColor,
     shifting:true,
     barStyle:{
       backgroundColor:colors.primaryColor
     }
    })
    :createBottomTabNavigator(tabScreenConfig ,{
         tabBarOptions:{
           labelStyle:{
             fontFamily:'open-sans-bold'
           },
           activeTintColor:'white'
         }
       })

     const FiltersNavigator = createStackNavigator({
         Filters:FiltersScreen
       },
       {
          defaultNavigationOptions: defaultNavigationOptions
       })
       const MainNavigator = createDrawerNavigator({
         MealsFavs:{
           screen:MealsFavTabNavigator,
           navigationOptions:{
             drawerLabel:'Meals'
           }},
         Filters: FiltersNavigator
       },{
         contentOptions:{
           activeTintColor:colors.accentColor,
           labelStyle:{
             fontFamily:'open-sans-bold'
           }
         }
       })
export default createAppContainer(MainNavigator);