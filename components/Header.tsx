import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp, NavigationRoute, NavigationParams } from 'react-navigation';
import AddBtn from './AddBtn'; 


interface IHeader {
    title: string;
    navigation: NavigationScreenProp<NavigationRoute, NavigationParams>
}

const Header:FC<IHeader> = ({title, navigation}) => {
    const handleRedirect = () => {
        navigation.navigate('NewProduct');
    }

    return (
       <View style={styles.header}>
           <View />
           <View>
               <Text style={styles.headerTitle}>{title}</Text>
           </View>
           <View>
               <AddBtn handleClick={handleRedirect}/>
           </View>

       </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 80,
        width: '100%',
        backgroundColor: '#64615e',
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingTop: 35,
        paddingHorizontal: 20,
    },
    headerTitle: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
    },
    addTaskBtn: {
        backgroundColor: 'tomato',
        padding: 6,
        margin: 0,
        borderRadius: 30,
    },
});

export default Header;
