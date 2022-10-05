import { withInstall } from '../helpers';

import Card from './src/QCard.vue';

export const QCard = withInstall(Card);

export type { QCardProps, QCardInstance } from './src/types';
