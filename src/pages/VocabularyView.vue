<script setup lang="ts">
    import { ref } from "vue";
    import { useRoute } from 'vue-router';
    import dataset from '../assets/words.json';

    const route = useRoute();
    const level = ref<number>(+route.params.level);
    const unit = ref<number>(+route.params.unit);
    const units = ref<any>(dataset["datasets"]) 
    const vocabularyList = ref<any>(units.value[level.value]["unit"+unit.value]["vocabulary"])

    // text variable
    const textInput = ref<string>('');

    // logic
    const wordIdRList = ref<number[]>([]);
    const nbWords : number = vocabularyList.value.length;
    const currentIndex = ref<number>(0);

    prepareWordsRandomely();
    
    function getRandom(max : any): any {
        let value : number = Math.floor(Math.random() * max)
        while(wordIdRList.value.includes(value)) {
            value = Math.floor(Math.random() * max)
        }
        return value
    }

    function prepareWordsRandomely () {
        for(let i=0; i<nbWords; i++) {
            wordIdRList.value.push(getRandom(nbWords))
        }
    }

    function next() {
        if(currentIndex.value === nbWords-1) {
            alert("Your reviewed the whole unit! back to the start")
            currentIndex.value = 0
        } else {
            currentIndex.value ++;
        }
    }

    function previous() {
        currentIndex.value === 0 ? null : currentIndex.value --;
    }

    function handleInput (event : any) {
        const value = event.target.value;
        if(value === vocabularyList.value[wordIdRList.value[currentIndex.value]].word) {
            textInput.value = '';
            next();
        }
    }
</script>

<template>
    <!-- <p v-for="item in vocabularyList">
        {{ item.word + " : " + item.translation}}
    </p> -->
    <div class="container-vocab">
        <div class="word area-common unselectable">
            <p>{{ vocabularyList[wordIdRList[currentIndex]].word }}</p>
        </div>
            <input type="text" placeholder="type the world here..." class="input area-common" :value="textInput" @input="handleInput">
        <div class="translation area-common unselectable">
            <p>{{ vocabularyList[wordIdRList[currentIndex]].translation }}</p>
        </div>
        <div class="switch unselectable">
            <div class="previous area-common" @click="previous">
                <p>previous</p>
            </div>
            <div class="next area-common" @click="next">
                <p>next</p>
            </div>
        </div>
    </div>
</template> 
  
<style scoped>
    .container-vocab {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: 'word input' 'translation switch';
        gap: 10px;
        padding: 10px;
    }

    .word {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: word;
    }

    .input {
        border: none; 
        outline: none; 
        box-shadow: none; 
        padding: 0;
        text-align: center;
        grid-area: input;
    }

    .translation {
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(116, 116, 116);
        grid-area: translation;
    }
 
    .switch {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'previous next';
        gap: 10px;
        grid-area: switch;
        font-size: 150%;
    }

    .next {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: next;
    }

    .next > p {
        border-bottom: 4px solid #0047A0;
    }

    .next:hover {
        cursor: pointer;
    }

    .previous {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-area: previous;
    }

    .previous > p {
        border-bottom: 4px solid #CD2E3A;
    }

    .previous:hover {
        cursor: pointer;
    }

    .area-common {
        background-color: rgb(250, 250, 250);
        border-radius: 10px;
    }

    @media screen and (min-width: 1024px) {
        .next:hover > p {
            border-bottom: 4px solid #0047A0;
        }

        .previous > p, .next > p {
            border-bottom: 2px solid black;
        }

        .previous:hover > p {
            border-bottom: 4px solid #CD2E3A;
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

    }
</style>