import { Ref } from "vue";

export type Card = { title: string; description: string };

export type List = { title: string; cards: Card[] };

export type DragInfo = {
  curC: number;
  curL: number;
  tarC: number;
  tarL: number;
  isCard: boolean;
  isList: boolean;
};

export interface ProvideDragInfo {
  dragInfo: Ref<DragInfo>;
  handleCurCardPos: (curC: number, curL: number) => void;
  handleTarCardPos: (tarC: number, tarL: number) => void;
  handleCurListPos: (curL: number) => void;
  handleTarListPos: (tarL: number) => void;
}
