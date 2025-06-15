export default function ModalInputButton({
    title,
    color
  }) {
    return (
      <input
        className={"flex text-white justify-center items-center h-full p-2 bg-"+color+"-700 hover:cursor-pointer rounded-md hover:bg-"+color+"-800 border-2 border-"+color+"-800"}
        defaultValue={title}
        type="submit"
      />
    );
  }
  