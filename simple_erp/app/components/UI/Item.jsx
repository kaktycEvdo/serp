export default function Item(props) {
    return (
      <div className={"grid h-full p-5 justify-center items-center text-center border-4 border-emerald-950 bg-emerald-600 dark:bg-emerald-900 hover:cursor-pointer hover:bg-emerald-950 rounded-md "+props.additional_classes} onClick={props.onClick}>
        {props.children}
      </div>
    );
  }
  