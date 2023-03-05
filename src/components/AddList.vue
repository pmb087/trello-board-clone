<template>
  <div
    class="add-list-container-wrap"
    @dragover.prevent
    @drop.prevent="onDrop"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
  >
    <template v-if="!isToggle">
      <div
        class="add-list-container"
        @click="handleToggle(true)"
        :class="{ hoverd: isHoverd }"
      >
        <div class="add-list-toggle-button">
          <i class="bi bi-plus-lg"></i>
          <p class="add-list-text">Add another list</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="add-list-container-active">
        <input
          v-model="newListTitle"
          class="new-list-title"
          placeholder="Enter list title..."
          @keyup.enter="createList"
        />
        <div class="active-button-container">
          <button class="add-list-button" @click="createList">Add list</button>
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
import { ref, defineEmits, computed, inject } from "vue";

const emit = defineEmits(["createList", "listMovedToLast"]);

const { dragInfo } = inject("DragInfo") as ProvideDragInfo;

const isToggle = ref(false);
const count = ref(0);
const newListTitle = ref("");

const isHoverd = computed(() => count.value > 0 && dragInfo.value.isList);

const handleToggle = (arg: boolean) => (isToggle.value = arg);

const createList = () => {
  emit("createList", newListTitle.value);
  newListTitle.value = "";
};

const onDrop = () => {
  count.value = 0;
  emit("listMovedToLast");
};

const onDragEnter = () => {
  if (dragInfo.value.isCard) return;
  count.value++;
};

const onDragLeave = () => {
  if (dragInfo.value.isCard) return;
  count.value--;
};
</script>

<style lang="scss" scoped>
.add-list-container-wrap {
  .hoverd {
    margin-left: 30px;
  }
  .add-list-container {
    width: 256px;
    padding: 10px 12px;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;

    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .add-list-toggle-button {
      display: flex;
      align-items: center;
      margin: 2px 0;
      .bi-plus-lg {
        color: #eaf6f7;
        margin-right: 5px;
      }
      .add-list-text {
        font-size: 14px;
        font-family: "Roboto", sans-serif;
        color: #eaf6f7;
      }
    }
  }

  .add-list-container-active {
    padding: 4px;
    background-color: #ebecf0;
    border-radius: 3px;
    .new-list-title {
      font-family: "Roboto", sans-serif;
      padding: 8px 12px 7px;
      width: 236px;
      font-size: 14px;
      border: 2px solid #0079bf;
      border-radius: 3px;
      outline: none;
      color: #43536e;
      font-weight: 500;
      letter-spacing: 0.2px;
    }
    .active-button-container {
      display: flex;
      align-items: center;
      margin-top: 3px;
      .add-list-button {
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
