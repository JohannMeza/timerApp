<template>
  <table class="table">
    <tbody class="table__body">
      <tr class="table__row">
        <td>Hora: 03:50 p.m.</td>
        <td>Nombre: Webinar ...</td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
// tabla 
.table {
  border-spacing: 10px 20px;
}
.table__row td {
  padding-right: 10px;
  font-size: .75rem;
  border-right: 1px solid #333333;
}
.table__row td:last-child {
  border-right: none;
}
</style>