<script setup lang="ts">
    import { ref, onMounted } from "vue";
    const currentTime = ref<string>('');

    const updateTime = () => {
      const now = new Date();
      // Adjust for Korea timezone (UTC+9)
      const koreaNow = new Date(now.getTime() + (9 * 60 * 60 * 1000));
      const hours = koreaNow.getHours() > 12 ? (koreaNow.getHours() - 12).toString().padStart(2, '0') : koreaNow.getHours().toString().padStart(2, '0');
      const minutes = koreaNow.getMinutes().toString().padStart(2, '0');
      const ampm = koreaNow.getHours() >= 12 ? 'PM' : 'AM';
      currentTime.value = `${hours}:${minutes} ${ampm}`;
    };

    onMounted(() => {
      updateTime();
      setInterval(updateTime, 10000); // Update time every second
    });


</script>

<template>
    <div class="container-footer unselectable">
        <p>Korea's time</p>
        <p>{{ currentTime }} GMT+9</p>
    </div>
</template>
  
<style scoped>
    .container-footer {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;
        text-decoration: black underline 4px;
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