<template>
  <header class="header">
    <span class="btn-cog"><i class="fas fa-cog"></i></span>
  </header>
</template>

<style lang="scss" scoped>
.header {
  background: var(--bg-gray-light);
  display: flex;
  justify-content: center;
  padding: 5px 15px;
  flex-direction: column;
}

.btn-cog {
  align-self: flex-end;
  user-select: none;
  font-size: 25px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  &:active {
    background: var(--bg-gray-regular);
  }
}
</style>