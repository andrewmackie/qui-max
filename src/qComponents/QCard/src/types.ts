import type { Ref, ComputedRef } from 'vue';

import type { Nullable } from '#/helpers';

export interface QCardProps {
  title: Nullable<string>;
  icon: Nullable<string>;
  iconColor: Nullable<string>;
  minWidth: Nullable<string | number>;
  maxWidth: Nullable<string | number>;
}

export interface QCardInstance {
  card: Ref<Nullable<HTMLElement>>;
  cardClasses: ComputedRef<Record<string, boolean>>;
  cardStyles: ComputedRef<Record<string, string | number>>;
  cardIconStyles: ComputedRef<Record<string, string>>;
}
