<template>
  <div
    class="add-card-container-wrap"
    @dragover.prevent
    @dragenter="count++"
    @dragleave="count--"
    @drop.prevent.stop="onDrop"
    :class="{ 'list-dragging': dragInfo.isList }"
  >
    <template v-if="!isToggle">
      <div
        class="add-card-container"
        @click="handleToggle(true)"
        :class="{ hoverd: isHoverd }"
      >
        <div class="add-card-toggle-button">
          <i class="bi bi-plus-lg"></i>
          <p class="add-card-text">Add a card</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="add-card-container-active">
        <textarea
          v-model="newCardTitle"
          class="new-card-title"
          placeholder="Enter a title for this card..."
          rows="3"
          @keyup.enter="createCard"
        />
        <div class="active-button-container">
          <button class="add-card-button" @click="createCard">Add card</button>
          <button class="close-toggle-button" @click="handleToggle(false)">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ProvideDragInfo } from "@/types";
import { ref, defineEmits, inject, computed } from "vue";

const emit = defineEmits(["createCard", "moveCardToLast"]);

const { dragInfo } = inject("DragInfo") as ProvideDragInfo;

const isToggle = ref(false);
const count = ref(0);
const handleToggle = (arg: boolean) => (isToggle.value = arg);

const isHoverd = computed(() => dragInfo.value.isCard && count.value > 0);

const newCardTitle = ref("");

const createCard = () => {
  emit("createCard", newCardTitle.value);
  newCardTitle.value = "";
};

const onDrop = () => {
  count.value = 0;
  emit("moveCardToLast");
};
</script>

<style lang="scss" scoped>
.list-dragging {
  pointer-events: none;
}
.add-card-container-wrap {
  .add-card-container {
    // width: 256px;
    padding: 2px 8px;
    height: fit-content;
    background-color: inherit;
    border-radius: 3px;

    .add-card-toggle-button {
      display: flex;
      align-items: center;
      height: 28px;
      padding: 0 7px;
      border-radius: 3px;
      &:hover {
        cursor: pointer;
        background-color: #d7d7d7;
      }
      .bi-plus-lg {
        color: #5e6c84;
        margin: 0 5px 2px 2px;
        font-size: 14px;
      }
      .add-card-text {
        font-size: 14px;
        font-family: "Roboto", sans-serif;
        color: #5e6c84;
        font-weight: 500;
      }
    }
  }
  .hoverd {
    margin-top: 10px;
  }

  .add-card-container-active {
    padding: 4px 8px;
    background-color: #ebecf0;
    border-radius: 3px;
    .new-card-title {
      font-family: "Roboto", sans-serif;
      padding: 6px 8px 2px;
      resize: none;
      width: 240px;
      font-size: 14px;
      border: none;
      border-bottom: 1px solid #c0c0c0;
      border-radius: 3px;
      outline: none;
      color: #43536e;
      font-weight: 400;
      letter-spacing: 0.2px;

      &::placeholder {
        color: #7b869a;
      }
    }
    .active-button-container {
      display: flex;
      align-items: center;
      margin-top: 3px;
      .add-card-button {
        font-family: "Roboto", sans-serif;
        font-size: 14px;
        font-weight: 400;
        width: 72px;
        height: 32px;
        border: none;
        border-radius: 3px;
        background-color: #0079bf;
        color: #eef5fa;

        &:hover {
          cursor: pointer;
          background-color: rgba($color: #0079bf, $alpha: 0.8);
        }
      }
      .close-toggle-button {
        width: 32px;
        height: 32px;
        margin-left: 3px;
        background-color: inherit;
        border-radius: 3px;
        border: none;
        display: flex;
        align-items: center;

        &:hover {
          cursor: pointer;
        }
        .bi-x-lg {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
