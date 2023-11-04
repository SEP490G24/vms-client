import React, { useState } from 'react'
import { CKEditorWrapper } from './styles'
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { Alignment } from '@ckeditor/ckeditor5-alignment'
import { Autoformat } from '@ckeditor/ckeditor5-autoformat'
import { Bold, Italic, Strikethrough, Underline } from '@ckeditor/ckeditor5-basic-styles'
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote'
import { FontColor, FontSize } from '@ckeditor/ckeditor5-font'
import { Heading } from '@ckeditor/ckeditor5-heading'
import { Indent } from '@ckeditor/ckeditor5-indent'
import { Link } from '@ckeditor/ckeditor5-link'
import { List } from '@ckeditor/ckeditor5-list'
import { Mention } from '@ckeditor/ckeditor5-mention'
import { Paragraph } from '@ckeditor/ckeditor5-paragraph'
import { WordCount } from '@ckeditor/ckeditor5-word-count'
import { SharedInput } from '~/common'

interface SharedCkEditorProps {
  config?: any
  data?: string
  disabled?: boolean
  disableWatchdog?: any
  id?: any
  maxLength?: number
  onBlur?: (event: any, editor: any) => void
  onChange?: (event: any, editor: any) => void
  onError?: (error: any, details: any) => void
  onFocus?: (event: any, editor: any) => void
  onMaxLengthExceeded?: () => void
  onMaxLengthSubceeded?: () => void
  onReady?: (editor: any) => void
  watchdogConfig?: any
}

export const SharedCkEditor: React.FC<SharedCkEditorProps> = React.memo((props) => {

  const [characters, setCharacters] = useState(0)

  return (
    <CKEditorWrapper>
      <SharedInput inputClassName={'hidden'}></SharedInput>
      <CKEditor
        config={{
          plugins: [
            Alignment,
            Autoformat,
            BlockQuote,
            Bold,
            FontColor,
            FontSize,
            Heading,
            Indent,
            Italic,
            Link,
            List,
            Mention,
            Paragraph,
            Strikethrough,
            Underline,
            WordCount
          ],
          toolbar: [
            'undo',
            'redo',
            '|',
            'fontSize',
            'fontColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            '|',
            'outdent',
            'indent',
            '|',
            'link'
          ],
          wordCount: {
            displayCharacters: true,
            onUpdate: (data: {
              words: number;
              characters: number;
            }) => {
              setCharacters(data.characters)
              if (props.maxLength) {
                if (data.characters > props.maxLength) {
                  props.onMaxLengthExceeded && props.onMaxLengthExceeded()
                } else {
                  props.onMaxLengthSubceeded && props.onMaxLengthSubceeded()
                }
              }
            }
          },
          ...props.config
        }}
        editor={ClassicEditor}
        id={props.id}
        data={props.data}
        watchdogConfig={props.watchdogConfig}
        onReady={(editor: any) => {
          if (editor.ui.getEditableElement()) {
            editor.ui.getEditableElement().parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            )
          }
          props.onReady
        }}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onError={props.onError}
      />
      {props.maxLength && <span style={{
        bottom: '-22px',
        color: '#00000073',
        position: 'absolute',
        right: 0
      }}>{characters} / {props.maxLength}</span>}
    </CKEditorWrapper>
  )
})
