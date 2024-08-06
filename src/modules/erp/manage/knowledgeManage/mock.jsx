import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const KnowledgeManage = () => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log("data: ", data);
  };
  return (
    <div>
      <h2>My CKEditor Integration</h2>
      <CKEditor
        editor={ClassicEditor}
        config={{
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "bulletedList",
              "numberedList",
              "|",
              "undo",
              "redo",
            ],
          },
          mention: {
            // Mention configuration (optional)
          },
          initialData: "<p>Hello from CKEditor 5 in React!</p>",
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          handleEditorChange(event, editor);
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default KnowledgeManage;
