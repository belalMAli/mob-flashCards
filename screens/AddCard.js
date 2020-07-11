import React, { Component } from 'react'
import {
  View,
  Button, 
  TextInput,
  StyleSheet
} from 'react-native'
import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from '../utils/api'

class AddCard extends Component {
  onAddCardPress = async () => {
    const deckId = this.props.route.params.deckID
    const { question, answer } = this.state
    if (!question) {
      return alert('Enter Value for Question Field')
    } else if (!answer) {
      return alert('Enter Value for Answer Field')
    }
    const data = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    if (data) {
      let newData = JSON.parse(data)
      newData[deckId].questions.push({question,answer})
      await AsyncStorage.setItem(
        FLASHCARDS_STORAGE_KEY,
        JSON.stringify(newData)
      )
    }
    this.props.navigation.goBack()
  }

  state = {
    question: '',
    answer: ''
  }

  onChangeQuestion = (question) => {
    this.setState({ question })
  }
  onChangeAnswer = (answer) => {
    this.setState({ answer })
  }

  render() {
    return (
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.txtInput}
          onChangeText={text => this.onChangeQuestion(text)}
          value={this.state.question}
          placeholder="Question"
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={text => this.onChangeAnswer(text)}
          value={this.state.answer}
          placeholder="Answer"
        />
        <Button
          title='Add'
          onPress={this.onAddCardPress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    marginTop: 100,
    paddingLeft: 30,
    paddingRight: 30
  },
  txtInput: { 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 30, 
    padding: 10 
  }
});

export default AddCard

