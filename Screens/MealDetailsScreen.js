import React,{useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,ScrollView,Image} from 'react-native'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import {useSelector, useDispatch} from 'react-redux'

import HeaderButton from '../Components/HeaderButton';
import DefaultText from '../Components/DefaultText';
import {toggleFavorite} from '../Store/Actions/Meals'

const ListItem = (props) => {
return<View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
        </View>
        }

const MealDetailsScreen = props => {
    const availableMeals= useSelector(state=>state.meals.meals);
    const currentMealIsFavorite =useSelector(state => 
        state.meals.favoriteMeals.some(meal => meal.id===mealId));

    const mealId=props.navigation.getParam('mealId');

    const selectedMeal=availableMeals.find(meal=>meal.id===mealId);
     
    const distpatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        distpatch(toggleFavorite(mealId))
    },[distpatch,mealId]);

    useEffect(()=>{
        // props.navigation.setParams({mealTitle:selectedMeal.title});
        props.navigation.setParams({toggleFav:toggleFavoriteHandler})
    },[toggleFavoriteHandler]);

    useEffect(()=>{
        props.navigation.setParams({isFav: currentMealIsFavorite})
    },[currentMealIsFavorite])

    return(
        <ScrollView>
        <Image source={{uri:selectedMeal.imageUrl}} style={styles.Image}/>
        <View style={styles.Details}>
            < DefaultText>{selectedMeal.duration}m</DefaultText>
            < DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
            < DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <Text style={styles.title}>Ingredient</Text>
        {selectedMeal.ingredients.map(ingredient=>(
        <ListItem key ={ingredient}>{ingredient}</ListItem>
        ))}
        <Text style={styles.title}>Steps</Text>
        {selectedMeal.steps.map(step=>(
        <ListItem key ={step}>{step}</ListItem>
        ))}
        </ScrollView>
    )
};
//=================== HEADER NAVIGATION ==========================//
//this is how we can extract Data in our navigationOptions and use that dynamic data
MealDetailsScreen.navigationOptions= (navigationData) => {
//   const mealId = navigationData.navigation.getParam('mealId');
  const  mealTitle=navigationData.navigation.getParam('mealTitle');
  const toggleFavorite=navigationData.navigation.getParam('toggleFav');
  const isFavorite=navigationData.navigation.getParam('isFav');
//   const selectedMeal=MEALS.find(meal=>meal.id===mealId)
    return {
        headerTitle: mealTitle,
        headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='Favorite' 
            iconName={isFavorite ? 'ios-star':'ios-star-outline'}
            onPress= {toggleFavorite} />
        </HeaderButtons>
     }
  }

const styles= StyleSheet.create({
    Image:{
        width:'100%',
        height:200,
    },
    Details:{
     flexDirection:'row',
     padding:15,
      justifyContent:'space-around'   
    },
    title:{
    fontFamily:'open-sans',
    fontSize:22,
    textAlign:'center'
    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:'#ccc',
        borderWidth:1,
        padding:10
    }
})

export default MealDetailsScreen;