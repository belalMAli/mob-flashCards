import React, { Component } from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'
import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from '../utils/api'

class AddDeck extends Component {
  Submit = async () => {
    const { title } = this.state
    if (!title) {
      return alert('Enter Value for title Field')
    }
    const data = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    if (data) {
      let newData = JSON.parse(data)
      newData[title] = {
        title: title,
        questions: []
      }
      await AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(newData)
      )
    }
    this.props.navigation.navigate('single deck', {
      deckID: title,
    })
  }

  state = {
    title: '',
  }

  handleChange = (title) => {
    this.setState({ title })
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.txtInput}
          onChangeText={text => this.handleChange(text)}
          value={this.state.title}
          placeholder="Deck Title"
        />
        
        <Button
          title='Add Deck'
          onPress={this.Submit}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 200,
    paddingLeft: 30,
    paddingRight: 30
  },
  txtInput: { 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 30, 
    padding: 20 
  }
});
export default AddDeck

