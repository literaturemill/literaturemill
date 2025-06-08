'use client';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

type TitleEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function TitleEditor({ value, onChange }: TitleEditorProps) {
  const [isEmpty, setIsEmpty] = useState(true);
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: value,
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
    },
    onCreate: ({ editor }) => {
      setIsEmpty(editor.isEmpty);
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setIsEmpty(editor.isEmpty);
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
      <div className="relative">
        {isEmpty && (
          <p className="absolute left-2 top-2 text-gray-400 pointer-events-none">
            Title
          </p>
        )}
        <EditorContent editor={editor} className="min-h-[40px]" />
      </div>
    </div>
  );
}