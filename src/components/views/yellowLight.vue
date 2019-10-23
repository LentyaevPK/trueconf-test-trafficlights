<template>
    <div class="trafficLights_yellow">
        <div class="redLight"></div>
        <div class="yellowLight">
            <Timer 
                :workTime="workTime"
            />
        </div>
        <div class="greenLight"></div>
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
            nextPath: '',
            // Получаем время работы из LocalStorage, либо задаем явно
            workTime: (localStorage.getItem('time') === "0" || +localStorage.getItem('time') > 3) || !localStorage.getItem('time') ? 3 : localStorage.getItem('time')
        }
    },
    // Навигационный хук, позволяющий понять какой сигнал будет после желтого
    beforeRouteEnter (to, from, next) {
        next( vm => { 
            if (from.path == '/red') {
                vm.nextPath = '/green'
            } else {
                vm.nextPath = '/red'
            };
        })
    },
    mounted() {
        // Мигание реализовано с помощью рекурсивного setTimeout
        let timerId = setTimeout( function opacityChange() {
            document.querySelector('.yellowLight').style.opacity =  document.querySelector('.yellowLight').style.opacity === '0.3' ? '1' : '0.3' 
            timerId = setTimeout(opacityChange, 500)
        }, (this.workTime - 3) * 1000);
        setTimeout( () => {
            clearTimeout(timerId);
            this.$router.push(this.nextPath)
        }, this.workTime * 1000);
    }
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

.trafficLights_yellow {
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
    .yellowLight {
        @include light(yellow, 1)
    }

    .redLight {
        @include light(red, 0.3)
    }

    .greenLight {
        @include light(green, 0.3)
    }
}
</style>