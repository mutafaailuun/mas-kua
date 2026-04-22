<script setup lang="ts">
import { DialogDescription, useForwardProps } from 'reka-ui'
import type { DialogDescriptionProps } from 'reka-ui'
import { cn } from '~/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: string }>()
const forwarded = useForwardProps(props)
</script>

<template>
  <DialogDescription
    v-bind="forwarded"
    :class="cn('text-sm text-gray-500', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
