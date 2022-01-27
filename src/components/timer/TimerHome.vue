<template>
  <div class="timer section">
    <div class="hour">
      <span class="hour-btn"><i class="fas fa-minus"></i></span>
      <span class="hour-text">02:00 p.m.</span>
      <span class="hour-btn"><i class="fas fa-plus"></i></span>
    </div>

    <div class="timer__table">
      <div class="table__content box-shadow">
        <table class="table">
          <tbody class="table__body">
            <tr class="table__row" 
            v-for="timer in timers" 
            :key="timer._id"
            >
              <td>Restante: {{ timer.time }}</td>
              <td class="table__btn">
                <span class="table__btn-icon"><i class="fas fa-undo-alt"></i></span>
                <span class="table__btn-icon"><i class="fas fa-play"></i></span>
                <span class="table__btn-icon"><i class="fas fa-pause"></i></span>
                <span class="table__btn-icon" @click="deleteTimer(timer._id)"><i class="fas fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <form class="table__content box-shadow" @submit.prevent="addTimer">
        <div class="add-timer">
          <input type="number" class="add-timer__number" required id="hour" max="24" min="0" @change="maxLenght" @keyup="maxLenght(24, 0)" v-model="valueTimer.hour">
          <span class="add-timer__signs">:</span>
          <input type="number" class="add-timer__number" required id="min" max="60" min="0" @change="maxLenght" @keyup="maxLenght(60, 0)" v-model="valueTimer.min">
          <span class="add-timer__signs">:</span>
          <input type="number" class="add-timer__number" required id="seg" max="60" min="0" @change="maxLenght" @keyup="maxLenght(60, 0)" v-model="valueTimer.seg">
        </div>

        <div class="add-btn">
          <button type="button" class="add-btn__button">Borrar</button>
          <button type="submit" class="add-btn__button">Agregar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { deleted, index, store } from "../../services/TimerServices"


export default {
  name: 'Timer',

  setup () {
    const timers = ref();
    const valueTimer = ref({
      hour: '',
      min: '',
      seg: ''
    })
    
    // --- Index
    const getTimer = async () => {
      const res = await index();
      timers.value = res.data
    }

    // --- Store
    const addTimer = async () => {
      if (!valueTimer.value.hour || !valueTimer.value.min || !valueTimer.value.seg) return console.error("Valores incompletos")
      let hora = `${valueTimer.value.hour}:${valueTimer.value.min}:${valueTimer.value.seg}`;
      try {
        await store({ time: hora })
        valueTimer.value.hour = ''
        valueTimer.value.min = ''
        valueTimer.value.seg = ''
        getTimer()
      } catch(err) {
        console.error(err)
      }
    }

    // --- Deleted
    const deleteTimer = async (id) => {
      if (confirm("¿Estás seguro de eliminar este registro?")) {
        try {
          await deleted(id);
          getTimer()
        } catch(err) {
          console.error(err)
        }
      }
    }

    const maxLenght = (valueMax, valueMin) => {
      console.log(event.target.value)
      if (event.target.value.length >= 1) event.target.value = event.target.value.substring(0, 2)
      if (parseInt(event.target.value) >= valueMax) event.target.value = valueMax
      if (parseInt(event.target.value) <= valueMin) event.target.value = valueMin
      valueTimer.value.hour = valueTimer.value.hour.toString().substring(0,2)
      valueTimer.value.min = valueTimer.value.min.toString().substring(0,2)
      valueTimer.value.seg = valueTimer.value.seg.toString().substring(0,2)
    } 


    getTimer();
    return { timers, valueTimer, addTimer, maxLenght, deleteTimer }
  }
}
</script>

<style lang="scss" scoped>
.timer__table {
  width: 70%;
  margin: 25px auto 0;
  display: grid;
  grid-template-columns: 50% 1fr;
  gap: 25px;
  & .table__row td {
    padding-right: 10px;
    font-size: .75rem;
    border-right: 1px solid #333333;
  }
  & .table__row td:last-child {
    border-right: none;
  }
  & .table__content {
    height: 200px;
    overflow: auto;
    padding: 20px;
    background: var(--bg-gray-light);
    border-radius: 10px;
    flex: 1 0 auto;
  }
}

// Agregar 
.add-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & .add-timer__number::-webkit-inner-spin-button, 
  & .add-timer__number::-webkit-outer-spin-button { 
    -webkit-appearance: none; 
    margin: 0; 
  }

  & .add-timer__number { -moz-appearance:textfield; }
  & .add-timer__number {
    width: 60px;
    text-align: center;
    font-size: 1.8rem;
    border-radius: 5px;
    background: var(--bg-gray-regular);
  }
  & .add-timer__signs {
    font-size: 2rem;
    font-weight: 600;
  }
  & .add-timer__tempo {
    font-size: 1.5rem;
  }
}

.add-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
  & .add-btn__button {
    padding: 8px 15px;
    border-radius: 5px;
    background: var(--bg-gray-medium);
    color: var(--c-gray-light);
    cursor: pointer;

    &:active {
      transform: scale(.9);
    }
  }
}
</style>