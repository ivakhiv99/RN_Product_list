import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FC } from 'react';

interface IAddBtn {
    handleClick: () => void;
    disabled?: boolean;
    size?: number;
}

const AddBtn:FC<IAddBtn> = ({ handleClick, size = 24 , disabled = false}) => (
    <Pressable disabled={disabled} style={styles.addTaskBtn} onPress={handleClick}>
        <MaterialIcons name="add" size={size} color={disabled ? '#333' : "#fff"} />
    </Pressable>
);

const styles = StyleSheet.create({
    addTaskBtn: {
        backgroundColor: 'tomato',
        padding: 6,
        margin: 0,
        borderRadius: 30,
    },
});

export default AddBtn;
