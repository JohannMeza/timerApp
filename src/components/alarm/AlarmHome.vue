<template>
  <div class="alarm section">
    <div class="hour">
      <span class="hour-btn"><i class="fas fa-minus"></i></span>
      <span class="hour-text">02:00 p.m.</span>
      <span class="hour-btn"><i class="fas fa-plus"></i></span>
    </div>

    <div class="alarm__nav">
      <div class="alarm__nav-box">
        <button class="alarm__nav-btn nav-btn-iteration active" @click="btnIterationComponents('MissedAlarm')">Alarmas perdidas</button>
        <button class="alarm__nav-btn nav-btn-iteration" @click="btnIterationComponents('PendingAlarm')">Alarmas pendientes</button>
      </div>

      <router-link to="/form/alarm" class="alarm__nav-btn">Agregar</router-link>
    </div>

    <div class="alarm__table">
      <div class="table__content box-shadow">
        <keep-alive>
          <component :is="componentKeep" />
        </keep-alive>
      </div>

      <div class="table__content box-shadow">
        <table class="table" v-if="alarms && alarms.length !== 0">
          <tbody class="table__body">
            <tr class="table__row" v-for="alarm in alarms" :key="alarm._id">
              <td>Para: {{ alarm.hora }}</td>
              <td>Restante: 05:00:00</td>
              <td>Nombre: Webinar para todos</td>
              <td class="table__btn">
                <span class="table__btn-icon"><i class="fas fa-info"></i></span>
                <span class="table__btn-icon"><i class="fas fa-edit"></i></span>
                <span class="table__btn-icon" @click="deleteAlarm(alarm._id)"><i class="fas fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="no-records" v-else>
          <span class="no-records__icon"><i class="fas fa-clipboard"></i></span>
          <span class="no-records__text">Sin registros</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { deleted, index } from '../../services/AlarmServices';
import MissedAlarm from './MissedAlarm.vue';
import PendingAlarm from './PendingAlarm.vue';

export default {
  name: 'AlarmHome',

  components: { MissedAlarm, PendingAlarm },

  setup () {
    const componentKeep = ref('MissedAlarm')
    const alarms = ref();

    // --- Get
    const getAlarms = async () => {
      const res = await index()
      alarms.value = res.data
    }

    // --- Delete 
    const deleteAlarm = async (id) => {
      if (confirm('¿Estas seguro de eliminar este registro?')) {
        await deleted(id);
        getAlarms()
      }
    } 

    const btnIterationComponents = (value) => {
      document.querySelector(".alarm__nav-btn.active").classList.remove("active")
      componentKeep.value = value
      return event.target.classList.add("active")
    }

    getAlarms()

    return { alarms, componentKeep, btnIterationComponents, deleteAlarm }
  }
}
</script>

<style lang="scss" scoped>
// Hora
.alarm__hour {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  .alarm__hour-text {
    font-size: 2rem;
  }
  .alarm__hour-btn {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    color: var(--c-gray-light);
    background: var(--bg-gray-medium);
    cursor: pointer;
    &:active {
      transform: scale(.9);
    }
  }
}

// Navegacion
.alarm__nav {
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  .alarm__nav-box {
    background: var(--bg-gray-light);
  }
  .alarm__nav-btn {
    font-size: .8rem;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    &.active {
      background: var(--bg-gray-medium);
      color: var(--c-gray-light);
    }
    &:active {
      transform: scale(.9);
    }
  }

  & > .alarm__nav-btn {
    background: var(--bg-gray-medium);
    color: var(--c-gray-light);
  }
}

// tabla 
.alarm__table {
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 25px;
  & .table {
    border-spacing: 10px 20px;
  }
  & .table__content {
    padding: 20px;
    background: var(--bg-gray-light);
    border-radius: 10px;
  } 
  & .table__row td {
    padding-right: 10px;
    font-size: .75rem;
    border-right: 1px solid #333333;
  }
  & .table__row td:last-child {
    border-right: none;
  }
}
</style>