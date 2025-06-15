export default function ModalButton({
    onClick,
    title,
    color
  }) {
    return (
      <div
        className={"flex text-white justify-center items-center h-full p-2 bg-"+color+"-700 hover:cursor-pointer rounded-md hover:bg-"+color+"-800 border-2 border-"+color+"-800"}
        onClick={onClick}
      >
        {title}
      </div>
    );
  }
  