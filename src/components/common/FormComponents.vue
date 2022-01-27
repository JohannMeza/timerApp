<template>
  <form @submit.prevent="sendFile" enctype="multipart/form-data" class="section form box-shadow">
    <div class="form-head">
      <h1 class="title">Agregar una nueva alarma</h1>
    </div>

    <div class="form-body">
      <div class="form-content">
        <div class="form-box">
          <label for="hour">Hora</label>
          <input type="time" id="hour" class="form-input" v-model="dataAlarm.hour" required>
        </div>

        <div class="form-box" v-if="$route.params.location === 'alarm'">
          <label for="inter">Intervalo</label>
          <input type="number" autocomplete="off" id="inter" class="form-input" v-model="dataAlarm.interval" required>
        </div>
        <div class="form-box" v-else-if="$route.params.location === 'work'">
          <label for="inter">Descanso</label>
          <input type="text" autocomplete="off" id="missed" class="form-input" v-model="dataAlarm.rest" required>
        </div>
        
        <div class="form-box">
          <label for="music">Música</label>
          <input 
          type="file" 
          id="music" 
          class="form-input" 
          @change="selectFile"
          ref="file"
          >
        </div>
      </div>

      <div class="form-box">
        <label for="title">Título</label>
        <input type="text" id="title" class="form-input" v-model="dataAlarm.title" required>
      </div>
      
      <div class="form-box">
        <label for="description">Descripción</label>
        <textarea id="description" class="form-input" required v-model="dataAlarm.description"></textarea>
      </div>

      <div class="form-box d-flex">
        <label for="notification">Notificacion</label>
        <input type="checkbox" checked class="form-input" id="notification" v-model="dataAlarm.notification">
      </div>

      <div class="form__btns">
        <button type="button" class="form-btn" @click="$router.go(-1)">Cancelar</button>
        <button type="submit" class="form-btn" v-if="$route.params.id">Actualizar</button>
        <button type="submit" class="form-btn" v-else-if="!$route.params.id">Agregar</button>
      </div>
    </div>
  </form>
</template>

<script>
import { storeAlarm, uploadAlarm, showAlarm } from "../../services/AlarmServices";
import { storePomodoro, uploadPomodoro, showPomodoro } from "../../services/PomodoroServices";
export default {
  name: 'FormAdd',

  data () {
    return {
      file: '',
      dataAlarm: {
        notification: true
      }
    }
  },

  methods: {
    selectFile () {
      this.file = this.$refs.file.files[0];
    },
    
    // --- show
    async getData () {
      if (!this.$route.params.id) return;
      try {
        let res = null
        if (this.$route.params.location === 'work') {
          res = await showPomodoro(this.$route.params.id)
        } else if (this.$route.params.location === 'alarm') {
          res = await showAlarm(this.$route.params.id)
        }

        this.dataAlarm = res.data
      } catch(err) {
        console.error(err)
      }
    },

    // --- Update - Store
    async sendFile () {
      const formData = new FormData();
      formData.append('file', this.file)
      formData.append('archivos', JSON.stringify(this.dataAlarm))
      try {
        if (this.$route.params.id) {
          console.log("Update")
          if (this.$route.params.location === 'work') {
            await uploadPomodoro(this.$route.params.id, this.dataAlarm)
          } else if (this.$route.params.location === 'alarm') {
            await uploadAlarm(this.$route.params.id, this.dataAlarm)
          }
        } else {
          console.log("Save")
          if (this.$route.params.location === 'work') {
            await storePomodoro(formData)
          } else if (this.$route.params.location === 'alarm') {
            await storeAlarm(formData)
          }
        }
        this.$router.go(-1)
      } catch (err) {
        console.error(err)
      }
    }
  },

  created() {
    this.getData()
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1rem;
}

// Form
.form {
  padding: 20px;
  background: var(--bg-gray-low);
}
  .form-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 25px;
    & .form-box {
      margin-top: 20px;
      margin-bottom: 0px;
    }
  }
  .form-box {
    margin: 20px 0;
    user-select: none;
    & > label {
      font-size: .9rem;
    }
  }
  .form-input {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    margin-top: 10px;
    background: var(--bg-gray-regular);
    padding: 0 25px;
    font-size: .8rem;
    &::placeholder {
      font-size: .8rem;
    }
  }
  textarea.form-input {
    padding: 15px 25px;
    height: 80px;
  }
  input[type=checkbox].form-input {
    width: 20px;
    height: 20px;
    padding: 0;
    display: inline;
    margin: 0 0 0 10px;
  }

  .d-flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  // botones de envio o cancelar
  .form__btns {
    display: flex;
    gap: 15px;
  }
  .form-btn {
    padding: 8px 15px;
    font-size: .8rem;
    background: var(--bg-gray-medium);
    color: var(--c-gray-light);
    cursor: pointer;
    border-radius: 5px;
    &:active {
      transform: scale(.9);
    }
  }
</style>