# ChatGPT Color Annotator

Load this folder as an unpacked Chrome or Edge extension.

What works in this version:
- Left-select text, then left-click inside that same selection to open the annotation bar.
- Right-drag across conversation text to open the annotation bar directly.
- Keep the browser's normal right-click copy/search menu for ordinary left-made selections.
- Re-highlight the same text or partially overlapping text to create multiple notes.
- Right-click selected text and use `Add annotation` as a fallback entry point.
- Drag the annotation bar or note card from any non-control area.
- See colored markers on the right side of the page.
- Click a marker or highlight to jump back to the annotated text.
- Click overlapping highlighted text to open a selector list, then switch between notes in the same area.
- Edit an existing annotation in place without deleting it first.
- Export a single annotation as Markdown from the note card.
- Click the browser extension icon to view annotated chat count, current chat note count, current chat round count, and export the full current conversation as Markdown or JSON.
- Save annotations in browser local storage.

How to test:
1. Open `chrome://extensions/`.
2. Turn on Developer mode.
3. Click `Reload` for this extension.
4. Open a ChatGPT conversation page.
5. Left-select a sentence, then left-click inside the same selection to open the annotation bar.
6. Right-drag across another sentence and confirm the annotation bar opens directly without the native menu.
7. Create two overlapping highlights on the same sentence.
8. Click the overlapping area and switch between notes in the popover list.
9. Drag the annotation bar and note card from a blank area.
10. Click the extension icon in the browser toolbar.
11. Export the current conversation as Markdown or JSON.

Notes:
- In-page cards now keep only `Export this`; full-conversation export moved to the browser extension popup.
- Left-made selections keep the normal browser context menu; right-drag is the direct annotation gesture.
- Left-click confirmation only opens the annotation bar when the click lands inside the cached selection.
- Annotation panels can be dragged from any non-button, non-input, non-scrollable content area.
- Export output includes highlighted text and note content, but not color information.
- Highlight content is shown above the note in the popover and is capped to three lines with internal scrolling.
- The note section is capped to ten lines with internal scrolling.
- Marker positions stay fixed by relative conversation position and only rebalance when the conversation content changes.
- Very large or messy cross-block selections may still be unstable.
