import { LitElement, type TemplateResult, html, nothing, css, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";

@customElement("clover-editor")
class CloverEditor extends LitElement {
  public static styles = css`
    * {
      box-sizing: border-box;
    }
    :host {
      display: block;
      height: 100vh;
    }
    #editor {
      overflow-y: auto;
      height: 100vh;
      width: 100%;
    }
    .cm-editor .cm-content {
      caret-color: #eb368d;
      font-family: "Lato", Helvetica, Arial, sans-serif;
    }
  `;

  @query("#editor")
  private accessor _editor!: HTMLDivElement;

  @property()
  public accessor markdown!: string;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    const startState = EditorState.create({
      doc: this.markdown,
      extensions: [
        history(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown({ base: markdownLanguage }),
        syntaxHighlighting(defaultHighlightStyle),
      ],
    });

    new EditorView({
      state: startState,
      parent: this._editor,
    });
  }

  protected render(): TemplateResult | typeof nothing {
    return html` <div id="editor"></div> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "clover-editor": CloverEditor;
  }
}
