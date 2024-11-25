import { Alert, Platform } from 'react-native'

const alertPolyfill = (title, description, options, extra) => {
    const result = window.confirm([title, description].filter(Boolean).join('\n'))

    if (result) {
        const confirmOption = options.find(({ style }) => style !== 'cancel')
        confirmOption && confirmOption.onPress()
    } else {
        const cancelOption = options.find(({ style }) => style === 'cancel')
        cancelOption && cancelOption.onPress()
    }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export const showAlert_ = (title, description, options = []) => {
    const buttons = options.length
        ? options
        : [{ text: 'OK', style: 'default' }, { text: 'Cancel', style: 'cancel' }]

    alert(title, description, buttons)
}

export default alert