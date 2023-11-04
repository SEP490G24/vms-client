import styled from 'styled-components'


export const CKEditorWrapper = styled.div`
  width: 100%;

  .ck.ck-editor__editable_inline {
    padding: 0 16px;
  }

  .ck.ck-editor__editable_inline.ck-blurred {
    border: 1px solid #d9d9d9;
  }

  .ck.ck-editor__editable_inline.ck-focused {
    border: 1px solid #4096ff;
    box-shadow: none;
  }

  .ck-editor__editable_inline:not(.ck-comment__input *) {
    height: 120px;
    overflow-y: auto;
  }
`
