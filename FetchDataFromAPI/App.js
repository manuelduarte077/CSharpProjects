import {SafeAreaView, StyleSheet} from 'react-native'
import ProductListScreen from './screens/ProductListScreen'

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ProductListScreen/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
