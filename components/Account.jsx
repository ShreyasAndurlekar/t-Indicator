import React, { useState, useEffect } from 'react';
import { SafeAreaView,StyleSheet,View,Text,TextInput,Button,Image} from 'react-native';
import { createAccount, signIn, signOut } from '../functions/database';
import { useNavigation } from '@react-navigation/native';
import alert from './Alert'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {

    const navigation = useNavigation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [storedUsername, setStoredUsername] = useState(null);

    useEffect(() => {
        
        async function userStatus() {
        
            const extractuser = await AsyncStorage.getItem('Username');
            setStoredUsername(extractuser)

        }

    userStatus()

    },[])

    const handleSubmit = async () => {

        if (username === '' || password === '') {

            alert('Error', 'Username and password are required');
            return;
        }

        const newAccount = { username, password };
        
        try {

            const createdAccount = await createAccount(newAccount);
            setUsername('');
            setPassword('');

        } catch (error) {

            console.error('Error creating account:', error);

            alert('Error creating account', 'Similar username already exists', [
                            
                {text: 'OK', onPress: () => console.log('')},
              
            ]);
        }
    };

    const handleSignIn = async () => {

        if (username === '' || password === '') {

            alert('Error', 'Username and password are required');
            return;
        }

        try {

            const userData = await signIn({ username, password });
            navigation.navigate('Home');
            
        } catch (error) {
        
            console.error('Error signing in:', error);

            alert('Error signing in:', 'Non-existent Password/User', [
                            
                {text: 'OK', onPress: () => console.log('')},
              
            ]);
        }
    };

    const handleLogout = async() => {

        signOut()
        navigation.navigate("Home")
    }

    return storedUsername == null ? (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle, { fontSize: 24 }]}>Welcome to TMT!</Text>
                <Image
                    style={{ width: 125, height: 125 }}
                    source={require('../assets/adaptive-icon.png')}
                />
                <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 20 }]}>Become a member</Text>
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
                <View style={[styles.b, { marginTop: 10 }]}>
                    <Button title="Sign Up" onPress={handleSubmit} />
                </View>
                <Text style={[styles.sectionTitle, { fontSize: 14, marginTop: 30, marginBottom: 20 }]}>
                    Already a member?
                </Text>
                <View style={styles.b}>
                    <Button title="Sign In" onPress={handleSignIn} />
                </View>
            </View>
        </SafeAreaView>
    ) : (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionContainer}>
                <View style={styles.b}>
                    <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 40 }]}>Thank You for using TMT App</Text>
                    <Button title="Log Out" color = "#FF0000" onPress={handleLogout} />
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
        marginTop: 10,
        paddingHorizontal: 24,
        width: 600,
        alignItems: 'center'
    },
    sectionTitle: {
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
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
