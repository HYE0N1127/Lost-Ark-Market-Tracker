import { TabHeaderComponent } from "../component/tab/header/header.component.js";

class MainPage {
  constructor(root) {
    const tab = new TabHeaderComponent();
    tab.attachTo(root);
  }
}

export const mainPage = new MainPage(document.getElementById("tab"));
