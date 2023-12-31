import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../types';

interface IProductCard {
  product: Product;
};

const ProductCard: React.FC<IProductCard> = ({ product }) => (
	<View style={styles.container}>
		<Image
			source={product.image ? { uri: product.image } : require('../assets/noPicture.png')}
			style={styles.image}
			resizeMode="contain"
		/>
		<View style={styles.textContainer}>
			<Text style={styles.title}>{product.title}</Text>
			<Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
		</View>
	</View>
);

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

export default ProductCard;
