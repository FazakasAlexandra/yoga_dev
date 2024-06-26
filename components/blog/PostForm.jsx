import { ThemeProvider } from '@material-ui/core'
import { toolbarTheme } from '../../utilities.js'
import TextField from '@material-ui/core/TextField'
import { OptionsList as CategoriesList } from './'

import Dialog from '@material-ui/core/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'beautiful-react-hooks';
import { useTranslation } from 'next-i18next';

export const PostForm = ({
    showForm,
    close,
    setTitle,
    setDescription,
    title,
    description,
    categories,
    setCategories
}) => {
    const isMobile = useMediaQuery('(max-width: 820px)');
    const { t } = useTranslation();


    return <ThemeProvider theme={toolbarTheme}>
        {
            !isMobile ? <div className="textfields">
                <TextField
                    label={t("common:title")}
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label={t("common:short description")}
                    multiline
                    rows={5}
                    fullWidth
                    margin="dense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <CategoriesList
                    options={categories}
                    setOptions={setCategories}
                    label={t("categories:post categories")}
                />
            </div> : <Dialog
                fullScreen
                open={showForm}
                className="form-modal"
            >
                <FontAwesomeIcon
                    className="close"
                    icon={faTimes}
                    size='1x'
                    onClick={close}
                />
                <TextField
                    label={t("common:title")}
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label={t("common:short description")}
                    multiline
                    rows={5}
                    fullWidth
                    margin="dense"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <CategoriesList
                    options={categories}
                    setOptions={setCategories}
                    label={t("categories:post categories")}
                />
            </Dialog>
        }
    </ThemeProvider>
};
export default PostForm;