<script setup>
import { ref } from "vue"
import dataset from './assets/words.json'

//CONST
let NBRQUESTION = 10

//JSON
const units = ref(dataset["datasets"])

// text variable
const questionText = ref("level 1 : Greetings and Introduction")
const rightButtonText = ref("click to start")
const leftButtonText = ref("")
const orderText = ref("RANDOM")
const word = ref("")
const translation = ref("")

// which button is active
const leftButtonIsActive = ref(false)
const questionButtonIsActive = ref(false)
const menuIsActive = ref(false)

// which set is studied 
const currentLevel = ref(0)
const currentUnit = ref(1)

//game logic
const gameIsOn = ref(false)
const score = ref(0)
const nbQuestion = ref(NBRQUESTION)
const nbTries = ref(0)
let wordId = 0
let random = true

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function toggleMenu() {
  menuIsActive.value = !menuIsActive.value
  console.log("clicked")
}

function showTranslation() {
  if(gameIsOn.value) {
    questionText.value === word.value ? questionText.value = translation.value : questionText.value = word.value
  }
}

function resetScore(){
  random ? nbQuestion.value = NBRQUESTION : nbQuestion.value = dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length
  nbTries.value = 0
  score.value = 0
}

function setOrder() {
  orderText.value === "RANDOM" ? orderText.value = "NOT RANDOM" : orderText.value = "RANDOM"
  random = !random
  resetScore()
}

function checkScore(){
  if(nbTries.value===nbQuestion.value){
    alert("your score : " + score.value + " / " + nbQuestion.value)
    score.value = 0
    nbTries.value = 0
  }
}

function nextWord() {
  random ? wordId = getRandomInt(dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length) : null

  rightButtonText.value = "Got it!"
  leftButtonText.value = "Study again"

  leftButtonIsActive.value = true
  questionButtonIsActive.value = true
  gameIsOn.value = true

  word.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordId]["word"]
  translation.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordId]["translation"]
  questionText.value = word.value

  !random && wordId === dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length - 1 ? wordId = 0 : wordId++
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

  leftButtonIsActive.value = false
  questionButtonIsActive.value = false
  gameIsOn.value = false

  currentLevel.value = level
  currentUnit.value = unit

  wordId = 0
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
        <div class="menuItem">
          <span @click="setOrder()" class="dropbtn">{{ orderText }}</span>
        </div>
        <div class="menuItem">
          <span>SCORE : {{ score + "/" + nbQuestion}}</span>
        </div>
        <div class="menuItem">
          <span>COUNTER : {{ nbTries }}</span>
        </div>
      </div>
      
      <ul class="hiddenMenu unselectable" :class="{'open': menuIsActive}">
        <li class="hiddenMenuItem" v-for="unit in units[0]" :key="unit.id" @click="changeUnit(0, unit.id, unit.name)">{{ "Level 1 -> " + unit.id + " : " + unit.name }}</li>
        <li class="hiddenMenuItem" v-for="unit in units[1]" :key="unit.id" @click="changeUnit(1, unit.id, unit.name)">{{ "Level 2 -> " + unit.id + " : " + unit.name }}</li>
      </ul>
    </nav>

    <main>
      <div @click="showTranslation()" class="middle center unselectable"><p>{{ questionText }}</p></div>
      <div @click="studyAgain()" class="bottomLeft center unselectable" :class="{ left: leftButtonIsActive }">{{ leftButtonText }}</div>
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
  padding: 10px;
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
  margin-bottom: 10px;
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
}
</style>