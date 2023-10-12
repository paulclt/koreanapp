<script setup>
import { ref } from "vue"
import words from './assets/words.json'


const questionText = ref("")
const rightButtonText = ref("click to start")
const word = ref("")
const translation = ref("")
let wordId = 0

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showTranslation() {
  questionText.value === word.value ? questionText.value = translation.value : questionText.value = word.value
}

function nextWord(level, unit, random) {
  random ? wordId = getRandomInt(words["datasets"][level]["unit" + unit]["vocabulary"].length) : 

  rightButtonText.value = "Got it!"
  word.value = words["datasets"][level]["unit" + unit]["vocabulary"][wordId]["word"]
  translation.value = words["datasets"][level]["unit" + unit]["vocabulary"][wordId]["translation"]
  questionText.value = word.value

  !random && wordId === words["datasets"][level]["unit" + unit]["vocabulary"].length - 1 ? wordId = 0 : wordId++
}
</script>


<template>
  <div class="container">
    <header class="unselectable">
      <ul>
        <li><span class="menuOption">LEVEL 1</span>
          <!-- <div class="dropdown-content">
            <p class="test">unit1</p>
            <p>unit2</p>
            <p>unit3</p>
          </div> -->
        </li>
        <li><span class="menuOption">LEVEL 2</span></li>
      </ul>
    </header>
    <main>
      <div @click="showTranslation()" class="center unselectable" id="top">{{ questionText }}</div>
      <div class="bottom center unselectable" id="left">Study again</div>
      <div @click="nextWord(1, 2, false)" class="bottom center unselectable" id="right">{{ rightButtonText }}</div>
    </main>
  </div>
</template>
 


<style scoped>
.container {
  font-family: sans-serif;
  background-color: rgb(241, 241, 241);
}

header {
  height: 6vh;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
}

ul {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
}

main {
  height: 92vh;
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

#top {
  width: 100%;
  height: 75%;
}

.bottom {
  width: 50%;
  height: 25%;
}

.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}

.menuOption {
  margin-right: 30px;
  display: inline-block;
}

.menuOption:hover {
  display: block;
  color: grey;
}

#top:hover {
  cursor: help;
  color: grey;
}

#left:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

#right:hover {
  background-color: rgba(0, 128, 0, 0.2);
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
</style>