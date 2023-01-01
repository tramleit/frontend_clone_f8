import { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { handleUploadImage } from '~/services/apiImage';

const mdParser = new MarkdownIt();

function EditorNewPost({ handleGetDataNewPost }) {
    const [text, setText] = useState('');
    const [html, setHtml] = useState('');
    const [image, setImage] = useState('');

    const handleEditorChange = ({ html, text }) => {
        setText(text);
        setHtml(html);
    };

    useEffect(() => {
        handleGetDataNewPost({ text, html, image });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, html, image]);

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const result = await handleUploadImage(formData);
        if (result.errCode === 0) {
            setImage(result.data.urlImage);
            return result.data.urlImage;
        } else {
            alert('Upload ảnh thất bại');
        }
    };

    return (
        <MdEditor
            style={{ height: '100vh' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            onImageUpload={handleUpload}
        />
    );
}

export default EditorNewPost;
