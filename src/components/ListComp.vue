<template>
  <div
    class="list-container-wrap"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.stop.prevent
    @drop.prevent="onDrop"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <div class="list-container" :class="{ hoverd: isHoverd }">
      <div class="list-header">
        <textarea
          v-model="currentTitle"
          class="list-title"
          rows="1"
          @blur="updateListTitle"
        />
        <div>
          <button class="list-menu" @click="toggleMenu">
            <i class="bi bi-three-dots"></i>
          </button>
          <template v-if="isMenuToggle">
            <div class="delete-list-container">
              <button class="delete-button-container" @click="deleteList">
                Delete
              </button>
            </div>
          </template>
        </div>
      </div>
      <template v-for="({ title, description }, index) in cards" :key="index">
        <CardComp
          @delete-card="deleteCard"
          @update-card-title="updateCardTitle"
          @update-card-description="updateCardDescription"
          :title="title"
          :description="description"
          :index="index"
          :listIndex="props.index"
        />
      </template>
      <AddCard
        @create-card="createCard"
        @move-card-to-last="moveCardToLast"
        :listIndex="index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Card, ProvideDragInfo } from "@/types";
import {
  defineProps,
  inject,
  ref,
  watchEffect,
  defineEmits,
  computed,
} from "vue";
import CardComp from "@/components/CardComp.vue";
import AddCard from "./AddCard.vue";

interface Props {
  index: number;
  title: string;
  cards: Card[];
}

const props = defineProps<Props>();
const emit = defineEmits([
  "createCard",
  "deleteList",
  "deleteCard",
  "updateListTitle",
  "updateCardTitle",
  "updateCardDescription",
  "moveCardToLast",
]);

const { dragInfo, handleCurListPos, handleTarListPos } = inject(
  "DragInfo"
) as ProvideDragInfo;

const currentTitle = ref("");
const isMenuToggle = ref(false);
const count = ref(0);

const isHoverd = computed(
  () => count.value > 0 && dragInfo.value.curL !== props.index
);

const toggleMenu = () => (isMenuToggle.value = !isMenuToggle.value);

const onDragStart = () => {
  handleCurListPos(props.index);
};

const onDrop = () => {
  count.value = 0;
  if (dragInfo.value.isCard) return;
  handleTarListPos(props.index);
};

const createCard = (newTitle: string) =>
  emit("createCard", props.index, newTitle);

const deleteList = () => {
  emit("deleteList", props.index);
  isMenuToggle.value = false;
};

const deleteCard = (cardIndex: number) =>
  emit("deleteCard", cardIndex, props.index);

const updateListTitle = () => {
  if (props.title === currentTitle.value) return;
  emit("updateListTitle", currentTitle.value, props.index);
  currentTitle.value = "";
};

const updateCardTitle = (newTitle: string, cardIndex: number) =>
  emit("updateCardTitle", newTitle, cardIndex, props.index);

const updateCardDescription = (newDes: string, cardIndex: number) =>
  emit("updateCardDescription", newDes, cardIndex, props.index);

const moveCardToLast = () => emit("moveCardToLast", props.index);

const onDragEnter = () => {
  if (dragInfo.value.isCard) return;
  count.value++;
};

const onDragLeave = () => {
  if (dragInfo.value.isCard) return;
  count.value--;
};

watchEffect(() => (currentTitle.value = props.title));
</script>

<style lang="scss" scoped>
.list-container-wrap {
  .hoverd {
    margin-left: 30px;
  }
  .list-container {
    min-width: 272px;
    margin-right: 8px;
    background-color: #ebecf0;
    border-radius: 3px;
    padding: 4px 0;

    .list-header {
      margin: 4px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .list-title {
        font-family: "Roboto", sans-serif;
        resize: none;
        overflow: hidden;
        color: #172b4d;
        letter-spacing: 0.3px;
        font-weight: 500;
        font-size: 14px;
        border: none;
        background-color: inherit;
        border-radius: 2px;
        padding: 4px 8px;
        margin-right: 2px;
        width: calc(100% - 16px - 28px);

        &:focus {
          background-color: #fff;
          outline: 2px solid #0079bf;
        }
      }
      .list-menu {
        width: 30px;
        height: 30px;
        border: none;
        border-radius: 3px;
        background-color: inherit;

        &:hover {
          cursor: pointer;
          background-color: #e0e0e0;
        }
        .bi-three-dots {
          font-size: 14px;
          color: #172b4d;
        }
      }

      .delete-button-container {
        font-family: "Roboto", sans-serif;
        position: absolute;
        top: 62px;
        display: flex;
        width: 80px;
        height: 26px;
        justify-content: center;
        align-items: center;
        border: none;
        background-color: #c93131;
        color: #fff;
        border-radius: 3px;
        font-size: 16px;

        &:hover {
          cursor: pointer;
          background-color: #bd5757;
        }
      }
    }
  }
}
</style>
