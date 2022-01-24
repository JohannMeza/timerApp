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
            <tr class="table__row">
              <td>Restante: 15:00:00</td>
              <td class="table__btn">
                <span class="table__btn-icon"><i class="fas fa-undo-alt"></i></span>
                <span class="table__btn-icon"><i class="fas fa-play"></i></span>
                <span class="table__btn-icon"><i class="fas fa-pause"></i></span>
                <span class="table__btn-icon"><i class="fas fa-trash"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table__content box-shadow">
        <div class="add-timer">
          <span class="add-timer__number">15</span>
          <span class="add-timer__signs">:</span>
          <span class="add-timer__number">50</span>
          <span class="add-timer__signs">:</span>
          <span class="add-timer__number">50</span>
          <span class="add-timer__tempo">p.m.</span>
        </div>

        <div class="add-btn">
          <button class="add-btn__button">Borrar</button>
          <button class="add-btn__button">Agregar</button>
        </div>
      </div>
    </div>
  </div>
</template>

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
  & .add-timer__number {
    font-size: 1.8rem;
    padding: 5px 15px;
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