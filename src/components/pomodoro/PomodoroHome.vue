<template>
  <div class="section pomodoro">
    <div class="hour">
      <span class="hour-btn"><i class="fas fa-minus"></i></span>
      <span class="hour-text">02:00 p.m.</span>
      <span class="hour-btn"><i class="fas fa-plus"></i></span>
    </div>

    <div class="pomodoro__add">
      <button type="button" @click="router.push({ path: '/form/work' })" class="pomodoro__add-btn">Agregar</button>
    </div>

    <div class="pomodoro__table">
      <div class="table__content box-shadow">
        <table class="table">
          <thead class="table__head">
            <tr class="table__row">
              <th>#</th>
              <th>Hora</th>
              <th>Descanso</th>
              <th>Demora</th>
            </tr>
          </thead>

          <tbody class="table__body">
            <tr class="table__row">
              <td>1</td>
              <td>05:25 p.m.</td>
              <td>00:00:05</td>
              <td>00:00:25</td>
            </tr>
            <tr class="table__row">
              <td>1</td>
              <td>05:25 p.m.</td>
              <td>00:00:05</td>
              <td>00:00:25</td>
            </tr>
            <tr class="table__row">
              <td>1</td>
              <td>05:25 p.m.</td>
              <td>00:00:05</td>
              <td>00:00:25</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table__content box-shadow">
        <table class="table" v-if="pomodoroData && pomodoroData.length !== 0">
          <tbody class="table__body">
            <tr 
            class="table__row" 
            v-for="data in pomodoroData" 
            :key="data._id"
            >
              <td>Tiempo: {{ data.hour }}</td>
              <td>Decanso: {{ data.rest }}</td>
              <td>Titulo: {{ data.title }}</td>
              <td class="table__btn">
                <span class="table__btn-icon" data-modal="modalAlert" @click="modalInfo(data)"><i class="fas fa-info"></i></span>
                <span class="table__btn-icon"><i class="fas fa-edit"></i></span>
                <span class="table__btn-icon" @click="deletePomodoro(data._id)"><i class="fas fa-trash"></i></span>
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
              <td class="table__celda">Para: {{ pomodoroInfo ? pomodoroInfo.hour : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Descanso: {{ pomodoroInfo ? pomodoroInfo.rest || "" : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Música: {{ pomodoroInfo ? pomodoroInfo.music || "Si" : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Titulo: {{ pomodoroInfo ? pomodoroInfo.title || "Sin titulo" : '...' }}</td>
            </tr>

            <tr>
              <td class="table__celda">Descripcion: {{ pomodoroInfo ? pomodoroInfo.description || "Sin descripcion" : '...' }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </modal-component>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router"
import { deleted, index } from "../../services/PomodoroServices";
import modal from '../../libs/modal/js/modal.js'
import ModalComponent from "../common/ModalComponent.vue";

export default {
  name: 'PomodoroHome',

  components: { ModalComponent },

  setup () {
    const router = useRouter();
    const pomodoroData = ref();
    const pomodoroInfo = ref();

    // --- Index
    const getPomodoro = async () => {
      const res = await index();
      pomodoroData.value = res.data
    }

    // --- Deleted
    const deletePomodoro = async (id) => {
      try {
        if (confirm('¿Estás seguro de eliminar este registro?')) {
          await deleted(id)
          getPomodoro()
        }
      } catch(err) {
        console.error(err)
      }
    }

    const modalInfo = (info) => pomodoroInfo.value = info

    getPomodoro()
    
    // Life Cycles
    onMounted(() => {
      modal()
    })

    return { router, pomodoroData, pomodoroInfo, modalInfo, deletePomodoro };
  }
}
</script>

<style lang="scss" scoped>

// agregar btn 
.pomodoro__add {
  margin: 25px 0;
  .pomodoro__add-btn {
    font-size: .8rem;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    background: var(--bg-gray-medium);
    color: var(--c-gray-light);
    &:active {
      transform: scale(.9);
    }
  }

}

// table 
.pomodoro__table {
  display: grid;
  grid-template-columns: 40% 1fr;
  grid-gap: 25px;
  & .table__content {
    padding: 20px;
    background: var(--bg-gray-light);
    border-radius: 10px;
  }
  & .table {
    border-spacing: 10px 20px;
  }
  & .table__content {
    padding: 20px;
    background: var(--bg-gray-light);
    border-radius: 10px;
  } 
  & .table__row td, & .table__row th {
    padding-right: 10px;
    font-size: .75rem;
    border-right: 1px solid #333333;
  }
  & .table__row td:last-child, & .table__row th:last-child {
    border-right: none;
  }
}
  .table__head {
    & th {
      text-align: left;
    }
  }

// Info tabla modal
.table-info {
  border-spacing: 5px 8px;
  & .table__celda {
    font-size: .8rem;
  }
}

.no-records {
  height: 100%;
  display: flex;
  align-items: center;
}

</style>