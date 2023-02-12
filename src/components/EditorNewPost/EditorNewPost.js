import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { useDispatch, useSelector } from 'react-redux';

import { uploadImage } from '~/services/apiImage';
import { showNotification } from '~/redux/reducer/modunReducer';

const mdParser = new MarkdownIt();

function EditorNewPost({ setHtml, setText }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.login.currentUser);

    const handleEditorChange = ({ html, text }) => {
        setText(text);
        setHtml(html);
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const result = await uploadImage(formData, dispatch, currentUser.accessToken);
        if (result.statusCode === 0) {
            return result.data.urlImage;
        } else {
            dispatch(showNotification(result.message));
        }
    };

    return (
        <MdEditor
            style={{ height: '100vh', fontSize: '1.6rem' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            onImageUpload={handleUpload}
            placeholder="Nội dung viết ở đây"
            view={{ html: window.innerWidth < 1024 ? false : true }}
        />
    );
}

export default EditorNewPost;
