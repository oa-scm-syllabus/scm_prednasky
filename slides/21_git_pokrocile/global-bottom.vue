<template>
  <footer
    v-if="
      $slidev.nav.currentLayout !== 'cover' &&
      $slidev.nav.currentPage !== 2 &&
      $slidev.nav.currentPage !== $slidev.nav.total + 1
    "
    class="absolute bottom-0 left-1 p-2 text-sm w-full"
  >
    <div class="flex">
      <div class="text-xs" style="
          color: #e9ecf1;
          "
      >
        Adam Fišer
      </div>
      <div class="flex-grow">&nbsp;</div>
      <div
        class="mr-1 border rounded-md px-1 text-xs flex items-center"
        style="
          background-color: #e9ecf1;
          border-color: #e9ecf1;
          font-family: 'Roboto Light', sans-serif;
        "
      >
        {{ $slidev.nav.currentPage }} / {{ $slidev.nav.total }}
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  font-family: 'Roboto Light', sans-serif;
}
</style>