// Crie um componente dinâmico para o CKEditor
// components/CKEditorComponent.tsx
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CKEditorComponent = () => {
 return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Digite aqui...</p>"
      onReady={(editor) => {
        console.log('Editor is ready to use!', editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log({ event, editor, data });
      }}
    />
 );
};

export default CKEditorComponent;
