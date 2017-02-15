'use strict'

let fs = require('fs')
let casual = require('casual')
let path = require('path')
let del = require('delete')

let base_folder = path.normalize('./test_data')

let max_notebooks = [10, 20]
let max_notes_per_notebook = [5, 100]
let max_num_attachments_per_note = [0, 5]
let note_body_sentences = 50

function check_base_folder(){
  if (!fs.existsSync(base_folder)){
    fs.mkdirSync(base_folder);
  }
}

function clear_base_folder(){
  del(base_folder + "/*")
}

function create_notebooks(){
  let num_notebooks = casual.integer(max_notebooks[0], max_notebooks[1]);
  for (let i=0; i<num_notebooks; i++){
    let folder_name = casual.words(3).split(' ').join('-') + ".notebook";
    let folder_path = path.join(base_folder, folder_name);
    if (!fs.existsSync(folder_path)){
      fs.mkdirSync(folder_path);
    }
  }
}

function create_notes(){
  // Get a list of the notebooks
  let directories = fs.readdirSync(base_folder).filter(function(f){
    return fs.statSync(path.join(base_folder, f)).isDirectory();
  })

  for (let dir of directories){
    let notebook = path.join(base_folder, dir)

    // Create notes in the notebook folder
    let num_notes_per_notebook = casual.integer(max_notes_per_notebook[0], max_notes_per_notebook[1])
    for (let j=0; j<num_notes_per_notebook; j++){
      let title = casual.sentence;
      let slug = title.split(' ').join('-');
      let folder_name = slug + "note";
      let note = path.join(notebook, folder_name);
      if (!fs.existsSync(note)){
        fs.mkdirSync(note);
      }

      // Create the markdown file
      let file_name = slug + "md";
      let file_path = path.join(note, file_name);
      if (!fs.existsSync(file_path)){

        let frontmatter = `---
title: ${title}
tags:
  - ${casual.word}
  - ${casual.word}
---
`;

      let body = casual.sentences(note_body_sentences)


      let contents = frontmatter + body;
      fs.writeFileSync(file_path, contents, 'utf8');
      }

      // Coin toss, create attachments
      if (casual.coin_flip){
        let attachment_dir = path.join(note, 'attachments');
          if (!fs.existsSync(attachment_dir)){
            fs.mkdirSync(attachment_dir);
          }
          let num_attachments = casual.integer(max_num_attachments_per_note[0], max_num_attachments_per_note[1]);
          for (let k=0; k<num_attachments; k++){
            let attachment_name = casual.word + "." + casual.file_extension;
            let attachment_path = path.join(attachment_dir, attachment_name);
            let garbage_data = casual.sentences(100)
            fs.writeFileSync(attachment_path, garbage_data, 'utf8');
          }

      }
    }
  }
}

function main(){
  check_base_folder();
  console.log("Clearing base folder");
  clear_base_folder();
  console.log(`Generating Notebooks`);
  create_notebooks();
  console.log(`Generating Notes`);
  create_notes();

}

main()
