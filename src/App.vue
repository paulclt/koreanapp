<script setup>
import { ref } from "vue"
import dataset from './assets/words.json'

// CONST
const MAXQUESTION = 10

//JSON
const units = ref(dataset["datasets"])

// text variable
const questionText = ref("level 1 : Greetings and Introduction")
const rightButtonText = ref("click to start")
const leftButtonText = ref("")
const orderText = ref("NOT RANDOM")
const word = ref("")
const translation = ref("")

// display header hidden menu
const menuIsActive = ref(false)

// which set is studied 
const currentLevel = ref(0)
const currentUnit = ref(1)

//game logic
let nbRQuestion = MAXQUESTION
const gameIsOn = ref(false)
const score = ref(0)
const nbQuestion = ref(dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length)
const nbTries = ref(0)
let wordId = 0
let random = false
let wordIdRList = []

function getRandom(max) {
    let value = Math.floor(Math.random() * max)
    while(wordIdRList.includes(value)) {
      value = Math.floor(Math.random() * max)
    }
    return value
}

function toggleMenu() {
  menuIsActive.value = !menuIsActive.value
}

function showTranslation() {
  if(gameIsOn.value) {
    questionText.value === word.value ? questionText.value = translation.value : questionText.value = word.value
  }
}

function resetScore(){
  if(dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length < MAXQUESTION) {
    nbRQuestion = dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length
  } else {
    nbRQuestion = MAXQUESTION
  }
  random ? nbQuestion.value = nbRQuestion : nbQuestion.value = dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length
  nbTries.value = 0
  score.value = 0
  wordId = 0
  wordIdRList.length = 0
  random ? prepareRQuestion() : null
}

function prepareRQuestion () {
  for(let i=0; i<nbRQuestion; i++) {
    wordIdRList.push(getRandom(dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length))
  }
}

function setOrder() {
  orderText.value === "RANDOM" ? orderText.value = "NOT RANDOM" : orderText.value = "RANDOM"
  random = !random
  resetScore()
  gameIsOn.value ? nextWord() : null
}

function checkScore(){
  if(nbTries.value===nbQuestion.value){
    alert("your score : " + score.value + " / " + nbQuestion.value)
    resetScore()
  }
}

function nextWord() {
  rightButtonText.value = "Got it!"
  leftButtonText.value = "Study again"

  gameIsOn.value = true

  if(random) {
    word.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordIdRList[wordId]]["word"]
    translation.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordIdRList[wordId]]["translation"]
  } else {
    word.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordId]["word"]
    translation.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordId]["translation"]
  }
  
  questionText.value = word.value
  wordId++
}

function gotIt(){
  if(gameIsOn.value) {
    score.value++
    nbTries.value++
    checkScore()
  }
  nextWord()
}

function studyAgain() {
  if(gameIsOn.value) {
    nbTries.value++
    checkScore()
    nextWord()
  }
}

function changeUnit(level, unit, text) {
  toggleMenu()

  let textLevel = level+1
  questionText.value = "level " + textLevel + " : " + text
  rightButtonText.value = "click to start"
  leftButtonText.value = ""

  gameIsOn.value = false

  currentLevel.value = level
  currentUnit.value = unit
  resetScore()
}
</script>


<template>
  <div class="container">
    <nav>
      <div class="menu unselectable">
        <div class="menu-toggle" @click="toggleMenu()">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
        <div class="menuItem desktopColor" @click="setOrder()">
          <span class="dropbtn">{{ orderText }}</span>
        </div>
        <div class="menuItem">
          <span>SCORE : {{ score }}</span>
        </div>
        <div class="menuItem">
          <span>QUESTION : {{ nbTries + "/" + nbQuestion }}</span>
        </div>
      </div>
      
      <ul class="hiddenMenu unselectable" :class="{'open': menuIsActive}">
        <li class="hiddenMenuItem" v-for="unit in units[0]" :key="unit.id" @click="changeUnit(0, unit.id, unit.name)">{{ "Level 1 -> " + unit.id + " : " + unit.name }}</li>
        <li class="hiddenMenuItem" v-for="unit in units[1]" :key="unit.id" @click="changeUnit(1, unit.id, unit.name)">{{ "Level 2 -> " + unit.id + " : " + unit.name }}</li>
      </ul>
    </nav>

    <main>
      <div @click="showTranslation()" class="middle center unselectable" :class="{ middleGame: gameIsOn }"><p>{{ questionText }}</p></div>
      <div @click="studyAgain()" class="bottomLeft center unselectable" :class="{ left: gameIsOn }">{{ leftButtonText }}</div>
      <div @click="gotIt()" class="bottomRight center unselectable right">{{ rightButtonText }}</div>
    </main>
  </div>
</template>
 
<style scoped>
.container {
  font-family: sans-serif;
  color: black;
}

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

/* ###--- header START ---### */

nav {
    background-color: #ecf0f1;
    padding: 10px 0;
    padding-top: 0px;
    padding-bottom: 0px;
}

.menu {
  display: flex;
  align-items: center;
}

.menu-toggle {
    display: block;
    padding: 10px;
}

.menuItem {
  padding: 16px;
}

.bar {
    width: 25px;
    height: 3px;
    background-color: black;
    margin: 5px 0;
}

.hiddenMenu {
    display: none;
    list-style: none;
    padding-left: 0;
    margin: 0;
}

.hiddenMenuItem {
  margin-top: 10px;
  border-bottom: 1px solid black;
}


.hiddenMenu li {
    color: black;
    text-decoration: none;
    padding-left: 10px;
}

.hiddenMenu.open {
    display: block;
}

/* ###--- header END ---### */
/* ###--- main START ---### */

main {
  height: 70vh;
  font-size: 1.5em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.middle {
  width: 100%;
  height: 70%;
  background-color: white;
}

.bottomLeft {
  width: 50%;
  height: 30%;
  background-color: white;
}

.left {
  background-color: #3498db;
}

.bottomRight {
  width: 50%;
  height: 30%;
  background-color: rgb(39, 174, 96);
}

/* ###--- main END ---### */

@media screen and (min-width: 1024px) {
  main {
    height: 90vh;
  }

  .middleGame:hover{
    color: #2980b9;
  }

  .menu-toggle:hover{
    background-color: #2980b9;
  }

  .desktopColor:hover{
    background-color: #2980b9;
  }

  .hiddenMenuItem:hover{
    color: #2980b9;
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }
}
</style>