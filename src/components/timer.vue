<template>
    <div class="timer">{{ currentTime }}</div>
</template>

<script>
export default {
    data() {
        return {
            timer: null
        }
    },
    props: ['workTime'],
    mounted() {
        this.timer = this.workTime;
        setInterval( () => {
                this.timer--
        }, 1000);
    },
    computed: {
        // Сохраняем состояние таймера в LocalStorage
        currentTime() {
            localStorage.setItem('time', this.timer)
            return this.timer
        }
    }
}
</script>

<style lang="scss">
.timer {
    font-family: Ubuntu, Arial, Helvetica, sans-serif;
    font-size: 70px;
}
</style>