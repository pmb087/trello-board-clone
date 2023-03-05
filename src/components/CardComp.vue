<template>
  <div
    class="card-container"
    draggable="true"
    @dragstart.stop="onDragStart"
    @dragover.stop.prevent
    @dragenter="count++"
    @dragleave="count--"
    @drop.prevent.stop="onDrop"
    :class="{ 'list-dragging': dragInfo.isList }"
  >
    <div class="card-inner" @click="openModal" :class="{ hoverd: isHoverd }">
      <p class="card-title">{{ title }}</p>
      <div v-if="isDes" class="card-description">
        <i class="bi bi-justify-left"></i>
      </div>
    </div>
  </div>
  <Teleport to="#modal" v-if="isModalOpen">
    <CardModal
      @close-modal="isModalOpen = false"
      @delete-card="deleteCard"
      @update-card-title="updateCardTitle"
      @update-card-description="updateCardDescription"
      :title="title"
      :description="description"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { ProvideDragInfo } from "@/types";
import { computed, defineProps, inject, ref, defineEmits } from "vue";
import CardModal from "./CardModal.vue";

interface Props {
  title: string;
  description: string;
  index: number;
  listIndex: number;
}

const props = defineProps<Props>();
const emit = defineEmits([
  "deleteCard",
  "updateCardTitle",
  "updateCardDescription",
]);

const { dragInfo, handleCurCardPos, handleTarCardPos } = inject(
  "DragInfo"
) as ProvideDragInfo;

const isModalOpen = ref(false);
const count = ref(0);

const openModal = () => (isModalOpen.value = true);

const isDes = computed(() => props.description.length > 0);

const isHoverd = computed(
  () =>
    dragInfo.value.isCard &&
    count.value > 0 &&
    !(
      dragInfo.value.curC === props.index &&
      dragInfo.value.curL === props.listIndex
    )
);

const onDragStart = () => {
  handleCurCardPos(props.index, props.listIndex);
};

const onDrop = () => {
  count.value = 0;
  if (dragInfo.value.isList) return;
  handleTarCardPos(props.index, props.listIndex);
};

const deleteCard = () => {
  emit("deleteCard", props.index);
  isModalOpen.value = false;
};

const updateCardTitle = (newTitle: string) =>
  emit("updateCardTitle", newTitle, props.index);

const updateCardDescription = (newDes: string) =>
  emit("updateCardDescription", newDes, props.index);
</script>

<style lang="scss" scoped>
.list-dragging {
  pointer-events: none;
}
.card-container {
  padding: 4px 8px;
  .hoverd {
    margin-top: 10px;
  }
  .card-inner {
    padding: 6px 8px;
    width: 240px;
    background-color: #fff;
    border-radius: 3px;
    border-bottom: 1px solid #a0a0a0;

    &:hover {
      cursor: pointer;
      background-color: #f2f2f2;
    }

    .card-title {
      font-size: 14px;
      color: #172b4d;
      margin: 2px 0 2px;
    }

    .card-description {
      margin: 6px 0 4px;
      .bi-justify-left {
        color: #172b4d;
        font-size: 15px;
      }
    }
  }
}
</style>
