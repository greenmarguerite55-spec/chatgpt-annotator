# ChatGPT annotator

A browser extension for annotating ChatGPT web conversations with highlights, titles, notes, markers, and exports.

## What This Extension Can Do

- Highlight text in ChatGPT conversations
- Add both `Title` and `Note` to each annotation
- Support multiple highlight colors
- Support repeated annotations on the same text
- Support overlapping and intersecting annotations
- Open an annotation card by clicking a highlight or the marker on the right rail
- Switch between multiple annotations when several notes overlap in the same area
- Edit an existing annotation in place without deleting it first
- Drag the confirmation prompt, editor panel, and annotation card
- Export a single annotation as Markdown
- Export all annotations in the current conversation from the browser extension popup
- Export the full conversation annotations as either Markdown or JSON
- Save data in browser local storage and restore it after refresh

## Who It Is For

This extension is designed for people who want to read, review, organize, and export ChatGPT conversations more seriously.

Typical users include:

- Researchers and students
- Writers and editors
- People collecting reading notes
- Users reviewing long ChatGPT conversations
- Anyone who wants structured notes on generated content

## How It Works

### Add an Annotation

1. Left-select text in a ChatGPT conversation.
2. A small confirmation prompt appears near the selection.
3. Confirm and enter the full editor.
4. Fill in:
   - `Title`
   - `Note`
5. Choose a color and save.

### View and Edit Annotations

- Click a highlighted area to open its annotation card.
- Click the marker on the right rail to jump back and open the annotation.
- If multiple annotations overlap, a selector list appears first.
- From the annotation card you can:
  - `Edit`
  - `Export this`
  - `Delete`

### Export Annotations

Single annotation export:

- Click `Export this` inside the annotation card.
- Export includes:
  - `Title`
  - `Highlight`
  - `Note`

Full conversation export:

- Click the browser extension icon in the toolbar.
- The popup shows:
  - Annotated chat count
  - Note count in the current chat
  - Round count in the current chat
- Choose export format:
  - `Markdown`
  - `JSON`
- Export all annotations from the current conversation.

## Interface Overview

### Confirmation Prompt

- Appears after left-selecting text
- Used to confirm whether you want to continue into annotation editing

### Annotation Editor

- Used to edit title, note, and color
- Draggable
- Shows all available colors directly in the full editor

### Annotation Card

- Shows title, highlighted text, and note
- Supports edit, single export, and delete
- Draggable

### Right-Side Markers

- One marker per annotation
- Positioned by relative location in the current conversation
- Rebalanced when the conversation becomes longer
- Fixed when the conversation length does not change

### Browser Extension Popup

- Opened from the Chrome/Edge toolbar icon
- Used for global stats and full conversation export

## Installation

1. Open `chrome://extensions/`.
2. Turn on Developer mode.
3. Click `Load unpacked`.
4. Choose this folder:
   `d:\paper\llllmm\chatgpt-annotator-extension`
5. Pin the extension to the browser toolbar if needed.

## Tips

- Best for sentence-level or paragraph-level annotations
- Very complex cross-block selections may still be unstable
- Use `Title` to distinguish repeated notes on the same sentence
- Export long conversations regularly for archiving

## Known Limitations

- Extremely complex cross-block selections may be unstable
- If ChatGPT changes its DOM structure significantly, recovery and positioning logic may need updates
- Annotations are stored locally in the current browser and are not automatically synced across devices

## Update Log

### 2026-03 Current Version

Base features:

- Added highlighting and annotation support for ChatGPT web conversations
- Added right-side markers and jump-back positioning
- Added local storage persistence and reload recovery

Interaction upgrades:

- Added a confirmation prompt after left text selection
- Added `Title + Note` in the full editor
- Added in-place editing for existing annotations
- Added draggable prompt, editor, and annotation card

Overlapping annotations:

- Added repeated annotations on the same text
- Added overlapping and intersecting highlights
- Added list-based switching for overlapped notes

Export upgrades:

- Added `Export this` for single annotations
- Moved full-conversation export into the browser extension popup
- Added full export in both `Markdown` and `JSON`
- Added `Title` to export output
- Kept color information out of exported content

UI upgrades:

- Improved the annotation card layout for reading
- Added wrapping and scrolling behavior for highlight and note sections
- Made all colors visible in the full annotation editor
- Added the custom extension logo

## File Overview

- `manifest.json`: extension configuration
- `content.js`: in-page annotation logic
- `content.css`: in-page styles
- `popup.html` / `popup.js` / `popup.css`: browser extension popup
- `icons/`: extension icon assets

## Reload After Updates

After code changes or plugin updates:

1. Open `chrome://extensions/`.
2. Find this extension.
3. Click `Reload`.
4. Refresh the ChatGPT page.

If new behavior does not appear, the extension is usually reloaded but the current page has not yet refreshed to the latest content script.
