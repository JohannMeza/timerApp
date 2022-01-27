<template>
  <div>
    <table class="table" v-if="alarms.missed && alarms.missed.length !== 0">
      <tbody class="table__body">
        <tr class="table__row" v-for="(alarm, index) in alarms.missed" :key="index">
          <th>{{ index + 1 }}</th>
          <td>Hora: {{ formatTime(alarm.hour) }}</td>
          <td :title="alarm.title">Titulo: {{ maxWord(alarm.title, 5) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="no-records" v-else>
      <span class="no-records__icon"><i class="fas fa-clipboard"></i></span>
      <span class="no-records__text">Sin registros</span>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import { format, wordLength } from "../../helpers/FormatTime";

export default {
  name: 'MissedAlarm',

  setup(props, context) {
    const alarms = ref();
    
    watchEffect(() => {
      alarms.value = context.attrs.alarmData;
    })

    const formatTime = (time) => format(time)
    const maxWord = (word, max = 5) => wordLength(word, max)

    return { alarms, formatTime, maxWord }
  }
}
</script>

<style lang="scss" scoped>
// tabla 
.table__row td, .table__row th {
  padding: 5px 10px;
  margin: 2px 10px;
  font-size: .75rem;
  border-right: 1px solid #333333;
}
  .table__row:hover {
    background: var(--bg-gray-regular);
  }
.table__row td:last-child {
  border-right: none;
}

.no-records {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>