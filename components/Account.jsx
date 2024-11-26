import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, Button, Image } from 'react-native';
import { createAccount, signIn, signOut } from '../functions/database';
import { useNavigation } from '@react-navigation/native';
import alert from './Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Account = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [storedUsername, setStoredUsername] = useState(null);
    const [currentPage, setCurrentPage] = useState('login'); // Tracks the active page

    useEffect(() => {
        async function userStatus() {
            const extractuser = await AsyncStorage.getItem('Username');
            setStoredUsername(extractuser);
        }
        userStatus();
    }, []);

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
            alert('Success', 'Account created successfully', [{ text: 'OK', onPress: () => setCurrentPage('login') }]);
        } catch (error) {
            console.error('Error creating account:', error);
            alert('Error creating account', 'Similar username already exists', [{ text: 'OK' }]);
        }
    };

    const handleSignIn = async () => {
        if (username === '' || password === '') {
            alert('Error', 'Username and password are required');
            return;
        }

        try {
            const userData = await signIn({ username, password });
            setStoredUsername(username);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in:', 'Non-existent Password/User', [{ text: 'OK' }]);
        }
    };

    const handleLogout = async () => {
        signOut();
        setStoredUsername(null);
        setCurrentPage('login');
    };

    return (
        <SafeAreaView style={styles.container}>
            {storedUsername ? (
                // Profile Page
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 40 }]}>
                        Thank You for using TMT App, {storedUsername}
                    </Text>
                    <Button title="Log Out" color="#FF0000" onPress={handleLogout} />
                </View>
            ) : (
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { fontSize: 24 }]}>Welcome to TMT!</Text>
                    <Image
                        style={{ width: 125, height: 125 }}
                        source={require('../assets/adaptive-icon.png')}
                    />
                    {currentPage === 'signup' && (
                        <>
                            <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 20 }]}>
                                Create a new account
                            </Text>
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
                            <View style={styles.b}>
                                <Button title="Sign Up" onPress={handleSubmit} />
                            </View>
                        </>
                    )}
                    {currentPage === 'login' && (
                        <>
                            <Text style={[styles.sectionTitle, { fontSize: 18, marginBottom: 20 }]}>
                                Login to your account
                            </Text>
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
                            <View style={styles.b}>
                                <Button title="Sign In" onPress={handleSignIn} />
                            </View>
                            <Text style = {{margin: 10, fontFamily: 'Bahnschrift'}}> or.. </Text>
                            <Button title="Sign Up" onPress={() => setCurrentPage('signup')} />
                        </>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        marginTop: 10,
        paddingHorizontal: 24,
        width: 600,
        alignItems: 'center',
        marginRight: 10
        
    },
    sectionTitle: {
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Bahnschrift'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        width: 200,
        fontFamily: 'Bahnschrift'
    },
    b: {
        width: 100,
        marginBottom: 10,
    },
});

export default Account;
