CKEDITOR.plugins.add( 'nbsp',
{
	init : function( editor )
	{
		// Insert &nbsp; if Ctrl+Space is pressed (or button):
		editor.addCommand( 'insertNbsp', {
			exec: function( editor ) {
				editor.insertHtml( '&nbsp;' );
			}
		});
		// Ajout du bouton
		editor.ui.addButton('Nbsp', {
			label: 'Nbsp',
			voiceLabel: 'Nbsp',
			title: 'Insert a non-breaking space (CTRL + Space)',
			command: 'insertNbsp',
			//icon: this.path + 'images/nbsp.png'
		});
		editor.setKeystroke( CKEDITOR.CTRL + 32 /* space */, 'insertNbsp' );
	}

} );
// On force l'affiche du label pour le bouton Nbsp
CKEDITOR.on('instanceReady', function() {
    $(".cke_button__nbsp_label").css("display","inline");
	$(".cke_button__nbsp_icon").css("display","none");
});
CKEDITOR.plugins.add('Tag',
                     {
                       requires : ['richcombo'],
                       init : function( editor )
                       {
                         // array of strings to choose from that'll be inserted into the editor
                         var strings = getTags();
                         // add the menu to the editor
                         editor.ui.addRichCombo('Tag',
                                                {
                                                  label: 'Tag',
                                                  title: 'Tag',
                                                  voiceLabel: 'Tag',
                                                  className: 'cke_format',
                                                  multiSelect:false,
                                                  panel:
                                                  {
                                                    css: [ editor.config.contentsCss, CKEDITOR.skin.getPath('editor') ],
                                                    voiceLabel: editor.lang.panelVoiceLabel
                                                  },
                                                  
                                                  init: function()
                                                  {
                                                    this.startGroup( "Insert Tag" );
                                                    
                                                    for (var i in strings)
                                                    {
                                                      this.add(strings[i][0], strings[i][1], strings[i][2]);
                                                    }
                                                  },
                                                  
                                                  onClick: function( value )
                                                  {
                                                    editor.focus();
                                                    editor.fire( 'saveSnapshot' );
                                                    editor.insertHtml(value);
                                                    editor.fire( 'saveSnapshot' );
                                                  }
                                                });
                       }
                     });


					 
					 
function getTags() {
  var cnt;
  var tags = [];
  var indicesTags = [];
  var allOccurrences = [];
  var allContent = document.documentElement.innerHTML;
  var srcFrame = document.getElementsByTagName('iframe');
  
  for (var i=0; i < srcFrame.length; i++) {
    allContent += srcFrame[i].contentWindow.document.body.innerHTML;
  }
  
  allOccurrences = getIndicesOf(allContent, allOccurrences, '#');
  indicesTags = getIndicesOf(allContent, indicesTags, '#MM');
  indicesTags = getIndicesOf(allContent, indicesTags, '#CNT');
  
  for (var j = 0; j < indicesTags.length; j++) {
    for (var k = 0; k < allOccurrences.length; k++) {
      if(allOccurrences[k] > indicesTags[j]) {
        cnt = allOccurrences[k] + 1;
        tags.push([allContent.substring(indicesTags[j], cnt), allContent.substring(indicesTags[j], cnt), allContent.substring(indicesTags[j], cnt)]);
        break;
      }
    }
  }
  
  tags.sort();
  for (var i=0; i < tags.length; i++) {
    if(i>0 && tags[i][0] === tags[i-1][0]) {
      tags.splice(i,1);
      i--;
    }
  }
  
  return tags;
}

function getIndicesOf(str, indicesArr, searchStr) {
  var startIndex = 0, searchStrLen = searchStr.length;
  var index;
  
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indicesArr.push(index);
    startIndex = index + searchStrLen;
  }
  
  return indicesArr;
}

CKEDITOR.on( 'dialogDefinition', function( ev )
            {
              var dialogName = ev.data.name;
              var dialogDefinition = ev.data.definition;
              
              if ( dialogName == 'link')
              {
                var infoTab = dialogDefinition.getContents('info');
                
                // Add a dropdown select/combo to the "info" tab.
                infoTab.add( {
                  id : 'advStylesCust',
                  type : 'select',
                  label : 'Link Style',
                  'default': '',
                  items: [
                    [ 'No style', '' ],
                    [ 'Primary button', 'primaryButton' ],
                    [ 'Secondary button', 'secondaryButton' ]
                  ],
                  onChange:function(){var d = CKEDITOR.dialog.getCurrent();
                                      d.setValueOf("advanced", "advCSSClasses", this.getValue());
                                     }
                });
                
                dialogDefinition.onFocus = function()
                {
                  var ed = CKEDITOR.dialog.getCurrent();
                  ed.setValueOf("info", "advStylesCust", this.getValueOf('advanced', 'advCSSClasses'));
                };
                
              }
            });

CKEDITOR.stylesSet.add('templatesIntranetStyles',
                       [
                         // Titles
                         { name : 'Heading 2', element : 'h2' },    
                         { name : 'Heading 3', element : 'h3' },
                         { name : 'Heading 4', element : 'h4' },
                         { name : 'Heading 5', element : 'h5' },
                         { name : 'Heading 6', element : 'h6' },
                         { name : 'Smaller font', element : 'small'},
                         // Multimedia elements right & left
                         { name :'Multimedia left', element :'span', attributes :{ 'class':'multimedia-left' } },
                         { name :'Multimedia right', element :'span', attributes :{ 'class':'multimedia-right' } },
                         { name :'Multimedia center', element :'span', attributes :{ 'class':'multimedia-center' } },
                         
                         //{ name : 'Text primary', element : 'span', attributes :{ 'class':'text-primary' } },
                         //{ name : 'Text secondary', element : 'span', attributes :{ 'class':'text-secondary' } },
                         //{ name : 'Text muted', element : 'span', attributes :{ 'class':'text-muted' } },
                         //{ name : 'Text warning', element : 'span', attributes :{ 'class':'text-warning' } },
                         // Blockquote
                         { name : 'Blockquote', element : 'blockquote'},
                         
                         // Citation 
                         { name : 'Citation', element : 'cite' }
                       ]);

CKEDITOR.editorConfig = function( config ) {
  config.stylesSet = 'templatesIntranetStyles';
  config.contentsCss = [ ((typeof contextJsParameters != 'undefined') ? contextJsParameters.contextPath : '') + '/modules/ep-sife-template-set/css/ckeditor.css' ];
  config.extraPlugins = 'Tag,nbsp';
  config.toolbar = ["Source - Preview Print".split(" "), "Cut Copy Paste PasteText - Undo Redo".split(" "),
                    "Find Replace - SelectAll - wsc Scayt ACheck".split(" "), "/", "Bold Italic Underline Strike Subscript Superscript RemoveFormat".split(" "), "NumberedList BulletedList - Outdent Indent Blockquote".split(" "), ["Nbsp"],["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
                    ["Link", "Unlink", "Anchor"], "Image Flash Table HorizontalRule SpecialChar PageBreak".split(" "), "/", ["Styles", "Tag"],
                    ["TextColor", "BGColor"],
                    ["ShowBlocks", "Maximize", "-", "About"]
                   ];
  /*config.toolbar = ["Source - NewPage Preview Print - Templates".split(" "), "Cut Copy Paste PasteText PasteFromWord - Undo Redo".split(" "),
                    "Find Replace - SelectAll - wsc Scayt ACheck".split(" "), "/", "Bold Italic Underline Strike Subscript Superscript RemoveFormat".split(" "), "NumberedList BulletedList - Outdent Indent Blockquote CreateDiv".split(" "), ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
                    ["Link", "Unlink", "Anchor"], "Image Flash Table HorizontalRule Smiley SpecialChar PageBreak".split(" "), "/", ["Macros", "Tag", "Styles", "Format", "Font", "FontSize"],
                    ["TextColor", "BGColor"],
                    ["Maximize", "ShowBlocks", "-", "About"]
                   ];
 */
  
}
