import { View, Text, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { Product } from "../types";
import { useFetch } from "../hooks";
import { ProductCart } from "../components";


const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const {data, isLoading, error, triggerFetch } = useFetch();


    const syncWithAsyncStorage = async () => {
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

    useEffect(() => {syncWithAsyncStorage()}, []);

    useEffect(() => {console.log({products})}, [products]);


    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <ProductCart product={item}/>
                )}
            />
        </View>
    );
};

export default ProductList;
