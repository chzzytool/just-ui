<template>
  <PureInboxScreen :error="isError" />
</template>

<script>
import PureInboxScreen from './PureInboxScreen.vue'

import { computed } from 'vue'

import { useTaskStore } from '../store.js'

export default {
  name: 'InboxScreen',
  components: { PureInboxScreen },
  setup() {
    //👇 Creates a store instance
    const store = useTaskStore()

    console.log('store-->', store)

    //👇 Retrieves the error from the store's state
    const isError = computed(() => store.status === 'error')
    return {
      isError
    }
  }
}
</script>
