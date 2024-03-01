<script setup>
import { ref } from "vue"
import dataset from './assets/words.json'

//JSON
const units = ref(dataset["datasets"])

// text variable
const menuText = ref("MENU")
const questionText = ref("level 1 : Greetings and Introduction")
const rightButtonText = ref("click to start")
const leftButtonText = ref("")
const word = ref("")
const translation = ref("")

// display header hidden menu
const menuIsActive = ref(false)

// which set is studied 
const currentLevel = ref(0)
const currentUnit = ref(1)

//game logic
const gameIsOn = ref(false)
const hideTranslation = ref(true)
const score = ref(0)
const nbQuestion = ref(dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length)
const nbTries = ref(0)
let wordId = 0
let wordIdRList = []

//start function
prepareRQuestion()

function getRandom(max) {
    let value = Math.floor(Math.random() * max)
    while(wordIdRList.includes(value)) {
      value = Math.floor(Math.random() * max)
    }
    return value
}

function toggleMenu() {
  menuIsActive.value = !menuIsActive.value
  menuText.value === "MENU" ? menuText.value = "CLOSE" : menuText.value = "MENU"
}

function toggleTranslation() {
  gameIsOn.value ? hideTranslation.value = !hideTranslation.value : null
}

function resetScore(){
  nbQuestion.value = dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length
  nbTries.value = 0
  score.value = 0
  wordId = 0
  wordIdRList.length = 0
  prepareRQuestion()
}

function prepareRQuestion () {
  for(let i=0; i<nbQuestion.value; i++) {
    wordIdRList.push(getRandom(dataset["datasets"][currentLevel.value]["unit" + currentUnit.value]["vocabulary"].length))
  }
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

  word.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordIdRList[wordId]]["word"]
  translation.value = units.value[currentLevel.value]["unit" + currentUnit.value]["vocabulary"][wordIdRList[wordId]]["translation"]
  
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
  !hideTranslation.value ? toggleTranslation() : null
}

function studyAgain() {
  if(gameIsOn.value) {
    nbTries.value++
    checkScore()
    nextWord()
    !hideTranslation.value ? toggleTranslation() : null
  }
}

function changeUnit(level, unit, text) {
  toggleMenu()

  let textLevel = level+1
  questionText.value = "level " + textLevel + " : " + text
  rightButtonText.value = "click to start"
  leftButtonText.value = ""
  translation.value = ""

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
        <div class="menuItem desktopColor" @click="toggleMenu()">
          <span>{{ menuText }}</span>
        </div>
        <div class="menuItem">
          <span>SCORE : {{ score }}</span>
        </div>
        <div class="menuItem">
          <span>WORD : {{ nbTries + "/" + nbQuestion }}</span>
        </div>
      </div>
      
      <ul class="hiddenMenu unselectable" :class="{'open': menuIsActive}">
        <li class="hiddenMenuItem" v-for="unit in units[0]" :key="unit.id" @click="changeUnit(0, unit.id, unit.name)">{{ "Level 1 -> " + unit.id + " : " + unit.name }}</li>
        <li class="hiddenMenuItem" v-for="unit in units[1]" :key="unit.id" @click="changeUnit(1, unit.id, unit.name)">{{ "Level 2 -> " + unit.id + " : " + unit.name }}</li>
      </ul>
    </nav>

    <main>
      <div @click="toggleTranslation()" class="topLeft center unselectable" :class="{ middleGame: gameIsOn }"><p>{{ questionText }}</p></div>
      <div @click="toggleTranslation()" class="topRight center unselectable" :class="{ translation: hideTranslation}"><p>{{ translation }}</p></div>
      <div @click="studyAgain()" class="bottomLeft center unselectable" :class="{ left: gameIsOn }">{{ leftButtonText }}</div>
      <div @click="gotIt()" class="bottomRight center unselectable">{{ rightButtonText }}</div>
    </main>
  </div>
</template>
 
<style scoped>

.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

.container {
    height: 98vh;
    font-family: Arial, Helvetica, sans-serif;
    color: white;
}

/* ###--- header START ---### */

/* nav {
    height: 10%;
    padding: 10px 0;
    padding-top: 0px;
    padding-bottom: 0px;
} */

.menu {
  display: flex;
  align-items: center;
  height: 10%;
}

.menuItem {
  padding: 16px;
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
  height: 90%;
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

.topLeft {
  margin-right: 10px;
  width: 600px;
  height: 300px;
  border: solid gray 3px;
  border-radius: 20px;
}

.topRight {
  margin-left: 10px;
  width: 600px;
  height: 300px;
  border: solid gray 3px;
  border-radius: 20px;
}

.translation {
  color: white;
}

.bottomLeft {
  margin-right: 10px;
  width: 600px;
  height: 300px;
  border: solid gray 3px;
  border-radius: 20px;
}

.bottomRight {
  margin-left: 10px;
  width: 600px;
  height: 300px;
  border: solid gray 3px;
  border-radius: 20px;
}

/* ###--- main END ---### */

@media screen and (min-width: 1024px) {
    .container {
        width: 90%;
        margin: 0 auto;
    }
    .middleGame:hover{
      border-color:#2980b9;
        color: #2980b9;
    }
    
    .desktopColor:hover{
        border-color:#2980b9;
        background-color: #2980b9;
    }
    
    .hiddenMenuItem:hover{

        color: #2980b9;
    }
}
</style>