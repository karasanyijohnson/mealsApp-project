import React from 'react';
import {View,StyleSheet} from 'react-native'
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useSelector} from 'react-redux';

import MealList from '../Components/MealList';
import HeaderButton from '../Components/HeaderButton';
import DefaultText from '../Components/DefaultText';

const FavoritesScreen = props => {

    const favMeals= useSelector(state=>state.meals.favoriteMeals);
    if(favMeals.length ===0 || !favMeals){
        return(
        <View style={Styles.Content}>
            <DefaultText>No Favorite Meals Found. Start Adding Some!</DefaultText>
        </View>
        )
      }
    return<MealList listData={favMeals}  navigation={props.navigation} />
}

FavoritesScreen.navigationOptions= navData => {
    return{
       headerTitle:'Your Favorite',
       headerLeft:(<HeaderButtons HeaderButtonComponent ={HeaderButton}>
                  <Item title="Menu" iconName="ios-menu" onPress={()=>{
                      navData.navigation.toggleDrawer();
                  }}/>
                  </HeaderButtons>
                  )
                   }
                   }

    const Styles=StyleSheet.create({
        Content:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        }
    })               

export default FavoritesScreen;