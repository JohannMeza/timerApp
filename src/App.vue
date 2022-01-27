<template>
  <div class="body">
    <Navbar class="nav"></Navbar>
    <div>
      <Sidebar></Sidebar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/layout/Navbar.vue';
import Sidebar from './components/layout/Sidebar.vue';

export default {
  name: 'App',
  components: { Navbar, Sidebar },
  setup () {
  }
}
</script>

<style lang="scss">
@import './dev/sass/base/_base.scss';
@import './dev/sass/base/_color.scss';

.body {
  display: grid;
  grid-template-columns: auto 1fr;
}

.section {
  width: 95%;
  margin: 25px auto 0;
}

.box-shadow {
  box-shadow: 0 4px 5px 0 #ccc;
}

// Hora
.hour {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  .hour-text {
    font-size: 2rem;
  }
  .hour-btn {
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

// Table 
.table {
  width: 100%;
}

.table__btn {
  display: flex;
  justify-content: center;
  gap: 10px;

  & .table__btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    color: var(--c-gray-light);
    background: var(--bg-gray-medium);
    cursor: pointer;

    &:active {
      transform: scale(.9);
    }
  }
}

// Sin registros
.no-records {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .no-records__icon{
    font-size: 5rem;
    color: var(--c-gray-regular);
  }
  & .no-records__text {

  }
}
</style>
