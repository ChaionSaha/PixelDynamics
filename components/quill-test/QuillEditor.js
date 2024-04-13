"use client"

import "react-quill/dist/quill.snow.css";
import {useState} from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});


const modules = {
    toolbar: [
        [{font: []}],
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        ["bold", "italic", "underline", "strike"],
        [{color: []}, {background: []}],
        [{script: "sub"}, {script: "super"}],
        ["blockquote", "code-block"],
        [{list: "ordered"}, {list: "bullet"}],
        [{indent: "-1"}, {indent: "+1"}, {align: []}],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const QuillEditor = ({id, setValue}) => {
    const [editor, setEditor] = useState(null);

    return <div className="container mx-auto">
        <ReactQuill modules={modules} theme="snow" placeholder="Content goes here..."
                    onChange={(e) => setValue(id, e)}/>
        {/*{*/}
        {/*    editor*/}
        {/*}*/}
        {/*<div dangerouslySetInnerHTML={{__html: editor}} className='border p-5 my-5'></div>*/}
    </div>
};

export default QuillEditor;