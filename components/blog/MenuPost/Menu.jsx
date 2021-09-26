import { ThemeProvider } from '@material-ui/core'
import { toolbarTheme } from '../../../utilities.js'
import TextField from '@material-ui/core/TextField'

export const Menu = ({ setTitle, setDescription, title, description }) => {
    return (
        <ThemeProvider theme={toolbarTheme}>
            <div className="textfields">
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
            </div>
        </ThemeProvider>
    );
};
export default Menu;