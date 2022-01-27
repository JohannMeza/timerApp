<template>
   <div class="modal" data-modal="#modalAlert" id="modalClose">
    <div class="container-modal" id="containerModal">
      <div class="modal__title">
        <slot name="title" class="title"></slot>
        <span class="modal-close bg--red" id="modalClose">X</span>
      </div>

      <div class="modal__paragraph">
        <slot name="bodyModal"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang="scss" scoped>
@import '../../libs/modal/css/style.css';

.modal__title {
  background: var(--bg-gray-medium);
  color: var(--c-gray-light);
}
</style>