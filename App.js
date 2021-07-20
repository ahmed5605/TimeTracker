import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';

import HomeScreen from './src/HomeScreen'

LogBox.ignoreAllLogs(true)

export default function App() {
  return (
    <>
      <StatusBar backgroundColor='black'/>
      <HomeScreen/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
