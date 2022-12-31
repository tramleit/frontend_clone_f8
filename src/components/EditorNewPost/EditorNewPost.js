import React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt();

function EditorNewPost() {
    const handleEditorChange = ({ html, text }) => {
        console.log('text: ', text);
        console.log('html: ', html);
    };

    return (
        <MdEditor
            style={{ height: '100vh' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
        />
    );
}

export default EditorNewPost;
