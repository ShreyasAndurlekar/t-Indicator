import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
        width: 600,
        alignItems: 'center',
        marginRight: 10
    },
    sectionTitle: {
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Bahnschrift',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        width: 200,
        fontFamily: 'Bahnschrift',
        borderRadius: 8
    },
    b: {
        width: 100,
        marginBottom: 10,
    },
    loader: {
        marginTop: 20,
    },
});

export default styles