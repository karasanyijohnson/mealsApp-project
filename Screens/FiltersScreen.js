import React,{useState, useEffect,useCallback} from 'react';
import {View,Text,StyleSheet, Switch,Platform} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import {useDispatch} from 'react-redux'

import HeaderButton from '../Components/HeaderButton';
import colors from '../Constants/colors';
import {setFilters} from '../Store/Actions/Meals'

const FilterSwitch=props=>{

    return<View style={styles.filterContainer}>
       <Text>{props.label}</Text>
        <Switch 
        trackColor= {{true:colors.primaryColor}}
        value={props.state} 
        thumbColor={Platform.OS==='android'?colors.primaryColor:''}
        onValueChange ={props.onChange}/>
      </View>
        }
        
const FiltersScreen = props => {
    const {navigation}=props
    const[isGlutenFree,setIsGlutenFree]=useState(false);
    const[isLactoseFree,setIsLactoseFree]=useState(false);
    const[isVigan,setIsVigan]=useState(false);
    const[isVegeterian,setIsVegeterian]=useState(false);

    const distpatch= useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree:isGlutenFree,
            lactoseFree:isLactoseFree,
            vegan:isVigan,
            vegetarian:isVegeterian
        }
  
        distpatch(setFilters(appliedFilters));

    },[isGlutenFree,isLactoseFree,isVigan,isVegeterian])
    useEffect(()=>{
        navigation.setParams({save:saveFilters});

    },[saveFilters]);

    return(
        <View style={styles.Screen}>
            <Text style={styles.title}> Available Filters/ Restrictions</Text>
            <FilterSwitch 
            label='Gluten-free' 
            state={isGlutenFree} 
            onChange={newValue => setIsGlutenFree(newValue)}
            />
             <FilterSwitch
            label='Lactose-free' 
            state={isLactoseFree} 
            onChange={newValue => setIsLactoseFree(newValue)}
            />
             <FilterSwitch 
            label='Vigan' 
            state={isVigan} 
            onChange={newValue => setIsVigan(newValue)}
            />
             <FilterSwitch
            label='Vegeterian' 
            state={isVegeterian} 
            onChange={newValue => setIsVegeterian(newValue)}
            />
        </View>
     )
}

FiltersScreen.navigationOptions= navData => {
    return{
       headerTitle:'Filters Meals',
       headerLeft:(<HeaderButtons HeaderButtonComponent ={HeaderButton}>
                  <Item 
                  title="Menu" 
                  iconName="ios-menu" 
                  onPress={()=>{
                      navData.navigation.toggleDrawer();
                  }}/>
                  </HeaderButtons>
                  ),
       headerRight:(
        <HeaderButtons HeaderButtonComponent ={HeaderButton}>
                  <Item 
                  title="Save" 
                  iconName="ios-save" 
                  onPress={navData.navigation.getParam('save')}/>
                  </HeaderButtons>   
                  ),           
                   }
                   }
const styles= StyleSheet.create({
    Screen:{
        flex:1,
        alignItems:'center'
    },
    filterContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'80%',
    marginVertical:15
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:20,
        margin:20,
        textAlign:'center',
    }
})

export default FiltersScreen;