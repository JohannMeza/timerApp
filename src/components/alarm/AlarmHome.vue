<template>
  <div class="alarm section">
    <div class="hour">
      <span class="hour-btn" @click="btnAlarm(false)" v-if="alarmActive.hour"><i class="fas fa-minus"></i></span>
      <span class="hour-text">{{ alarmActive.hour ? formatTime(alarmActive.hour) : 'Sin hora' }}</span>
      <span class="hour-btn" @click="btnAlarm(true)" v-if="alarmActive.hour"><i class="fas fa-plus"></i></span>
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
          <component :is="componentKeep" v-bind:alarmData="{ 'pending': alarmPending, 'missed': alarmMissed }"/>
        </keep-alive>
      </div>

      <div class="table__content box-shadow" id="table-alarm">
        <table class="table" v-if="alarms && alarms.length !== 0">
          <tbody class="table__body">
            <tr 
            class="table__row" 
            v-for="(alarm, index) in alarms" 
            :key="alarm._id"
            @click="alarmFunction(alarm)"
            >
              <!-- <th> {{ alarm.hour > `0${new Date().getHours()}`.substr(-2) + ':' + `0${new Date().getMinutes()}`.substr(-2) }} </th> -->
              <th class="alarm-index" :class="{'alarm-pending': alarm.hour > `0${new Date().getHours()}`.substr(-2) + ':' + `0${new Date().getMinutes()}`.substr(-2)}">{{ index + 1 }}</th>
              <td>Para: {{ formatTime(alarm.hour) }}</td>
              <td>Restante: {{ alarm.remaining }}</td>
              <td :title="alarm.title">Título: {{ maxWord(alarm.title, 16) || "Sin nombre" }}</td>
              <td>
                <div class="table__btn">
                  <span class="table__btn-icon" data-modal="modalAlert" @click="modalInfo(alarm)"><i class="fas fa-info"></i></span>
                  <router-link :to="`/form/alarm/update/${alarm._id}`" class="table__btn-icon"><i class="fas fa-edit"></i></router-link>
                  <span class="table__btn-icon" @click="deleteAlarm(alarm._id)"><i class="fas fa-trash"></i></span>
                </div>
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

    <modal-component>
      <template #title>
        <h3 class="text--white">Información de la alarma</h3>
      </template>

      <template #bodyModal>
        <table class="table-info">
          <tbody class="table__body">
            <tr>
              <td class="table__celda">Para: {{ alarmInfo ? formatTime(alarmInfo.hour) : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Intervalo: {{ alarmInfo ? alarmInfo.interval || "" : '...' }} min.</td>
            </tr>

            <tr>
              <td class="table__celda">Música: {{ alarmInfo ? alarmInfo.music || "Si" : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Titulo: {{ alarmInfo ? alarmInfo.title || "Sin titulo" : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Descripcion: {{ alarmInfo ? alarmInfo.description || "Sin descripcion" : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Notificación: {{ alarmInfo ? alarmInfo.notification ? 'Activado' : 'Desactivado' : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Estado: {{ alarmInfo ? alarmInfo.status == 0 ? 'Alarma apagada' : 'Alarma perdida' : '...' }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </modal-component>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref } from 'vue';
import { deleted, index, uploadAlarm } from '../../services/AlarmServices';
import MissedAlarm from './MissedAlarm.vue';
import PendingAlarm from './PendingAlarm.vue';
import modal from '../../libs/modal/js/modal.js'
import ModalComponent from '../common/ModalComponent.vue';
import { useRouter } from 'vue-router';
import { format, wordLength } from '../../helpers/FormatTime';
import notification from '../../helpers/NotificationBrowser';

export default {
  name: 'AlarmHome',

  components: { MissedAlarm, PendingAlarm, ModalComponent },

  setup () {
    const router = useRouter();
    const componentKeep = ref('MissedAlarm')
    const alarms = ref();
    const alarmInfo = ref();
    const alarmActive  = ref({});
    const alarmPending = ref();
    const alarmMissed = ref();

    // --- Get
    const getAlarms = async () => {
      const res = await index();
      alarms.value = res.data;
      alarms.value.forEach(el => el.remaining = '')
      let date = new Date()
      let timeNow = `0${date.getHours()}`.substr(-2) + ':' + `0${date.getMinutes()}`.substr(-2)
      alarmPending.value = alarms.value.length !== 0 ? res.data.filter(el => el.hour > timeNow) : []
      alarmMissed.value = alarms.value.length !== 0 ? res.data.filter(el => el.hour <= timeNow  && el.status === 1) : []
      alarmActive.value = alarms.value.length !== 0 ? alarms.value[0] : [];
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

    const modalInfo = (info) => alarmInfo.value = info
    const formatTime = (time) => format(time)
    const maxWord = (word, max = 5) => wordLength(word, max)
    const alarmFunction = (alarm) => {
      if (document.querySelector(".table__row.active")) document.querySelector(".table__row.active").classList.remove("active")
      event.target.closest('tr').classList.add("active")
      alarmActive.value = alarm
    }

    let remaining = null;
    const remainingFunction = () => {
      remaining = setInterval(() => {
        let now = `0${new Date().getHours()}`.substr(-2) + ':' + `0${new Date().getMinutes()}`.substr(-2),
          horaNow = now.substring(0,2),
          minNow = now.substr(3, 4);

        if (alarms.value.length === 0) clearInterval(remaining)
        alarms.value.forEach (el => {
          if (el.hour > now) {
            el.remaining = `0${Math.abs(el.hour.substring(0,2) - horaNow)}`.substr(-2) + ':' + `0${Math.abs(el.hour.substring(3, 5) - minNow)}`.substr(-2)
          } else {
            el.remaining = `0${60 - (minNow - el.hour.substring(3, 5)) == 60 ? 24 - Math.abs(el.hour.substring(0,2) - horaNow) : 24 - Math.abs(el.hour.substring(0,2) - horaNow - 1)}`.substr(-2) + ':' + `0${60 - (minNow - el.hour.substring(3, 5)) == 60 ? 0 : 60 - (minNow - el.hour.substring(3, 5)) }`.substr(-2)
          }
        })
      },1000)
    }

    let initAlarm = null;
    const timeInterval = () => {
      initAlarm = setInterval(() => {
        let timeNow = new Date().toLocaleTimeString();
        if (alarmPending.value.length !== 0) {
          alarmPending.value.forEach(el => {
            if (el.hour == `0${timeNow.substring(0, 5)}`.substr(-5)) {
              notification(el.notification, el.title, el.description, 'https://previews.123rf.com/images/msvectorplus/msvectorplus1711/msvectorplus171100290/90166822-ilustraci%C3%B3n-de-vector-de-icono-de-alarma-.jpg')
              alarmPending.value = alarms.value.filter(el => el.hour > `0${new Date().getHours()}`.substr(-2) + ':' + `0${new Date().getMinutes()}`.substr(-2))
              setTimeout(async () => {
                if (confirm(`Titulo de la alarma: ${alarmActive.value.title}`)) {
                  alarms.value.find(element => element._id === el._id ?  element.status = 0 : false)
                  alarmMissed.value = alarms.value.length !== 0 ? alarms.value.filter(el => el.hour <= timeNow  && el.status === 1) : []
                  return await uploadAlarm(alarmActive.value._id, { status: 0 })
                } else {
                  alarms.value.find(element => element._id === el._id ?  element.status = 1 : false)
                  alarmMissed.value = alarms.value.length !== 0 ? alarms.value.filter(el => el.hour <= timeNow  && el.status === 1) : []
                  return await uploadAlarm(alarmActive.value._id, { status: 1 })
                }
              }, 5000)
            }
          })
        }
      }, 1000)
    }

    const btnAlarm = async (value) => {
      let hour = parseInt(alarmActive.value.hour.substring(0, 2)),
        min = parseInt(alarmActive.value.hour.substr(-2));
      
      if (value) { // Suma
        min++;
        if (min > 59) {
          min = 0;
          hour++;
        }

        if (hour > 24) hour = 0;
      } else { // resta
        min--;
        if (min < 0) {
          hour -= 1;
          min = 59;
        }

        if (hour < 0) return
      }

      hour = `0${hour.toString()}`.substr(-2)
      min = `0${min.toString()}`.substr(-2)

      alarmActive.value.hour = `${hour}:${min}`
      alarmPending.value = alarms.value.filter(el => el.hour > `0${new Date().getHours()}`.substr(-2) + ':' + `0${new Date().getMinutes()}`.substr(-2))
      
      let now = `0${new Date().getHours()}`.substr(-2) + ':' + `0${new Date().getMinutes()}`.substr(-2),
          horaNow = now.substring(0,2),
          minNow = now.substr(3, 4);

      alarms.value.forEach (el => {
        if (el.hour > now) {
          el.remaining = `0${Math.abs(el.hour.substring(0,2) - horaNow)}`.substr(-2) + ':' + `0${Math.abs(el.hour.substring(3, 5) - minNow)}`.substr(-2)
        } else {
          el.remaining = `0${24 - Math.abs(el.hour.substring(0,2) - horaNow - 1)}`.substr(-2) + ':' + `0${60 - (minNow - el.hour.substring(3, 5)) == 60 ? 0 : 60 - (minNow - el.hour.substring(3, 5)) }`.substr(-2)
        }
      })

      alarms.value.sort((a, b) => {
        if (a.hour > b.hour) return 1;
        if (a.hour < b.hour) return -1
        return 0;
      })

      await uploadAlarm(alarmActive.value._id, { hour: alarmActive.value.hour })
    }

    // Life Cycles
    getAlarms()
    timeInterval()
    remainingFunction()

    onMounted(() => {
      modal()
    })

    onUnmounted(() => {
      clearInterval(initAlarm)
      clearInterval(remaining)
    })

    return { 
      router,
      alarms,
      alarmInfo, 
      componentKeep, 
      alarmPending,
      alarmMissed,
      alarmActive,
      btnAlarm,
      btnIterationComponents, 
      deleteAlarm, 
      modalInfo, 
      formatTime, 
      maxWord,
      alarmFunction,
    }
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
  & .table__content {
    overflow: auto;
    height: 250px;
    padding: 20px;
    background: var(--bg-gray-light);
    border-radius: 10px;
  } 
  & .table__row {
    cursor: pointer;
  }
  & .table__row.active {
    background: #ccc;
  }
  & .table__row:hover:not(.active) {
    background: var(--bg-gray-regular);
  }
  & .table__row td, & .table__row th {
    padding: 5px 10px;
    margin: 0px 10px;
    font-size: .75rem;
    border-right: 1px solid #333333;
  }
  & .table__row td:last-child {
    border-right: none;
  }

  .table__btn {
    vertical-align: center;
  }
}

// Info tabla modal
.table-info {
  border-spacing: 5px 8px;
  & .table__celda {
    font-size: .8rem;
  }
}

.alarm-index:not(.alarm-pending) {
  position: relative;
  &::before {
    content: "";
    display: inline-block;
    background: red;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}
.alarm-pending {
  position: relative;
  &::before {
    content: "";
    display: inline-block;
    background: green;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
}

.no-records {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>