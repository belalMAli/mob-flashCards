import React, { Component } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from '../utils/api'
import FlipComponent from 'react-native-flip-component';
import { clearLocalNotification, setLocalNotification } from '../utils/notifications'


export default class Quiz extends Component {
    state = {
        deckData: null,
        score: 0,
        cardNo: 0,
        userAnswer: '',
        isFlipped: false
    }
    handleSubmit = () => {
        let { score, cardNo, userAnswer } = this.state
        const cardAnswer = this.state.deckData.questions[cardNo].answer
        if (!userAnswer) {
            return alert('Please Enter Your Answer')
        }
        if (userAnswer === cardAnswer) {
            score++
            cardNo++
            userAnswer = ''
            this.setState({ score, cardNo, userAnswer })
        } else {
            cardNo++
            userAnswer = ''
            this.setState({ score, cardNo, userAnswer })
            return alert(`Wrong answer, The answer is ${cardAnswer}`)
        }
    }
    skipQuestion = () => {
        let { cardNo, userAnswer } = this.state
        cardNo++
        userAnswer = ''
        this.setState({ cardNo, userAnswer, isFlipped: false })
    }
    restrartQuiz = () => {
        this.setState({ score: 0, cardNo: 0, userAnswer: '' })
    }
    QuizCard = (card) => {
        return (
            <View>
                <Text style={styles.cardsNo}>
                    Card No: {this.state.cardNo + 1} of {this.state.deckData.questions.length}
                </Text>
                <FlipComponent
                    isFlipped={this.state.isFlipped}
                    frontView={
                        <View>
                            <Text style={styles.question}>
                                Q : {card.question}
                            </Text>
                            <TextInput
                                style={styles.txtInput}
                                onChangeText={(userAnswer) => this.setState({ userAnswer })}
                                value={this.state.userAnswer}
                                placeholder="Your Answer"
                            />
                        </View>
                    }
                    backView={
                        <View>
                            <Text style={styles.answer}>
                                Answer is: {card.answer}
                            </Text>
                        </View>
                    }
                />
                {this.state.isFlipped === false ? <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.setState({ isFlipped: !this.state.isFlipped })
                        }}
                        title="View Answer"
                    />
                </View>
                    : <View style={styles.buttonContainer}>
                        <Button
                            onPress={this.skipQuestion}
                            title="Next Question"
                        />
                    </View>}
                {!this.state.isFlipped && <Button
                    title='Submit'
                    onPress={this.handleSubmit}
                />}

            </View>
        )
    }
    componentDidMount = () => {
        const deckId = this.props.route.params.deckID
        AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then((data) => {
            this.setState({ deckData: JSON.parse(data)[deckId] });
        })
        clearLocalNotification()
            .then(setLocalNotification)
    }
    render() {
        const { deckData, score, cardNo } = this.state
        return (
            <View style={styles.contentContainer}>
                {(deckData && deckData.questions.length > 0) ? cardNo < deckData.questions.length ? <View>
                    {/* <Text style={styles.score}>Your Score: {score}</Text> */}
                    {this.QuizCard(deckData.questions[cardNo])}
                </View> : <View>
                        <Text style={styles.quizComplete}>Quiz Complete</Text>
                        <Text style={styles.score}>Your Score: {score}</Text>
                        <Button
                            onPress={this.restrartQuiz}
                            title="Restart Quiz"
                        />
                    </View>
                    :
                    <Text>Deck has no cards!</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        marginTop: 40,
        paddingLeft: 30,
        paddingRight: 30
    },
    buttonContainer: {
        marginBottom: 30
    },
    headingText: {
        fontSize: 15,
        color: '#968886',
        lineHeight: 50,
        textAlign: 'center',
    },
    txtInput: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 30,
        padding: 10
    },
    score: {
        textAlign: 'center',
        color: '#84dbad',
        fontSize: 19,
        marginBottom: 30,
    },
    cardsNo: {
        textAlign: 'center',
        fontSize: 15,
        marginBottom: 15
    },
    question: {
        color: '#cc938b',
        fontSize: 19,
        marginBottom: 30
    },
    answer: {
        color: '#a3564b',
        fontSize: 19,
        marginBottom: 30
    },
    quizComplete: {
        color: '#cc938b',
        fontSize: 19,
        marginBottom: 30,
        textAlign: 'center'
    },
});