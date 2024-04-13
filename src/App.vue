<script setup lang="ts">
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue"

</script>

<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>


</template>
  
<style scoped>

  .container{
    background-color: white;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 80px 1fr;
    grid-template-areas: 'header' 'main';
  }

  header {
    display: flex;
    grid-area: header;
    border-bottom: solid lightgray 1px;
    z-index: 1000; 
  }

  main {
    grid-area: main;
    overflow: scroll;
    overflow-x: hidden;
    border-bottom: solid lightgray 1px;
  }

  footer {
      display: none;
  }


  

  @media screen and (min-width: 1024px) {
    .container {
      width: 100%;
      margin: 0 auto;
    }

    .container {
      grid-template-rows: 80px 1fr 80px;
      grid-template-areas: 'header' 'main' 'footer';
    }

    footer {
      display: block;
      grid-area: footer;
    }


  }
</style>
