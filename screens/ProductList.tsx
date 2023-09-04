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
            // call fake api here
            triggerFetch('products?limit=10');
        }
    };

    

    useEffect(() => {
        if(data) {
            // console.log({data})
            setProducts(data as Product[]);
        }
    }, [data]);

    useEffect(() => {syncWithAsyncStorage()}, []);

    useEffect(() => {console.log({products})}, [products]);


    return (
        <View>
            <Text>products here</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => {
                    console.log({item})
                    return (
                    // <Text>{item.title}</Text>
                    <ProductCart product={item}/>
                )}}
            />
        </View>
    );
};

export default ProductList;
