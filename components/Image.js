import { useSelected, useFocused } from "slate-react";

const Image = ({ attributes, element, children }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <img
          alt={element.alt}
          src={element.url}
          style={{
            cursor: "pointer",
            display: "block",
            width: "100%",
            boxShadow: `${selected && focused ? '0 0 0 6px #B4D5FF' : 'none'}`
          }}
        />
      </div>
      {children}
      </div>
  );
};
export default Image;