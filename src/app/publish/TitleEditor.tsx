'use client';

import { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

type TitleEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function TitleEditor({ value, onChange }: TitleEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value || '<p>Title</p>',
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2 border p-2 rounded-md bg-white text-black">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('bold') ? 'bg-indigo-200' : 'bg-gray-100'
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('italic') ? 'bg-indigo-200' : 'bg-gray-100'
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('underline') ? 'bg-indigo-200' : 'bg-gray-100'
          }`}
        >
          Underline
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}