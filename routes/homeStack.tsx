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
        screen:({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => <ProductList/>,
        navigationOptions: ({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => {
            return {
                header: () => <Header title="Products" navigation={navigation}/>,
                headerStyle:{
                    height: 60,
                    backgroundColor: 'blue',
                    padding: 0,

                },
            }
        },
    },
    NewProduct: { 
        screen:({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => <NewProduct/>,
    },
    ProductDetails: { 
        screen:({navigation}: {navigation: NavigationScreenProp<NavigationRoute, NavigationParams>}) => <ProductDetails/>,
    },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
