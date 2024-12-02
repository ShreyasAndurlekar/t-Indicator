import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
            <LinearGradient
                colors={['#FF0000', '#FEB47B']} 
                start={[0, 0]} // Start at the top-left
                end={[1, 0]} // End at the top-right
                style={styles.gradient}>
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 25,
        overflow: 'hidden',
    },
    gradient: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        fontFamily: 'Bahnschrift',
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
});

export default GradientButton;
