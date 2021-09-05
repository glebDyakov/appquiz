import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import RadioButton from 'expo-radio-button'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Progress from 'expo-progress';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Lobby">
        <Stack.Screen name="Lobby" component={Lobby} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Result({ navigation, route }) {
  
  const { answers, allQuestions } = route.params

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>Правильные ответы { answers.filter(answer => answer).length } из { allQuestions }.</Text>
    </View>
  )
}

function Lobby({ navigation }) {

  const questionImgOne = require('./assets/magnet.jpg')
  const questionImgTwo = require('./assets/cross.jpg')
  const questionImgThree = require('./assets/five.jpg')
  const questionImgFour = require('./assets/camera.png')
  const questionImgFive = require('./assets/barcode.jpg')

  const [ selectedVariant, setSelectedVariant ] = useState(1)

  const [ currentQuestion, setCurrentQuestion ] = useState(`
    Какой тип бойца?
  `);
  const [ questions, setQuestions ] = useState([
    `Какой тип бойца?`,
    `Выбери любимую атаку?`,
    `Выбери себе звёздную силу?`,
    `Как ты обычно одеваешься?`,
    `Какой цвет тебе нравится?`
  ]);
  const [ variants, setVariants ] = useState([
    `Мифический`,
    `Сверхредкий`,
    `Эпический`,
    `Легендарный`,
    `Крутящиеся лезвия`,
    `Картечь`,
    `Лучевой бластер`,
    `Мушкетон`,
    `Плохая карма`,
    `Смертельный яд`,
    `След дыма`,
    `Жуткая жатва`,
    `Худи и шорты`,
    `Джинсы и топ`,
    `Юбка и топ`,
    `Мне не нужна одежда я робот`,
    `Серый`,
    `Розовый`,
    `Чёрный`,
    `Фиолетовый`,
  ]);
  const [ rightAnswers, setRightAnswers ] = useState([
    `Мифический`,
    `Картечь`,
    `След дыма`,
    `Мне не нужна одежда я робот`,
    `Чёрный`
  ]);
  const [ answers, setAnswers ] = useState([
    false,
    false,
    false,
    false,
    false  
  ]);

  const [ currentNumberQuestion, setCurrentNumberQuestion ] = useState(1);
  const [ allQuestions, setAllQuestions ] = useState(5);

  function toNextQuestion(){
    if(currentNumberQuestion < allQuestions){
      setCurrentNumberQuestion(currentNumberQuestion + 1);
      console.log(`Переходим к следующему вопросу № ${currentNumberQuestion + 1}`)
      
      var selectedAnswerIndex = 0
      var selectedAnswer = variants[currentNumberQuestion * 4 - 4]
      if(selectedVariant.includes("variantOne")){
        selectedAnswerIndex = 0
        selectedAnswer = variants[currentNumberQuestion * 4 - 4]
      } else if(selectedVariant.includes("variantTwo")){
        selectedAnswerIndex = 1
        selectedAnswer = variants[currentNumberQuestion * 4 - 3]
      } else if(selectedVariant.includes("variantThree")){
        selectedAnswerIndex = 2
        selectedAnswer = variants[currentNumberQuestion * 4 - 2]
      } else if(selectedVariant.includes("variantFour")){
        selectedAnswerIndex = 3
        selectedAnswer = variants[currentNumberQuestion * 4 - 1]
      }

      console.log(`selectedVariant: ${selectedVariant}`)
      console.log(`selectedAnswerIndex: ${selectedAnswerIndex}`)
      console.log(`selectedAnswer: ${selectedAnswer}`)
      console.log(`Правильный ответ: ${rightAnswers[currentNumberQuestion - 1]}`)
      
      let answerType = selectedAnswer === rightAnswers[currentNumberQuestion - 1] ? "Ответ правильный" : "Ответ неправильный"
      console.log(`answerType: ${answerType}`)

      setAnswers(answers.map((answer, answerIdx) => {
        console.log(`answerIdx === currentNumberQuestion - 1: ${answerIdx === currentNumberQuestion}`)
        if(answerIdx === currentNumberQuestion - 1){
          if(selectedAnswer === rightAnswers[currentNumberQuestion - 1]){
            return true
          } else if(selectedAnswer !== rightAnswers[currentNumberQuestion - 1]){
            return false
          }
        }
        return answer
      }));
      console.log(`answers: ${answers}`)
    } else if(currentNumberQuestion >= allQuestions){
      console.log(`Переходим к результатам`)
      navigation.navigate("Result", {
        answers: answers,
        allQuestions: allQuestions
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>Вопрос { currentNumberQuestion } из { allQuestions }</Text>
      {/* <Progress.Bar isIndeterminate color="blue" width={500} progressValue={0} />; */}
      
      {
      currentNumberQuestion === 1 ?
        <Image style={{ width: 250, height: 250 }} source={ questionImgOne } />
      : currentNumberQuestion === 2 ?
        <Image style={{ width: 250, height: 250 }} source={ questionImgTwo } />
      : currentNumberQuestion === 3 ?
      <Image style={{ width: 250, height: 250 }} source={ questionImgThree } />
      : currentNumberQuestion === 4 ?
        <Image style={{ width: 250, height: 250 }} source={ questionImgFour } />
      : currentNumberQuestion === 5 ?
        <Image style={{ width: 250, height: 250 }} source={ questionImgFive } />
      : 
        <Text></Text>
      }
      <Text
        style={{ fontSize: 28, fontWeight: 3000 }}
      >{ questions[currentNumberQuestion - 1] }</Text>
      <RadioButton value="variantOne" selected={selectedVariant} onSelected={(value) => {
        setSelectedVariant(value)
      }} radioBackground="green" >
        <Text>{ variants[currentNumberQuestion * 4 - 4] }</Text>
      </RadioButton>
      <RadioButton value="variantTwo" selected={selectedVariant} onSelected={(value) => {
        setSelectedVariant(value)
      }} radioBackground="green" >
        <Text>{ variants[currentNumberQuestion * 4 - 3] }</Text>
      </RadioButton>
      <RadioButton value="variantThree" selected={selectedVariant} onSelected={(value) => {
        setSelectedVariant(value)
      }} radioBackground="green" >
      <Text>{ variants[currentNumberQuestion * 4 - 2] }</Text>
      </RadioButton>
      <RadioButton style={{  }} value="variantFour" selected={selectedVariant} onSelected={(value) => {
        setSelectedVariant(value)
      }} radioBackground="green" >
        <Text style={{ marginTop: 5 }}>{ variants[currentNumberQuestion * 4 - 1] }</Text>
      </RadioButton>
      &nbsp;
      <Button disabled={ !selectedVariant.length } style={{ marginTop: 5 }} title="Следующий вопрос" onPress={() => {
        toNextQuestion()
      }} />
    </View>
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
