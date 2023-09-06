import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../types';

interface IProductCart {
  product: Product;
};

const ProductCart: React.FC<IProductCart> = ({ product }) => {
	useEffect(()=>console.log({product }), []); 
	return(
		<View style={styles.container}>
			<Image
				source={{ uri: product.image }}
				style={styles.image}
				resizeMode="contain"
			/>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{product.title}</Text>
				{/* <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
	  backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
  },
});

export default ProductCart;
