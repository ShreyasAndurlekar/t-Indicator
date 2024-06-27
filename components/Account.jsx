// App.js
import React, { useState } from 'react';
import { SafeAreaView,StyleSheet,View,Text,TextInput,Button,Alert,} from 'react-native';
import { createAccount, signIn, signOut } from '../functions/database';
import { useNavigation } from '@react-navigation/native';

const Account = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {

        if (username === '' || password === '') {
            Alert.alert('Error', 'Username and password are required');
            return;
        }

        const newAccount = { username, password };
        
        try {
            const createdAccount = await createAccount(newAccount);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error creating account:', error);
            Alert.alert('Error creating account', 'Similar username already exists', [
                            
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              
            ]);
        }
    };

    const handleSignIn = async () => {
        if (username === '' || password === '') {
            Alert.alert('Error', 'Username and password are required');
            return;
        }

        try {
            const userData = await signIn({ username, password });
            navigation.navigate('Home');
            
        } catch (error) {
        
            console.error('Error signing in:', error);
            Alert.alert('Error signing in:', 'Non-existent Password/User', [
                            
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              
            ]);
        }
    };

    const handleLogout = async() => {

        signOut()
        navigation.navigate("Home")
    }

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Become a member</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    <View style = {styles.b}>
                        <Button title="Sign Up" onPress={handleSubmit}/>
                    </View>
                    <View style = {styles.b}>
                        <Button title="Sign In" onPress={handleSignIn}/>
                    </View>
                    <View style = {styles.b}>
                        <Button title="Logout" onPress={handleLogout}/>
                    </View>
                    
                    
                </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        width: 600,
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        width: 200
    },
    b:{
        width: 100,
        marginBottom: 10,
    }
});



export default Account;
