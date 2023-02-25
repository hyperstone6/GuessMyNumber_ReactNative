import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions
} from "react-native";
import Buttons from "./Buttons";

const GameContainer = ({
  selectedNum,
  handleRandomNums,
  random,
  won,
  restart,
  oldGuess,
}) => {
  const randomize = (sign) => {
    const alertMsg = () =>
      Alert.alert("Don't lie", "You stinky wanka", [{ text: "Sooorry :'(" }]);
    if (sign == "+") {
      if (random < selectedNum) {
        handleRandomNums(sign);
      } else {
        return alertMsg();
      }
    } else if (sign == "-") {
      if (random > selectedNum) {
        handleRandomNums(sign);
      } else {
        return alertMsg();
      }
    }
  };

  const {width, height} = useWindowDimensions()

  let marginTop = height < 400 ? '2%' : '25%'

  return (
    <View style={[styles.container, {marginTop: marginTop}]}>
      <Text style={styles.headerText}>Opponent's Guess</Text>
      <Text style={styles.guessText}>{selectedNum}</Text>
      <View style={styles.main}>
        <Text style={styles.secondaryText}>Higher or Lower?</Text>
        <Text style={styles.secondaryText}>{random}</Text>
        {won ? (
          <Buttons handleButtonPress={restart}>Restart Game</Buttons>
        ) : (
          <View style={styles.buttonContainer}>
            <Buttons handleButtonPress={() => randomize("-")}>-</Buttons>
            <Buttons handleButtonPress={() => randomize("+")}>+</Buttons>
          </View>
        )}
      </View>
      <View style={styles.oldGuessContainer}>
        <FlatList
          data={oldGuess}
          renderItem={({ item }) => (
            <View style={styles.oldGuess}>
              <Text style={styles.oldGuessText}>#{item.id}</Text>
              <Text style={styles.oldGuessText}>Guess: {item.number}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: deviceWidth > 450 ? 35 : 30,
    fontWeight: "bold",
    borderColor: "white",
    borderWidth: 3,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  guessText: {
    color: "gold",
    fontSize: deviceWidth > 450 ? 45 : 35,
    fontWeight: "bold",
    borderColor: "gold",
    borderWidth: 3,
    paddingHorizontal: 25,
    paddingVertical: 10,
    textAlign: "center",
    marginVertical: 20,
    borderRadius: 5,
  },
  main: {
    backgroundColor: "#3A021E",
    width: 300,
    height: deviceHeight > 750 ? 200 : 170,
    padding: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    elevation: 8,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  secondaryText: {
    color: "white",
    fontSize: 20,
  },
  oldGuessContainer: {
    flex: 1,
    marginTop: 10,
    maxHeight: deviceHeight > 750 ? 380 : 260,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  oldGuess: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    borderRadius: 10,
    marginBottom: 5,
    paddingVertical: 5,
    width: 250,
  },
  oldGuessText: {
    color: "white",
    paddingHorizontal: 10,
  },
});

export default GameContainer;
