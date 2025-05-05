export default function ReportModal({ close }) {
  return (
    <>
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
        <h3 className="modal-title text-base font-semibold text-gray-900">
          Загрузка отчёта
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Проверьте отчёт и, при необходимости, загрузите его.
          </p>
        </div>
        <embed
          src={"http://serp.infinityfreeapp.com/pdf_show.php?user_id="+localStorage.getItem('user')}
          height={600}
          width={450}
        />
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:ml-3 sm:w-auto"
          onClick={() => {
            close();
          }}
        >
          Загрузить
        </button>
      </div>
    </>
  );
}
