# Collate mock collection generator
Generate a mock collection for experimentation.

## Installation
You need to have [Node.js](https://nodejs.org/) installed.

`npm install` to install dependencies

## Generate
`npm run generate` to generate the collection.

The collection will be located in the `test_data` folder.

To edit the number of files generated, change these values in `index.js`

```javascript
let max_notebooks = [10, 20]
let max_notes_per_notebook = [5, 100]
let max_num_attachments_per_note = [0, 5]
let note_body_sentences = 50
```
