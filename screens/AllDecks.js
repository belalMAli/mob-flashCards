import React, { Component } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getDecks, initiateDecks } from "../utils/api";
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class AllDecks extends Component {
  state = {
    decks: null,
  }

  componentDidMount() {
    initiateDecks();
    getDecks().then((decks) => { this.setState({ decks }) });
    this.props.navigation.addListener('focus', () => {
      getDecks().then((decks) => { this.setState({ decks }) });
    })
  }

  // componentDidUpdate() {
  //   getDecks().then((decks) => { this.setState({ decks }) });
  // }

  deckButton = ({ deck }) => {
    return (
      <View key={deck.title} style={styles.buttonContainer}>
        <Button
          color="#dec7c5"
          title={`${deck.title}
Cards: ${deck.questions.length}`}
          onPress={() => this.props.navigation.navigate('single deck', {
            deckID: deck.title,
          })}
        />
      </View>
    )
  }

  render() {
    const decksOverview = [];
    if (this.state.decks) {
      Object.keys(this.state.decks).forEach((key, _index) => {
        decksOverview.push(this.deckButton({ deck: this.state.decks[key] }));
      });
    }
    return (
      <View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <Text style={styles.headingText}>
              Your Decks...
            </Text>
            {decksOverview}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 50,
  },
  buttonContainer: {
    margin: 20
  },
  headingText: {
    fontSize: 15,
    color: '#968886',
    lineHeight: 50,
    textAlign: 'center',
  }
});


export default AllDecks