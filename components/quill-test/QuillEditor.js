"use client"

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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

const QuillEditor = ({id, setValue, defaultValue}) => {
    return <div>
        <ReactQuill className='text-white' modules={modules} theme="snow" placeholder="Content goes here..."
            defaultValue={defaultValue}
            onChange={(e) => setValue(id, e)}/>
    </div>
};

export default QuillEditor;