import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NewProductFormData } from "../types";



const NewProduct = () => {
    const [triedToSubmit, setTriedToSubmit] = useState<boolean>(false);
    const initialValues:NewProductFormData = {
        title: '',
        price: '',
        description: '',
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, 'Product title must be at least 3 characters long')
            .max(50, "Product title can't be longer than 50 characters")
            .required('Title is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .min(0, 'Price cannot be negative')
            .test('maxDecimalPlaces', "Price can't have more than 2 decimal places", (value) => {
                if (!value) return true;
                return /^[0-9]*(\.[0-9]{1,2})?$/.test(value.toString());
            })
            .test('correctDecimalDisplay', "Price should start from 0", (value) => {
                if (!value) return true;
                const stringValue = value.toString();
                const parts = stringValue.split('.');
                return parts.length === 1 || (parts.length === 2 && /^\d+$/.test(parts[0]));
            })
            .required('Price is required'),
        description: Yup.string()
            .min(5, 'Product description must be at least 5 characters long')
            .max(500, "Product description can't be longer than 500 characters")

    });

    const handleSaveData = async (values:NewProductFormData) => {
        const dataFromAsyncStorage = await AsyncStorage.getItem('productList');
        if(dataFromAsyncStorage) {
            const newData = JSON.parse(dataFromAsyncStorage);
            newData.push(values);
            console.log({newData})
        }
    } 

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema} 
            onSubmit={(values) => {
                console.log('form submited')
                // TODO: add data to async storage
                handleSaveData(values);
            }}
        >
            {({values, errors, handleChange, handleSubmit}) => (
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Product title"
                        onChangeText={handleChange('title')}
                        value={values.title}                        
                    />
                    {triedToSubmit && errors.title && <Text style={{ color: 'red' }}>{errors.title}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        onChangeText={handleChange('price')}
                        value={values.price}                        
                    />
                    {triedToSubmit && errors.price && <Text style={{ color: 'red' }}>{errors.price}</Text>}

                    <TextInput
                        style={styles.textArea}
                        placeholder="Product description"
                        onChangeText={handleChange('description')}
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                        value={values.description}                        
                    />
                    {triedToSubmit && errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}

                    <Button title="Submit" onPress={() => {
                        setTriedToSubmit(true);
                        handleSubmit();
                    }} />
                </View>
            )}
        </Formik>
    );
};


const styles = StyleSheet.create({
    formContainer: {
        padding: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    textArea: {
        height: 'auto',
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    }
});


export default NewProduct;
