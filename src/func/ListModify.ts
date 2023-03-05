import { Card, List } from "@/types";

export function createNewList(newTitle: string): List {
  const newList: List = { title: newTitle, cards: [] };

  return newList;
}

export function createNewCard(
  totalList: List[],
  listIndex: number,
  newTitle: string
): List {
  const currentList = [...totalList][listIndex];
  const newCard: Card = { title: newTitle, description: "" };

  currentList.cards.push(newCard);

  return currentList;
}

export function deleteList(totalList: List[], listIndex: number): List[] {
  const copyLists = [...totalList];

  copyLists.splice(listIndex, 1);

  return copyLists;
}

export function deleteCard(
  totalList: List[],
  cardIndex: number,
  listIndex: number
): List {
  const copyList = [...totalList][listIndex];

  copyList.cards.splice(cardIndex, 1);

  return copyList;
}

export function updateListTitle(
  totalList: List[],
  listIndex: number,
  newTitle: string
): List {
  const copyList = [...totalList][listIndex];

  copyList.title = newTitle;

  return copyList;
}

export function updateCardTitle(
  totalList: List[],
  newTitle: string,
  cardIndex: number,
  listIndex: number
): List {
  const copyList = [...totalList][listIndex];

  copyList.cards[cardIndex].title = newTitle;

  return copyList;
}

export function updateCardDescription(
  totalList: List[],
  newDes: string,
  cardIndex: number,
  listIndex: number
): List {
  const copyList = [...totalList][listIndex];

  copyList.cards[cardIndex].description = newDes;

  return copyList;
}

export function moveCardInSameList(
  totalList: List[],
  curC: number,
  tarC: number,
  curL: number
): List {
  const copyList = [...totalList][curL];

  const [left, right] = [
    copyList.cards.slice(0, tarC),
    copyList.cards.slice(tarC),
  ];

  if (curC < tarC) {
    const curCard = left.splice(curC, 1);
    const modifiedCards = [...left, ...curCard, ...right];
    copyList.cards = modifiedCards;

    return copyList;
  } else {
    const curCard = right.splice(curC - left.length, 1);
    const modifiedCards = [...left, ...curCard, ...right];
    copyList.cards = modifiedCards;

    return copyList;
  }
}

export function moveCardToOtherList(
  totalList: List[],
  curC: number,
  tarC: number,
  curL: number,
  tarL: number
): List[] {
  const copyLists = [...totalList];
  const curCard = copyLists[curL].cards.splice(curC, 1);
  const copyTarList = copyLists[tarL];

  const [left, right] = [
    copyTarList.cards.slice(0, tarC),
    copyTarList.cards.slice(tarC),
  ];

  const modifiedCards = [...left, ...curCard, ...right];

  copyLists[tarL].cards = modifiedCards;

  return copyLists;
}

export function moveList(totalList: List[], curL: number, tarL: number) {
  const copyLists = [...totalList];

  const [left, right] = [copyLists.slice(0, tarL), copyLists.slice(tarL)];

  if (curL < tarL) {
    const currentList = left.splice(curL, 1);

    const movedLists = [...left, ...currentList, ...right];
    return movedLists;
  } else {
    const currentList = right.splice(curL - left.length, 1);

    const movedLists = [...left, ...currentList, ...right];
    return movedLists;
  }
}

export function moveCardToLast(
  totalList: List[],
  curC: number,
  curL: number,
  tarL: number
): List[] {
  const copyLists = [...totalList];
  const curCard = copyLists[curL].cards.splice(curC, 1);

  copyLists[tarL].cards.push(...curCard);

  return copyLists;
}

export function moveListToLast(totalList: List[], curL: number): List[] {
  const copyLists = [...totalList];

  const movedList = copyLists.splice(curL, 1);
  copyLists.push(...movedList);

  return copyLists;
}
