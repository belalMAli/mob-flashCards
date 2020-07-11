import { AsyncStorage } from 'react-native'

export const FLASHCARDS_STORAGE_KEY = 'flashcards_data'

function initialData() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'a1',
          answer: 'Q'
        },
        {
          question: 'a2',
          answer: 'Q'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'a1',
          answer: 'Q'
        }
      ]
    }
  }
}

export async function initiateDecks() {
  try {
    await AsyncStorage.setItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify(initialData())
    )
  } catch (error) {
    console.log(error);
  }
}

export async function getDecks() {
  // const allDecks = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
  // if (allDecks) {
  //   const data = JSON.parse(allDecks)
  //   return data
  // } 
  // else {
  //   await AsyncStorage.setItem(
  //     FLASHCARDS_STORAGE_KEY,
  //     JSON.stringify(initialData())
  //   )
  //   // return initialData()
  //   getDecks()
  // }
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
      .then(decks => Object.values(JSON.parse(decks)))
      .catch(error => console.log(error))
}