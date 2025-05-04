export default function LinkedWarehouse({
  warehouse,
  setThing,
  open,
  changeForm,
}) {
  return (
    <>
      <div
        onClick={() => {
          setThing(warehouse);
          changeForm(1);
          open();
        }}
        className="grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer"
      >
        <div>Наименование: {warehouse["name"]}</div>
        <div>
          Описание:{" "}
          {warehouse["description"] != ""
            ? warehouse["description"]
            : "У данного склада нет описания."}
        </div>
      </div>
    </>
  );
}
