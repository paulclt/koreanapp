<script setup>
import { ref } from "vue"
import dataset from './assets/words.json'


const questionText = ref("")
const rightButtonText = ref("click to start")
const word = ref("")
const translation = ref("")
const units = ref(dataset["datasets"])
const currentLevel = ref(0)
const currentUnit = ref(1)
let wordId = 0

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function showTranslation() {
  questionText.value === word.value ? questionText.value = translation.value : questionText.value = word.value
}

function nextWord(level, unit, random) {
  random ? wordId = getRandomInt(dataset["datasets"][level]["unit" + unit]["vocabulary"].length) : 

  rightButtonText.value = "Got it!"
  word.value = units.value[level]["unit" + unit]["vocabulary"][wordId]["word"]
  translation.value = units.value[level]["unit" + unit]["vocabulary"][wordId]["translation"]
  questionText.value = word.value

  !random && wordId === dataset["datasets"][level]["unit" + unit]["vocabulary"].length - 1 ? wordId = 0 : wordId++
}

function changeUnit(level, unit, text) {
  let textLevel = level+1
  questionText.value = "level " + textLevel + " : " + text
  rightButtonText.value = "click to start"
  currentLevel.value = level
  currentUnit.value = unit
  wordId = 0
}
</script>


<template>
  <div class="container">
    <header class="unselectable">
      <ul>
        <li class="dropdown"><a class="dropbtn">LEVEL 1</a>
          <div class="dropdown-content">
            <a v-for="unit in units[0]" :key="unit.id" @click="changeUnit(0, unit.id, unit.name)">{{ unit.id + " : " + unit.name }}</a>
          </div>
        </li>
        <li class="dropdown"><a class="dropbtn">LEVEL 2</a>
          <div class="dropdown-content">
            <a v-for="unit in units[1]" :key="unit.id" @click="changeUnit(1, unit.id, unit.name)">{{ unit.id + " : " + unit.name }}</a>
          </div>
        </li>
      </ul>
    </header>
    <main>
      <div @click="showTranslation()" class="center unselectable" id="top"><p>{{ questionText }}</p></div>
      <div class="bottom center unselectable" id="left">Study again</div>
      <div @click="nextWord(currentLevel, currentUnit, false)" class="bottom center unselectable" id="right">{{ rightButtonText }}</div>
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

/* ========== dropdown menu css ========== */

ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a, .dropbtn {
  display: inline-block;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover, .dropdown:hover .dropbtn {
  background-color: rgb(235, 235, 235);
}

li.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  min-width: 160px; 
  background-color: rgb(248, 248, 248);
}

.dropdown-content a {
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}

/* ========== dropdown menu css ========== */

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