<template>
  <div class="section chrono">
    <div class="hour">
      <span class="hour-btn"><i class="fas fa-minus"></i></span>
      <span class="hour-text">02:00 p.m.</span>
      <span class="hour-btn"><i class="fas fa-plus"></i></span>
    </div>

    <div class="chrono__table box-shadow">
      <div class="table__content">
        <table class="table">
          <tbody class="table__body">
            <tr class="table__row">
              <td>Vuelta 3</td>
              <td>0 02.05</td>
              <td>0 50.05</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="chrono__btn">
        <button class="chrono-btn">Reiniciar</button>
        <button class="chrono-btn">Vuelta</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chrono__table {
  width: 30%;
  margin: 25px auto 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 10px;
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

.chrono__btn {
  display: flex;
  gap: 25px;
  justify-content: center;
  margin-bottom: 25px;
  & .chrono-btn {
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
</style>