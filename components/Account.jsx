import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import { createAccount, signIn, signOut } from '../functions/database';
import { useNavigation } from '@react-navigation/native';
import alert from './Alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../stylesheets/account';
import GradientButton from './Button';

const Account = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [storedUsername, setStoredUsername] = useState(null);
    const [currentPage, setCurrentPage] = useState('login');
    const [isLoading, setIsLoading] = useState(false); // Track loading state

    useEffect(() => {
        async function userStatus() {
            const extractuser = await AsyncStorage.getItem('Username');
            setStoredUsername(extractuser);
        }
        userStatus();
    }, []);

    const handleSubmit = async () => {

        setIsLoading(true);

        if (username === '' || password === '') {
            alert('Error', 'Username and password are required');
            return;
        }

        if(password != confirmPassword){

            alert('Error', 'Password and confirmed password are different');
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
        }finally {
            setIsLoading(false); 
        }
    };

    const handleSignIn = async () => {
        if (username === '' || password === '') {
            alert('Error', 'Username and password are required');
            setIsLoading(false); 
            return;
        }

        setIsLoading(true); 

        try {
            const userData = await signIn({ username, password });
            setStoredUsername(username);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error signing in:', error);
            alert('Error signing in:', 'Non-existent Password/User', [{ text: 'OK' }]);
        } finally {
            setIsLoading(false); 
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
                    <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 10 }]}>
                        Thank You for using
                    </Text>
                    <Text style={[styles.sectionTitle, { fontSize: 20, marginBottom: 40 }]}>
                        t-Indicator
                    </Text>
                    <Image
                        style={{ width: 125, height: 125, margin: -10, marginTop: -40 }}
                        source={require('../assets/adaptive-icon.png')}
                    />
                    <Text style={[styles.sectionTitle, { fontSize: 17, color: 'grey', marginBottom: 20 }]}>
                    Concession
                    </Text>
                    <Text style={[styles.sectionTitle, { fontSize: 14, color: 'grey' }]}>
                    Senior Citizens: 100%
                    </Text>
                    <Text style={[styles.sectionTitle, { fontSize: 14, color: 'grey' }]}>
                    Women/ Divyangjan: 50%
                    </Text>
                    <Text style={[styles.sectionTitle, { fontSize: 14, marginBottom: 40, color: 'grey' }]}>
                    Student Pass: 50%
                    </Text>
                    <Button title="Log Out" color="#FF0000" onPress={handleLogout} />
                </View>
            ) : (
                <View style={styles.sectionContainer}>
                    <Text style={[styles.sectionTitle, { fontSize: 29 }]}>Welcome to TMT!</Text>
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
                             <TextInput
                                style={styles.input}
                                placeholder="Confirm Password"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                onSubmitEditing={handleSubmit} 
                            />
                            <View style={styles.b}>
                                <GradientButton title="Sign Up" onPress={handleSubmit} />
                            </View>

                            {isLoading && (
                                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                            )}
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
                                onSubmitEditing={() => {
                                    if (password !== '') handleSignIn(); // Trigger handleSignIn only if password is not empty
                                }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                onSubmitEditing={handleSignIn} // Trigger handleSignIn on pressing Enter
                            />
                            
                            <Text style = {{margin: 10, fontFamily: 'Bahnschrift'}}> or.. </Text>
                            <GradientButton title="Sign Up" onPress={() => setCurrentPage('signup')} />

                            {isLoading && (
                                <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
                            )}
                        </>
                    )}
                </View>
            )}
        </SafeAreaView>
    );
};



export default Account;
