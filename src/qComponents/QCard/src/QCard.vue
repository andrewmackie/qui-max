<template>
  <div
    ref="card"
    class="q-card"
    :class="cardClasses"
    :style="cardStyles"
  >
    <div
      v-if="icon"
      class="q-card__icon"
      :class="icon"
      :style="cardIconStyles"
    />
    <q-scrollbar
      wrap-class="q-card__inner"
      view-class="scrollbar__list"
    >
      <div
        v-if="title"
        class="q-card__title"
      >
        {{ title }}
      </div>
      <div
        v-if="$slots.default"
        class="q-card__content"
      >
        <slot />
      </div>
    </q-scrollbar>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted
} from 'vue';

import { getConfig } from '@/qComponents/config';
import { isServer } from '@/qComponents/constants/isServer';
import { validateArray } from '@/qComponents/helpers';

import type { Nullable } from '#/helpers';

import type {
  QCardProps,
  QCardInstance
} from './types';

const DEFAULT_Z_INDEX = 2000;

export default defineComponent({
  name: 'QCard',
  componentName: 'QCard',

  props: {
    /**
     * Card content title
     */
    title: {
      type: String,
      default: null
    },
    /**
     * icon class name
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * content icon color
     */
    iconColor: {
      type: String,
      default: 'var(--gradient-secondary)'
    },
    /**
     * card min-width
     */
    minWidth: {
      type: [String, Number],
      default: null
    },
    /**
     * card max-width
     */
    maxWidth: {
      type: [String, Number],
      default: null
    },
  },

  setup(props: QCardProps, ctx): QCardInstance {
    if (!ctx.slots.reference && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('QCard requires reference be provided in the slot.');
    }

    const zIndex = ref<number>(DEFAULT_Z_INDEX);
    const card = ref<Nullable<HTMLElement>>(null);

    const cardClasses = computed<Record<string, boolean>>(() => ({
      'q-card_without-icon': !props.icon
    }));

    const cardStyles = computed<Record<string, string | number>>(() => {
      const result: Record<string, string | number> = {
        zIndex: zIndex.value
      };

      const minWidth = Number(props.minWidth)
        ? `${Number(props.minWidth)}px`
        : props.minWidth;
      if (minWidth) result.minWidth = minWidth;

      const maxWidth = Number(props.maxWidth)
        ? `${Number(props.maxWidth)}px`
        : props.maxWidth;
      if (maxWidth) result.maxWidth = maxWidth;

      return result;
    });

    const cardIconStyles = computed<Record<string, string>>(() => {
      if (!props.iconColor) return {};

      const backgroundProperty = props.iconColor.includes('-gradient')
        ? 'backgroundImage'
        : 'backgroundColor';

      return {
        [backgroundProperty]: props.iconColor
      };
    });

    return {
      card,
      cardClasses,
      cardStyles,
      cardIconStyles,
    };
  }
});
</script>
