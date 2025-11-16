export const viewingState = $state({ value: 'experiences' });

export function getViewing() {
  return viewingState.value;
}

export function setViewing(value: string) {
  viewingState.value = value;
}

