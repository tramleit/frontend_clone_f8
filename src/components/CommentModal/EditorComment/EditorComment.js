import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

function EditorComment({ setHtml, setText, authorCmt }) {
    const handleEditorChange = ({ html, text }) => {
        setText(text);
        setHtml(html);
    };

    return (
        <MdEditor
            style={{ height: 280 }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            placeholder="Bạn có thắc mắc gì trong bài học này?"
            view={{ html: false }}
            defaultValue={authorCmt ? `@${authorCmt.name}: ` : ''}
            autoFocus={true}
        />
    );
}

export default EditorComment;
