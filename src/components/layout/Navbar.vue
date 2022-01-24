<template>
  <nav class="nav" :class="{ 'activeNav': !navbarActive }">
    <a href="/" class="nav__logo"><img src="../../assets/logo.svg" alt="Logotipo" class="logo-image"></a>
    <hr class="separate">
    <ul class="menu">
      <li class="menu__list active" @click="iterationlinkNav">
        <router-link to="/" class="menu__link" :class="{ 'menu__link-active': !navbarActive }">
          <span class="menu__icon"><i class="fas fa-stopwatch"></i></span>
          <span v-if="navbarActive">Alarma</span>
        </router-link>
      </li>

      <li class="menu__list" @click="iterationlinkNav">
        <router-link to="/timer" class="menu__link" :class="{ 'menu__link-active': !navbarActive }">
          <span class="menu__icon"><i class="fas fa-hourglass-half"></i></span>
          <span v-if="navbarActive">Temporizador</span>
        </router-link>
      </li>

      <li class="menu__list" @click="iterationlinkNav">
        <router-link to="/chronometer" class="menu__link" :class="{ 'menu__link-active': !navbarActive }">
          <span class="menu__icon"><i class="fas fa-clock"></i></span>
          <span v-if="navbarActive">Cronómetro</span>
        </router-link>
      </li>

      <li class="menu__list" @click="iterationlinkNav">
        <router-link to="/work" class="menu__link" :class="{ 'menu__link-active': !navbarActive }">
          <span class="menu__icon"><i class="fas fa-business-time"></i></span>
          <span v-if="navbarActive">Trabajo</span>
        </router-link>
      </li>
    </ul>

    <div class="btn__menu" :class="{ 'btn__menu-active': !navbarActive }" @click="collapseNavbar">
      <span class="btn-menu"><i class="fas fa-chevron-left"></i></span>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router"

export default {
  name: 'Navbar',

  setup () {
    const route = useRoute();
    const navbarActive = ref(true);

    const iterationlinkNav = (event) => {
      const lastRoute = route.path.split('/').pop();
      const routesActives = ['', 'timer', 'chronometer', 'work']

      if (!routesActives.includes(lastRoute)) return

      if (event) {
        document.querySelector(".menu__list.active").classList.remove("active")
        return event.target.closest(".menu__list").classList.add("active")
      }

      document.querySelector(".menu__list.active").classList.remove("active")
      switch (route.path.split('/').pop()) {
        case '':
          document.querySelectorAll(".menu__list")[0].classList.add("active")
          break;
        case 'timer': 
          document.querySelectorAll(".menu__list")[1].classList.add("active")
          break;
        case 'chronometer': 
          document.querySelectorAll(".menu__list")[2].classList.add("active")
          break;
        case 'work': 
          document.querySelectorAll(".menu__list")[3].classList.add("active")
        break;
      }
    }

    const collapseNavbar = () => {
      navbarActive.value = !navbarActive.value;
    }

    setTimeout(() => iterationlinkNav(), 0)

    return { navbarActive, iterationlinkNav, collapseNavbar }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  width: 200px;
  height: 100vh;
  background: var(--bg-gray-medium);
}
  .activeNav {
    width: 60px;
  }

// Logo
.nav__logo {
  display: block;
  text-align: center;
  padding: 15px 0;
}

.separate {
  width: 90%;
  margin: 0 auto 0;
}

// Menu 
.menu {
  margin-top: 15px;
}
.menu__list {
  color: var(--c-gray-light);
}
  .menu__list.active {
    background: rgba(255, 255, 255, .15);
  }
  .menu__icon {
    width: 30px;
    display: flex;
    justify-content: center;
  }
  .menu__link {
    padding: 15px 0;
    color: inherit;
    font-size: .8rem;
    display: flex;
    align-items: center;
  }
    .menu__link-active {
      justify-content: center;
      font-size: 1.5rem;
    }
.menu__list:not(.active):hover {
  background: rgba(255, 255, 255, .02);
}

//  btn menu 
.btn__menu {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  .btn-menu {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, .05);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: var(--c-gray-light);
    cursor: pointer;
    &:hover {
      background: rgba(255, 255, 255, .2);
    }
  }
}

.btn__menu-active {
  transform: rotate(180deg);
}
</style>


