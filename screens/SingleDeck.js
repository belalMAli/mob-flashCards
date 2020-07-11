import React, { Component } from "react";
import { Button, Text, AsyncStorage, View, Alert, StyleSheet } from "react-native";
import { FLASHCARDS_STORAGE_KEY } from '../utils/api'

export default class SingleDeck extends Component {
    state = {
        data: null
    }
    createAlert = () =>
        Alert.alert(
            "Are You Sure ?",
            "",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "DELETE", onPress: this.deleteDeck }
            ],
            { cancelable: false }
        );
    deleteDeck = () => {
        const { deckID } = this.props.route.params
        let newData = { ...this.state.data }
        if (newData && newData[deckID]) {
            delete newData[deckID];
            AsyncStorage.setItem(
                FLASHCARDS_STORAGE_KEY,
                JSON.stringify(newData)
            )
            this.props.navigation.goBack()
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((data) => {
            this.setState({ data: JSON.parse(data) });
        })
        this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((data) => {
                this.setState({ data: JSON.parse(data) })
            });
        })
    }
    render() {
        let selectedDeck = null
        if (this.state.data && this.state.data[this.props.route.params.deckID]) {
            selectedDeck = this.state.data[this.props.route.params.deckID]
        }
        return (
            <View style={styles.contentContainer}>
                {selectedDeck === null ? <Text>Waiting...</Text> : <View>
                    <Text style={styles.deckTitle}>
                        {selectedDeck.title}
                    </Text>
                    <Text style={styles.cardsNo}>
                        {selectedDeck.questions.length}
                        {selectedDeck.questions.length === 1 ? 'card' : 'cards'}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            title='Add Card'
                            onPress={() => this.props.navigation.navigate('add card', {
                                deckID: selectedDeck.title,
                            })}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title='start quiz'
                            onPress={() => this.props.navigation.navigate('quiz', {
                                deckID: selectedDeck.title,
                            })}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title='delete deck'
                            onPress={this.createAlert}
                        />
                    </View>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 50,
        paddingLeft: 30,
        paddingRight: 30
    },
    deckTitle: {
        textAlign: 'center',
        color: '#cc938b',
        fontSize: 19,
        marginBottom: 30
    },
    cardsNo: {
        textAlign: 'center',
        marginBottom: 30
    },
    buttonContainer: {
        marginBottom: 40
    }
});