import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function Note({ id, text, deleteNote }) {
  return (
    <div className="note">
      <textarea className="note__body" cols="10" rows="5" placeholder="Type...." maxlength="100" spellcheck="false">{text}</textarea>
      <div className="note__footer" style={{ justifyContent: "space-between" }}>
        <DeleteForeverOutlinedIcon
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
        ></DeleteForeverOutlinedIcon>
        <SaveOutlinedIcon
          className="note__delete"
          onClick={() => deleteNote(id)}
          aria-hidden="true"
        ></SaveOutlinedIcon>        
      </div>
    </div>
  );
}

export default Note;
