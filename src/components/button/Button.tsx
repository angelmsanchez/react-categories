import clsx from "clsx";
import "./Button.css";

interface Props {
  icon?: string;
  selected?: boolean;
  title?: string;
  onClick?: () => void;
}

export function Button({ icon, selected, title, onClick }: Props) {
  return (
    <button
      title={title}
      className={clsx("file-button", {
        selected: selected,
      })}
      onClick={onClick}
    >
      <span className="material-icons">{icon}</span>
    </button>
  );
}
