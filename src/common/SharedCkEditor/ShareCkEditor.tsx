import { CkeditorWrapper } from './styles'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

interface SharedCkEditorProps {
  data?: any
  onReady?: (editor: any) => void
  onError?: (error: any, details: any) => void
  onChange?: (event: any, editor: any) => void
  onFocus?: (event: any, editor: any) => void
  onBlur?: (event: any, editor: any) => void
  config?: any
  disabled?: boolean
  watchdogConfig?: any
  id?: any
  disableWatchdog?: any
}

export default function SharedCkEditor(props: SharedCkEditorProps): JSX.Element {
  const { data, onReady, onError, onChange, onFocus, onBlur, watchdogConfig, id ,config} = props
  return (
    <CkeditorWrapper>
      <CKEditor
        config={ config}
        editor={ClassicEditor}
        id={id}
        data={data}
        watchdogConfig={watchdogConfig}
        onReady={onReady}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onError={onError}
      />
    </CkeditorWrapper>
  )
}
