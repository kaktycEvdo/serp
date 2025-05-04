export default function LinkedSupplier({ supplier, setThing, changeForm, open }) {
  return (
    <>
      <div
        className="grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer"
        onClick={() => {
          setThing(supplier);
          changeForm(2);
          open();
        }}
      >
        <div>Наименование: {supplier["name"]}</div>
        <div>
          Описание:{" "}
          {supplier["description"] != ""
            ? supplier["description"]
            : "У данного поставщика нет описания."}
        </div>
      </div>
    </>
  );
}
