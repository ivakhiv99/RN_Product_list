import { View, StyleSheet, Image, Text, ScrollView } from "react-native";
import { Product } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useEffect, useState } from "react";
import { NavigationParams, NavigationRoute, NavigationScreenProp } from "react-navigation";

interface IProductDetails {
	navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
}

const ProductDetails:FC<IProductDetails> = ({navigation}) => {
	const [product, setProduct] = useState<Product | null>(null);

	const getProductData = async () => {
		const products = await AsyncStorage.getItem('productList');
		if(products){
			const id = navigation.getParam('id');
			const productData = JSON.parse(products).filter((item: Product) => item.id === id)[0];
			console.log('ProductDetails', {productData});
			setProduct(productData);
		}
	}

	useEffect(() => {getProductData()}, []);

	if(product) {
		return (
			<ScrollView  style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: product.image }}
						style={styles.productImage}
						resizeMode="contain"
					/>
				</View>
				<View style={styles.textContainer}>
					<Text style={styles.productTitle}>{product.title}</Text>
					<Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
					<Text style={styles.productDescription}>{product.description}</Text>
				</View>
			</ScrollView>
		);
	} else {
		return(
			<Text>loader</Text>
		)
	}
};
 
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		borderRadius: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	imageContainer: {
		paddingVertical: 10,
		height: 'auto',
		minHeight: 200,
		maxHeight: 500,
	},
	productImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		marginBottom: 8,
	},
	textContainer: {
		paddingHorizontal: 16,
	},
	productTitle: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	productPrice: {
		fontSize: 18,
		color: 'green',
	},
	productDescription: {
		fontSize: 16,
		paddingBottom: 10,
	},
});

export default ProductDetails;
