export default function AnalyticsButton({
  open,
  changeForm,
  title,
  form_id,
  setThing,
}) {
  return (
    <div
      className="flex justify-center items-center h-full p-2 bg-amber-700 dark:bg-amber-950 hover:cursor-pointer rounded-md"
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
