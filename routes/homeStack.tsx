import { createStackNavigator } from "react-navigation-stack";
import { 
    NavigationScreenProp,
    NavigationRoute,
    NavigationParams,
    createAppContainer
} from 'react-navigation';
import { NewProduct, ProductDetails, ProductList } from "../screens";
import { Header } from "../components";
import React from "react";


const screens = {
    ProductList: {
        screen:({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => <ProductList  navigation={navigation}/>,
        navigationOptions: ({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => {
            return {
                header: () => <Header title="Products" navigation={navigation}/>,
                headerStyle:{
                    height: 60,
                    padding: 0,
                },
            }
        },

    },
    NewProduct: { 
        screen:({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => <NewProduct navigation={navigation}/>,
        navigationOptions: () => {
            return {
                headerStyle:{
                    backgroundColor: '#64615e',
                },
                headerTintColor: "#ffffff",
            }
        },
    },
    ProductDetails: { 
        screen:({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => <ProductDetails navigation={navigation}/>,
        navigationOptions: () => {
            return {
                headerStyle:{
                    backgroundColor: '#64615e',
                },
                headerTintColor: "#ffffff",
            }
        },
    },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
