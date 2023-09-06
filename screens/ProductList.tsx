import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FC, useEffect, useState } from "react";
import { Product } from "../types";
import { useFetch } from "../hooks";
import { ProductCart } from "../components";
import { NavigationParams, NavigationRoute, NavigationScreenProp } from "react-navigation";

interface IProductList {
    navigation: NavigationScreenProp<NavigationRoute, NavigationParams>
}

const ProductList:FC<IProductList> = ({navigation}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const {data, isLoading, error, triggerFetch } = useFetch();

    const syncWithAsyncStorage = async () => {
        console.log('syncWithAsyncStorage');
        const dataFromAsyncStorage = await AsyncStorage.getItem('productList');
        if(dataFromAsyncStorage) {
            setProducts(JSON.parse(dataFromAsyncStorage));
        } else {
            triggerFetch('products?limit=10');
        }
    };

    useEffect(() => {
        if(data) {
            setProducts(data as Product[]);
            AsyncStorage.setItem('productList', JSON.stringify(data))
        }
    }, [data]);

    useEffect(() => {
        syncWithAsyncStorage();
    }, []);

    useEffect(() => {
        const shouldRefresh = navigation.getParam('shouldRefresh');
        if(shouldRefresh) {
            syncWithAsyncStorage();
            navigation.setParams({
                shouldRefresh: false,
            })
        }
    }, [navigation]);

    useEffect(() => {console.log({products})}, [products]);

    const navigateToScreen = (productId: string) => navigation.navigate('ProductDetails', {
        id: productId,
    });
//TODO: ProductCart => ProductCarD

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => navigateToScreen(item.id)}>
                        <ProductCart product={item}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ProductList;
