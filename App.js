import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Modal,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import { LinearGradient } from "expo-linear-gradient";
import InputContainer from "./components/InputContainer";
import GameContainer from "./components/GameContainer";

export default function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState("");
  const [randomNums, setRandomNums] = useState({
    min: 1,
    max: 10000,
  });
  const [random, setRandom] = useState(50);
  const [oldGuess, setOldGuess] = useState([]);
  const [won, setWon] = useState(false);
  const [hideModal, setHideModal] = useState(false);

  useEffect(() => {
    setRandom(
      Math.round(
        Math.random() * (randomNums.max - randomNums.min) + randomNums.min
      )
    );
  }, [randomNums]);

  useEffect(() => {
    if (random == selectedNum) {
      setWon(true);
      Alert.alert("YAY!!!", `You made it after ${oldGuess.length} guesses!`, [
        { text: "Restart", onPress: restart },
        { text: "OK" },
      ]);
    }
  }, [random]);

  useEffect(() => {
    setTimeout(() => {
      setHideModal(true);
    }, 3000);
  }, []);

  const restart = () => {
    setWon(false);
    setRandomNums({ min: 1, max: 10000 });
    setSelectedNum("");
    setConfirmed(false);
    setOldGuess([]);
  };

  const handleConfirmed = () => {
    if (selectedNum < 1 || selectedNum > randomNums.max || isNaN(selectedNum)) {
      Alert.alert(
        "Not Allowed",
        `Provide numbers between 1 and ${randomNums.max.toString()}`
      );
    } else {
      setConfirmed(true);
    }
  };

  const handleSelectedNum = (value) => {
    setSelectedNum(parseInt(value));
  };

  const handleReset = () => {
    setSelectedNum("");
  };

  const handleRandomNums = (sign) => {
    setOldGuess((prevGuess) => [
      ...prevGuess,
      { id: oldGuess.length + 1, number: random },
    ]);

    if (sign == "+") {
      setRandomNums((prevNums) => {
        return {
          ...prevNums,
          min: random + 1,
        };
      });
    } else if (sign == "-") {
      setRandomNums((prevNums) => {
        return {
          ...prevNums,
          max: random - 1,
        };
      });
    }
  };

  return (
      <LinearGradient colors={["#224df8", "#d60fa4"]} style={styles.container}>
        <ImageBackground
          source={require("./assets/background.jpg")}
          resizeMode="cover"
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          imageStyle={{
            opacity: 0.3,
          }}
        >
          {won && <ConfettiCannon count={200} origin={{ x: 0, y: 0 }} />}
          {confirmed ? (
            <GameContainer
              selectedNum={selectedNum}
              randomNums={randomNums}
              random={random}
              oldGuess={oldGuess}
              handleRandomNums={handleRandomNums}
              won={won}
              restart={restart}
            />
          ) : hideModal ? (
            <InputContainer
              selectedNum={selectedNum}
              handleSelectedNum={handleSelectedNum}
              handleConfirmed={handleConfirmed}
              handleReset={handleReset}
              randomNums={randomNums}
            />
          ) : (
            <Modal
              animationType="fade"
              visible={!hideModal}
              style={styles.modal}
            >
              <Image
                style={styles.modalImage}
                source={require("./assets/background.jpg")}
                resizeMode="cover"
              />
            </Modal>
          )}
          <StatusBar style="auto" />
        </ImageBackground>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  modalImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
