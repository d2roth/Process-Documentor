function initalizeEditor( element ){
  const editor = pell.init({
    element: element,//document.getElementById('wysiwyg-editor'),
    onChange: html => {
      document.getElementById(`${element.id}-output`).textContent = html
      // console.log(html);
    },
    defaultParagraphSeparator: 'p',
    styleWithCSS: false,
    actions: [
      'bold',
      'underline',
      {
        name: 'italic',
        result: () => pell.exec('italic')
      },
      // {
      //   name: 'backColor',
      //   icon: '<div style="background-color:pink;">A</div>',
      //   title: 'Highlight Color',
      //   result: () => pell.exec('backColor', 'pink')
      // },
      // {
      //   name: 'image',
      //   result: () => {
      //     const url = window.prompt('Enter the image URL')
      //     if (url) pell.exec('insertImage', url)
      //   }
      // },
      {
        name: 'link',
        result: () => {
          const selection = window.getSelection();
          let link = "https://example.com";
          if( selection && selection.anchorNode ){
            let parent = selection.anchorNode.parentNode;
            // If we are in a link already set the placeholder to that link
            if( parent.nodeName.toLowerCase() == "a" )
              link = parent.attributes.href.value;
          }

          const url = window.prompt('Enter the link URL', link);
          console.log(selection);
          console.log(url);
          if (url){
            if( selection && selection.isCollapsed )
              pell.exec('insertHTML', `<a href="${url}">${url}</a>`)
            else
              pell.exec('createLink', url);
          }
        }
      },
      {
        name: 'unlink',
        icon: '&#128683;',
        title: 'Unlink',
        result: () => {
          const selection = window.getSelection();
          range = document.createRange();
          if( selection && selection.isCollapsed ){
            console.log('Nothing selected', selection);
            // unlink does nothing if no text is selected so select this whole link before unlink is called
            // Currently broken
            if( selection && selection.anchorNode ){
              let parent = selection.anchorNode.parentNode;
              if( parent.nodeName.toLowerCase() == "a" ){
                range.selectNodeContents(parent);
                console.log(range);
              }
            }
          }
          pell.exec('unlink')
        }
      }
    ],
    classes: {
      actionbar: 'pell-actionbar',
      button: 'pell-button',
      content: 'pell-content',
      selected: 'pell-button-selected'
    }
  });
  return editor;
}

const taskForm = document.querySelector('#task-form');
if( taskForm ){
  const taskBody = taskForm.querySelector( '#taskBody' );
  let index = taskBody.querySelectorAll( '.block' ).length;

  taskBody.addEventListener('click', (e) => {
    let block = e.target.closest('.block');
    if( e.target && e.target.matches('.block-move-up') ){
      var node = block,
      parent = node.parentNode,
      prev = node.previousSibling,
      oldChild = (prev && node ) ? parent.removeChild(node) : node;

      if ( prev && node )
        parent.insertBefore( oldChild, prev );
    }
    if( e.target && e.target.matches('.block-move-down') ){
      var node = block,
          parent = node.parentNode,
          next = node.nextSibling;
      if( next && node )
        parent.insertBefore( next, node );
    }
  })


  let createBlock = (content, type) => {
    const block_wrapper = `<div class="block block-type-${type} card">
    <div class="block-change-actions btn-group">
      <a class="block-change-action block-move-up btn btn-primary">&#128314;</a>
      <a class="block-change-action block-move-down btn btn-primary">&#128315;</a>
    </div>
    <div class="card-body">
      <input type="hidden" name="block_order[]" value="${index}">
      <input type="hidden" name="task[blocks][${index}][type]" value="${type.toUpperCase()}">
      ${content}
    </div>
    </div>`;

    index ++;
    return block_wrapper;
  }

  let inputBlock = ( settings ) => {
    return `
      <input type="text" class="input-title form-control" name="task[blocks][${index}][title]" placeholder="Enter Title Here..." value="${settings.title !== undefined ? settings.title : ''}">
      <input type="text" class="form-control" disabled placeholder="Value will go here...">
    `;
  }

  let wysiwygBlock = ( editorId, settings ) => {
    return `
      <input type="text" class="input-title form-control" name="task[blocks][${index}][title]" placeholder="Enter Title Here..." value="${settings.title !== undefined ? settings.title : ''}">
      <textarea class="wysiwyg-editor-output" id="${editorId}-output" name="task[blocks][${index}][value]">${settings.value !== undefined ? settings.value : ''}</textarea>
      <div class="wysiwyg-editor" id="${editorId}"></div>
    `;
  }

  let initalizeInput = function ( settings ){
    taskBody.insertAdjacentHTML('beforeend', createBlock(inputBlock(settings), 'input'));
  }
  let initalizeWYSIWYG = function( settings ){
    let id = editorId++;
    taskBody.insertAdjacentHTML('beforeend', createBlock(wysiwygBlock(`editor-${id}`, settings), 'wysiwyg' ) );

    let editor = document.querySelector(`#editor-${id}`);
    initalizeEditor(editor);

    // Fix so tab index doesn't loop through buttons. Source: https://github.com/jaredreich/pell/issues/168
    editor.querySelectorAll('.pell-button').forEach(button => button.setAttribute('tabIndex', "-1"))
    // Set the default content
    editor.content.innerHTML = document.querySelector(`#editor-${id}-output`).value;
  }

  taskForm.querySelector( '#add-input' ).addEventListener( 'click', (e) => {
    initalizeInput({});
  }, false);

  let editorId = 0;
  taskForm.querySelector( '#add-wysiwyg' ).addEventListener( 'click', (e) => {
    initalizeWYSIWYG(editorId, {})
  }, false);

  if( taskBody.innerHTML != "" ){
    if( blockSettings = JSON.parse( taskBody.innerHTML ) ){
      taskBody.innerHTML = "";
      for(blockSetting of blockSettings){
        switch( blockSetting.type ){
          case 'INPUT':
            initalizeInput(blockSetting);
            break;
          case 'WYSIWYG':
            initalizeWYSIWYG(blockSetting);
            break;
        }
      }
    }
  }

}

// Initialize pell on an HTMLElement
// pell.init({
//   // <HTMLElement>, required
//   element: document.getElementById('wysiwyg-editor'),

//   // <Function>, required
//   // Use the output html, triggered by element's `oninput` event
//   onChange: html => console.log(html),

//   // <string>, optional, default = 'div'
//   // Instructs the editor which element to inject via the return key
//   defaultParagraphSeparator: 'p',

//   // <boolean>, optional, default = false
//   // Outputs <span style="font-weight: bold;"></span> instead of <b></b>
//   styleWithCSS: false,

//   // <Array[string | Object]>, string if overwriting, object if customizing/creating
//   // action.name<string> (only required if overwriting)
//   // action.icon<string> (optional if overwriting, required if custom action)
//   // action.title<string> (optional)
//   // action.result<Function> (required)
//   // Specify the actions you specifically want (in order)
//   actions: [
//     'bold',
//     {
//       name: 'custom',
//       icon: 'C',
//       title: 'Custom Action',
//       result: () => console.log('Do something!')
//     },
//     'underline'
//   ],

//   // classes<Array[string]> (optional)
//   // Choose your custom class names
//   classes: {
//     actionbar: 'pell-actionbar',
//     button: 'pell-button',
//     content: 'pell-content',
//     selected: 'pell-button-selected'
//   }
// })

// // Execute a document command, see reference:
// // https://developer.mozilla.org/en/docs/Web/API/Document/execCommand
// // this is just `document.execCommand(command, false, value)`
// // pell.exec(command<string>, value<string>)





// Polyfill IE 9+ .closest
// @source: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}