import React, { Component } from 'react';
import AddDeck from './screens/AddDeck'
import AllDecks from './screens/AllDecks'
import SingleDeck from './screens/SingleDeck'
import AddCard from './screens/AddCard'
import Quiz from './screens/Quiz'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { setLocalNotification } from './utils/notifications'


const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function DeckStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={AllDecks} />
      <Stack.Screen name="single deck" component={SingleDeck} />
      <Stack.Screen name="add card" component={AddCard} />
      <Stack.Screen name="quiz" component={Quiz} />
    </Stack.Navigator>
  );
}
class App extends Component {

  componentDidMount = () => {
    setLocalNotification()
  }
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={DeckStack} />
          <Tab.Screen name="add deck" component={AddDeck} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

export default App