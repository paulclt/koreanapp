<script setup lang="ts">

</script>

<template>
    <div class="container-header unselectable">
        <div class="container-header-left">
            <img src="../assets/logo_k.png" height="75px" width="125px" alt="">
        </div>
        <div class="container-header-right">
            <RouterLink :to="`/about`" class="container-header-div kapp">About</RouterLink>
            <RouterLink :to="`/`" class="container-header-div kmenu">Menu</RouterLink>
        </div>
    </div>
</template>
  
<style scoped>
    .container-header {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'container-header-left container-header-right';
        margin-left: 40px;
        margin-right: 40px;
        width: 100%;
    }

    .container-header-left {
        grid-area: container-header-left;
        display: flex;
        justify-content: flex-start;
    }

    .container-header-right {
        grid-area: container-header-right;
        display: flex;
        justify-content: flex-end;
        gap: 20px;
    }

    .container-header-div {
        border-bottom: solid black 2px;
        font-size: 150%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    a {
        color: black;
        text-decoration: none;
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
        .kapp:hover{
            border-bottom: solid #0047A0 4px;
        }

        .kmenu:hover{
            border-bottom: solid #CD2E3A 4px;
        }

        .container-header {
            justify-content: flex-start;
            gap: 20px;
            margin-left: 20px;
        }
    }

    @media screen and (max-width: 1024px) {
        .kapp{
            border-bottom: solid #CD2E3A 4px;
        }

        .kmenu{
            border-bottom: solid #0047A0 4px;
        }
    }
</style>