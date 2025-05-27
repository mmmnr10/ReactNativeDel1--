import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default function App() {
  const [guess, setGuess] = useState("");
  const [numberToGuess, setNumberToGuess] = useState(generateRandomNumber());
  const [tries, setTries] = useState(0);

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function handleGuess() {
    const numericGuess = parseInt(guess);
    if (isNaN(numericGuess)) {
      Alert.alert("Fel", "Skriv ett giltigt nummer!");
      return;
    }

    setTries(tries + 1);

    if (numericGuess === numberToGuess) {
      Alert.alert("🎉 Grattis!", `Du gissade rätt på ${tries + 1} försök!`, [
        {
          text: "Spela igen",
          onPress: () => {
            setNumberToGuess(generateRandomNumber());
            setTries(0);
            setGuess("");
          },
        },
      ]);
    } else if (numericGuess < numberToGuess) {
      Alert.alert("📉 För lågt", "Försök med ett högre tal.");
    } else {
      Alert.alert("📈 För högt", "Försök med ett lägre tal.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎯 Gissa ett tal mellan 1–100</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Din gissning här"
        value={guess}
        onChangeText={setGuess}
        placeholderTextColor="#ccc"
      />
      <View style={styles.button}>
        <Button title="Gissa!" color="#4CAF50" onPress={handleGuess} />
      </View>
      <Text style={styles.tries}>
        Försök: <Text style={styles.triesNum}>{tries}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2f",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#ffffff",
    marginBottom: 25,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    width: "80%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    color: "#fff",
    backgroundColor: "#2c2c3c",
  },
  button: {
    width: "60%",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
  },
  tries: {
    color: "#ccc",
    fontSize: 18,
  },
  triesNum: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
