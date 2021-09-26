import { ThemeProvider } from '@material-ui/core'
import { toolbarTheme } from '../../utilities.js'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'beautiful-react-hooks';

export const PostForm = ({
    showForm,
    close,
    setTitle,
    setDescription,
    title,
    description
}) => {
    const isMobile = useMediaQuery('(max-width: 820px)');

    return <ThemeProvider theme={toolbarTheme}>
        {
            !isMobile ? <div className="textfields">
                <TextField
                    label="Title"
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Short description"
                    multiline
                    rows={5}
                    fullWidth
                    margin="dense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div> : <Dialog
                fullScreen
                open={showForm}
                className="postForm-modal"
            >
                <FontAwesomeIcon
                    className="close"
                    icon={faTimes}
                    size='1x'
                    onClick={close}
                />
                <TextField
                    label="Title"
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Short description"
                    multiline
                    rows={5}
                    fullWidth
                    margin="dense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Dialog>
        }
    </ThemeProvider>
};
export default PostForm;