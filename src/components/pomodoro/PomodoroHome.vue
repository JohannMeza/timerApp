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
        <table class="table">
          <tbody class="table__body">
            <tr class="table__row">
              <td>Tiempo: 05:00:00</td>
              <td>Decanso: 05:00:00</td>
              <td>Decanso: 05:00:00</td>
              <td class="table__btn">
                <span class="table__btn-icon"><i class="fas fa-info"></i></span>
                <span class="table__btn-icon"><i class="fas fa-edit"></i></span>
                <span class="table__btn-icon"><i class="fas fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>import { useRouter } from "vue-router"

export default {
  name: 'PomodoroHome',

  setup () {
    const router = useRouter();
    return { router };
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
</style>