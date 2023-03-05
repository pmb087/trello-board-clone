<template>
  <div class="board-container">
    <template v-for="({ title, cards }, index) in totalList" :key="index">
      <ListComp
        :title="title"
        :cards="cards"
        :index="index"
        @create-card="createCard"
        @delete-list="deleteTargetList"
        @delete-card="deleteTargetCard"
        @update-list-title="updateNewListTitle"
        @update-card-title="updateNewCardTitle"
        @update-card-description="updateNewCardDescription"
        @move-card-to-last="moveCardToLastIndex"
      />
    </template>
    <AddList
      @create-list="createList"
      @list-moved-to-last="modifyListToLastIndex"
    />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref } from "vue";
import { List, DragInfo, ProvideDragInfo } from "@/types/index";
import {
  createNewList,
  createNewCard,
  deleteList,
  deleteCard,
  updateListTitle,
  updateCardTitle,
  updateCardDescription,
  moveCardInSameList,
  moveCardToOtherList,
  moveList,
  moveCardToLast,
  moveListToLast,
} from "@/func/ListModify";
import ListComp from "@/components/ListComp.vue";
import AddList from "@/components/AddList.vue";

const totalList = ref<List[]>([
  {
    title: "리스트 1",
    cards: [
      { title: "카드 1-1", description: "11" },
      { title: "카드 1-2", description: "" },
      { title: "카드 1-3", description: "" },
    ],
  },
  {
    title: "리스트 2",
    cards: [
      { title: "카드 2-1", description: "" },
      { title: "카드 2-2", description: "" },
      { title: "카드 2-3", description: "" },
    ],
  },
  {
    title: "리스트 3",
    cards: [
      { title: "카드 3-1", description: "" },
      { title: "카드 3-2", description: "" },
      { title: "카드 3-3", description: "" },
    ],
  },
]);

const dragInfo = ref<DragInfo>({
  curC: -1,
  curL: -1,
  tarC: -1,
  tarL: -1,
  isCard: false,
  isList: false,
});

const modifyCardIndex = (listIndex?: number, isToLast?: boolean) => {
  const { curC, curL, tarC, tarL } = dragInfo.value;
  if (isToLast && listIndex !== undefined) {
    totalList.value = moveCardToLast(totalList.value, curC, curL, listIndex);
    return;
  }
  if (curL === tarL) {
    if (curC === tarC) return;
    else {
      totalList.value[curL] = moveCardInSameList(
        totalList.value,
        curC,
        tarC,
        curL
      );
    }
  } else {
    totalList.value = moveCardToOtherList(
      totalList.value,
      curC,
      tarC,
      curL,
      tarL
    );
  }
};

const modifyListIndex = () => {
  const { curL, tarL } = dragInfo.value;
  if (curL === tarL) return;
  else totalList.value = moveList(totalList.value, curL, tarL);
};

const handleCurCardPos = (curC: number, curL: number) => {
  dragInfo.value.curC = curC;
  dragInfo.value.curL = curL;
  dragInfo.value.isCard = true;
  dragInfo.value.isList = false;
};

const handleTarCardPos = (tarC: number, tarL: number) => {
  dragInfo.value.tarC = tarC;
  dragInfo.value.tarL = tarL;
  dragInfo.value.isCard = false;
  dragInfo.value.isList = false;
  modifyCardIndex();
};

const handleCurListPos = (curL: number) => {
  dragInfo.value.curC = -1;
  dragInfo.value.tarC = -1;
  dragInfo.value.curL = curL;
  dragInfo.value.isCard = false;
  dragInfo.value.isList = true;
};

const handleTarListPos = (tarL: number) => {
  dragInfo.value.curC = -1;
  dragInfo.value.tarC = -1;
  dragInfo.value.tarL = tarL;
  dragInfo.value.isCard = false;
  dragInfo.value.isList = false;
  modifyListIndex();
};

provide<ProvideDragInfo>("DragInfo", {
  dragInfo,
  handleCurCardPos,
  handleTarCardPos,
  handleCurListPos,
  handleTarListPos,
});

const createList = (newlistTitle: string) => {
  totalList.value.push(createNewList(newlistTitle));
};

const deleteTargetList = (listIndex: number) => {
  totalList.value = deleteList(totalList.value, listIndex);
};

const updateNewListTitle = (newTitle: string, listIndex: number) => {
  totalList.value[listIndex] = updateListTitle(
    totalList.value,
    listIndex,
    newTitle
  );
};

const createCard = (listIndex: number, newCardTitle: string) => {
  totalList.value[listIndex] = createNewCard(
    totalList.value,
    listIndex,
    newCardTitle
  );
};

const deleteTargetCard = (cardIndex: number, listIndex: number) => {
  totalList.value[listIndex] = deleteCard(
    totalList.value,
    cardIndex,
    listIndex
  );
};

const updateNewCardTitle = (
  newTitle: string,
  cardIndex: number,
  listIndex: number
) => {
  totalList.value[listIndex] = updateCardTitle(
    totalList.value,
    newTitle,
    cardIndex,
    listIndex
  );
};

const updateNewCardDescription = (
  newDes: string,
  cardIndex: number,
  listIndex: number
) => {
  totalList.value[listIndex] = updateCardDescription(
    totalList.value,
    newDes,
    cardIndex,
    listIndex
  );
};

const moveCardToLastIndex = (listIndex: number) => {
  modifyCardIndex(listIndex, true);
};

const modifyListToLastIndex = () => {
  totalList.value = moveListToLast(totalList.value, dragInfo.value.curL);
};
</script>

<style scoped>
.board-container {
  display: flex;
  background-color: #0079bf;
  background: linear-gradient(#005c91 0%, #0079bf 15%);
  width: calc(100% - 40px);
  height: calc(100vh - 40px);
  padding: 20px;
}
</style>
