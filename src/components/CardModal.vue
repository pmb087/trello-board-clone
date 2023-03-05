<template>
  <div class="modal-bg">
    <div class="modal-container">
      <div class="modal-header">
        <i class="bi bi-credit-card-2-back-fill"></i>
        <textarea
          v-model="currentTitle"
          rows="1"
          class="modal-title"
          @blur="updateCard('title')"
        />
        <button class="modal-close" @click="emit('closeModal')">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="modal-description">
        <div class="modal-description-header">
          <i class="bi bi-justify-left"></i>
          <p class="description-header-title">Description</p>
          <button class="edit-description" @click="toggleEditMode">Edit</button>
          <button class="delete-card" @click="deleteCard">Delete</button>
        </div>
        <div class="discription-body">
          <template v-if="!isEditMode">
            <p class="description-p">{{ description }}</p>
          </template>
          <template v-else>
            <textarea
              v-model="currentDes"
              row="20"
              class="description-textarea"
            />
            <button class="save-description" @click="updateCard('description')">
              Save
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watchEffect, ref, defineEmits } from "vue";

interface Props {
  title: string;
  description: string;
}

const props = defineProps<Props>();
const emit = defineEmits([
  "closeModal",
  "deleteCard",
  "updateCardTitle",
  "updateCardDescription",
]);

const currentTitle = ref("");
const currentDes = ref("");
const isEditMode = ref(false);

const toggleEditMode = () => {
  if (isEditMode.value === true) currentDes.value = props.description;
  isEditMode.value = !isEditMode.value;
};

const deleteCard = () => emit("deleteCard");

const updateCard = (type: "title" | "description") => {
  if (type === "title") emit("updateCardTitle", currentTitle);
  else {
    emit("updateCardDescription", currentDes);
    isEditMode.value = false;
  }
};

watchEffect(() => (currentTitle.value = props.title));
watchEffect(() => (currentDes.value = props.description));
</script>

<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  .modal-container {
    width: 500px;
    height: 500px;
    background-color: #f4f5f7;
    border-radius: 3px;
    .modal-header {
      display: flex;
      align-items: center;
      margin: 10px 5px 10px 20px;
      .bi-credit-card-2-back-fill {
        color: #172b4d;
        font-size: 20px;
        margin-right: 8px;
      }
      .modal-title {
        font-family: "Roboto", sans-serif;
        resize: none;
        overflow: hidden;
        color: #172b4d;
        letter-spacing: 0.3px;
        font-weight: 500;
        font-size: 20px;
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
      .modal-close {
        margin-left: auto;
        align-self: flex-start;
        width: 40px;
        height: 40px;
        border: none;
        border-radius: 50%;

        &:hover {
          cursor: pointer;
          background-color: #dadada;
        }
        .bi-x {
          line-height: 42px;
          font-size: 22px;
        }
      }
    }
    .modal-description {
      margin: 10px 5px 10px 20px;
      height: 100%;
      .modal-description-header {
        display: flex;
        align-items: center;
        .bi-justify-left {
          color: #172b4d;
          font-size: 24px;
          margin-right: 8px;
        }
        .description-header-title {
          font-family: "Roboto", sans-serif;
          font-size: 16px;
          font-weight: 500;
          color: #172b4d;
          margin-top: 6px;
        }
        .edit-description {
          width: 48px;
          height: 32px;
          font-size: 14px;
          color: #172b4d;
          border: none;
          border-radius: 3px;
          background-color: #eaecf0;
          margin-left: 5px;
          &:hover {
            cursor: pointer;
            background-color: #dedfe2;
          }
        }
        .delete-card {
          @extend .edit-description;

          width: 60px;
          color: white;
          background-color: #d03d3d;
          margin-left: auto;
          margin-right: 16px;

          &:hover {
            cursor: pointer;
            background-color: #ce6767;
          }
        }
      }
      .discription-body {
        margin-top: 20px;
        height: 100%;
        .description-p {
          font-family: "Roboto", sans-serif;
          font-size: 14px;
          color: #172b4d;
          padding: 20px;
        }
        .description-textarea {
          font-family: "Roboto", sans-serif;
          display: block;
          resize: none;
          border: 2px solid #0079bf;
          border-radius: 3px;
          padding: 20px;
          width: calc(100% - 60px);
          outline: none;
          height: 300px;
        }
        .save-description {
          border: none;
          background-color: #0079bf;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
          padding: 6px 10px;
          border-radius: 3px;
          margin-top: 7px;

          &:hover {
            cursor: pointer;
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>
