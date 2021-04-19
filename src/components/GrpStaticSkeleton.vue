<template>
  <div :class="$style.container">
    <div v-for="n in 5" :key="n" :class="$style.item"></div>
  </div>
</template>

<script>
export default {
  name: 'GrpStaticSkeleton',
};
</script>

<style lang="scss" module>
$_areas: (1: a, 2: b, 3: c, 4: d, 5: e);
$_row-height: 64px;
@keyframes skeleton-loading {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.container {
  display: grid;
  padding: 1rem;
  border: thin solid black;
  gap: 2rem;
  grid-template:
    "a a b" #{$_row-height}
    "a a c" #{$_row-height}
    "d d d" #{$_row-height}
    "e e e" #{$_row-height} / 1fr 1fr 4fr;
}
.item {
  animation: skeleton-loading 4000ms ease infinite;
  background: linear-gradient(90deg, gray, white);
  background-size: 400% 400%;
}
@each $_index, $_area in $_areas {
  .item:nth-child(#{$_index}) {
    grid-area: $_area;
  }
}
</style>
