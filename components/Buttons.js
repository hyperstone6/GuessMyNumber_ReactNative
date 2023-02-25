import { Pressable, View, Text, StyleSheet } from "react-native";

const Buttons = ({handleButtonPress, children}) => {
    return (
        <View>
            <Pressable style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText} >{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 10,
        backgroundColor: 'red',
        marginHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        minWidth: 70,
        maxWidth: 150,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    }
})

export default Buttons