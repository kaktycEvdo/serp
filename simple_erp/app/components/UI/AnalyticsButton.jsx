export default function AnalyticsButton({
  open,
  changeForm,
  title,
  form_id,
  setThing,
}) {
  return (
    <div
      className="flex justify-center items-center h-full p-2 bg-amber-700 dark:bg-amber-900 hover:cursor-pointer rounded-md hover:bg-amber-950 border-2 border-amber-950"
      onClick={() => {
        open();
        changeForm(form_id);
        setThing(null);
      }}
    >
      {title}
    </div>
  );
}
