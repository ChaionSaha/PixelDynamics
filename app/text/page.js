"use client"

import React, {useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';

export default function App() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const [editorContent, setEditorContent] = useState("");

    const handleEditorChange = (content, editor) => {
        console.log(content);
        setEditorContent(content);
    };
    return (
        <>
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
            <button onClick={log}>Log editor content</button>
            <div dangerouslySetInnerHTML={{__html: editorContent}}/>
            {
                editorContent
            }
        </>
    );
}