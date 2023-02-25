import { StyleSheet, View, Text, TextInput, Dimensions } from "react-native";
import Buttons from "./Buttons";

const InputContainer = ({
  selectedNum,
  handleSelectedNum,
  handleConfirmed,
  handleReset,
  randomNums,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Guess My Number</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>Enter a Number</Text>
        <TextInput
          style={styles.inputField}
          value={selectedNum}
          keyboardType="numeric"
          maxLength={randomNums.max}
          onChangeText={(value) => handleSelectedNum(value)}
        />
        <View style={styles.buttonContainer}>
          <Buttons handleButtonPress={handleReset}>Reset</Buttons>
          <Buttons handleButtonPress={handleConfirmed}>Confirm</Buttons>
        </View>
      </View>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: deviceHeight > 750 ? 150 : 100
  },
  headerText: {
    color: "white",
    fontSize: 30,
    marginBottom: 50,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#3A021E",
    elevation: 8,
    width: 300,
    height: deviceHeight > 750 ? 230 : deviceHeight < 300 ? 100 : 170,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
  },
  inputText: {
    color: "white",
    fontSize: 20,
  },
  inputField: {
    borderBottomColor: "gold",
    borderBottomWidth: 3,
    fontSize: 25,
    fontWeight: "bold",
    width: 100,
    paddingVertical: 1,
    textAlign: "center",
    color: "limegreen",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default InputContainer;
