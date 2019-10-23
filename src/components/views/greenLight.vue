<template>
    <div class="trafficLights_green">
        <div class="redLight"></div>
        <div class="yellowLight"></div>
        <div class="greenLight">
            <Timer 
                :workTime="workTime"
            />
        </div>
    </div>
</template>

<script>
import Timer from '@/components/timer.vue'

export default {
    components: {
        Timer
    },
    data() {
        return {
            // Получаем время работы из LocalStorage, либо задаем явно
            workTime: localStorage.getItem('time') === "0" || !localStorage.getItem('time') ? 15 : localStorage.getItem('time')
        }
    },    
    mounted() {
        // Мигание реализовано с помощью рекурсивного setTimeout
        let timerId = setTimeout( function opacityChange() {
            document.querySelector('.greenLight').style.opacity = document.querySelector('.greenLight').style.opacity === '0.3' ? '1' : '0.3' 
            timerId = setTimeout(opacityChange, 500)
        }, (this.workTime - 3) * 1000);
        setTimeout( () => {
            clearTimeout(timerId)
            this.$router.push('yellow')
        }, this.workTime * 1000);
    },
}
</script>

<style lang="scss" scoped>
@mixin light($lightColor, $lightOpacity) {
    margin: auto;
    width: 60%;
    height: 30%;
    background: $lightColor;
    border-radius: 50%;
    border: 3px solid black;
    opacity: $lightOpacity;
    display: flex;
    align-items: center;
    justify-content: center;
}

.trafficLights_green {
    margin: auto;
    padding: 10px;
    width: 15%;
    height: 500px;
    background: rgb(54, 53, 53);
    border-radius: 5%;
    border: 5px solid black;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    .greenLight {
        @include light(green, 1)
    }

    .redLight {
        @include light(red, 0.3)
    }

    .yellowLight {
        @include light(yellow, 0.3)
    }
}
</style>