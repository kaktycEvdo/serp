export default function Cell(props) {
    return (
      <div className={"grid h-full w-full p-5 justify-center items-center text-center bg-emerald-600 dark:bg-emerald-900 hover:bg-emerald-950 hover:cursor-pointer "+props.additional_classes} onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
  