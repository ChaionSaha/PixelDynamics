"use client"

import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';


export default function App() {
    const editorRef = useRef(null);
    const [editorContent, setEditorContent] = useState("");

    const handleEditorChange = (content, editor) => {
        setEditorContent(content);
    };

    const handleCopyClick = async () => {
        
    };

    return (
        <div className="container mx-auto my-10">
            <Editor
                apiKey='vbjou9orge9dwgk0zs4cawcvozpnk3u0e0vhbihiq886am63'
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                }}
                initialValue="Welcome to TinyMCE!"
                onInit={(evt, editor) => editorRef.current = editor}
                onEditorChange={handleEditorChange}
            />

            <div className="border p-3 my-5" dangerouslySetInnerHTML={{__html: editorContent}}/>
            <div className="border p-3">
                {
                    editorContent
                }
            </div>
            <button onClick={() => handleCopyClick()} className="btn my-3 btn-sm btn-primary text-white">Copy to
                clipboard
            </button>
        </div>
    );
}