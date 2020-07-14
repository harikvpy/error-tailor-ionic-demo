import { dispatchFakeEvent } from "@ngneat/spectator";

export function typeInIonicInputAndFocusOut(input: HTMLElement, text: string) {
  if (input.children.length == 0) {
    return;
  }
  const inputCtrl = input.children[0];
  if (!(inputCtrl instanceof HTMLInputElement) && !(inputCtrl instanceof HTMLTextAreaElement)) {
    return;
  }
  inputCtrl.focus();
  inputCtrl.value = text;
  dispatchFakeEvent(inputCtrl, 'input', true);
  dispatchFakeEvent(inputCtrl, 'focusout', true);
}

export function getControlErrorIonItemText(fieldElement: HTMLElement): string {
  const errorSibling: HTMLElement = fieldElement.parentElement.nextElementSibling as HTMLElement;
  if (errorSibling && errorSibling.tagName == "CUSTOM-CONTROL-ERROR") {
    return errorSibling.innerText;
  }
  return null;
}
