<script setup lang="ts">
    import { ref } from "vue";
    import dataset from '../assets/words.json';
     
    const currentLevel = ref<any>(0);
    const currentUnit = ref<any>(1);
    const units = ref<any>(dataset["datasets"]);
    const menuIsActive = ref<boolean[]>([false, false]);

    function toggleMenu(menu : number) {
        menuIsActive.value[menu] = !menuIsActive.value[menu]
    }
</script>

<template>
    <div class="unselectable">
        <div class="div-menu" @click="toggleMenu(0)">
            <p>Level 1</p>
        </div> 
        <RouterLink :to="`/vocabulary/0/${unit.id}`" class="div-menu-hidden" :class="{'open': menuIsActive[0]}" v-for="unit in units[0]" :key="unit.id">
            {{ unit.id + " : " + unit.name }}
        </RouterLink>
        <div class="div-menu" @click="toggleMenu(1)">
            <p>Level 2</p>
        </div>
        <RouterLink :to="`/vocabulary/1/${unit.id}`" class="div-menu-hidden" :class="{'open': menuIsActive[1]}" v-for="unit in units[1]" :key="unit.id">
            {{ unit.id + " : " + unit.name }}
        </RouterLink>
    </div>
</template>
  
<style scoped>
    a {
        color: black;
        text-decoration: none;
    }

    .div-menu-hidden {
        display: none;
    }

    .div-menu {
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
        font-size: 130%;
    }

    .open {
        height: 50px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid black;
        padding-left: 20px;
        font-size: 110%;
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

    @media screen and (min-width: 1024px) {
        .div-menu:hover {
            border-bottom: 2px solid #0047A0;
        }

        .open:hover {
            border-bottom: 2px solid #CD2E3A;
        }

    }
 
</style>