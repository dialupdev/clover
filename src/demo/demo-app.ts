import { LitElement, type TemplateResult, html, nothing, css } from "lit";
import { customElement } from "lit/decorators.js";
import { sample } from "./sample";
import "../ui/clover-editor";

@customElement("demo-app")
class DemoApp extends LitElement {
  public static styles = css`
    * {
      box-sizing: border-box;
    }
    :host {
      display: flex;
      height: 100vh;
    }
    aside {
      width: 300px;
      background: #f0f0f0;
    }
    clover-editor {
      flex: 1;
    }
  `;

  protected render(): TemplateResult | typeof nothing {
    return html`
      <aside></aside>
      <clover-editor markdown=${sample}></clover-editor>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
