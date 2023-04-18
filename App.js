import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ENTER YOUR STUFF HERE</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="TYPE RIGHT HERE"
        />
      </View>
      <Button style={styles.button1}>
        onPress={onPressLearnMore}
        title="Learn More"
        accessibilityLabel="Learn more about this purple button" 
      </Button>

    </View>
  );
};

const SecondScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SECOND SCREEN</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Second" component={SecondScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -250,
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -275,
    left: -20,
  },
  input: {

    width: '90%',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  button1 : {
    backgroundColor: "#841584",
  }
});

export default App;