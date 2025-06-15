import { host } from "../host";

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
          src={host+"pdf_show.php?user_id="+localStorage.getItem('user')}
          height={600}
          width={450}
        />
      </div>
      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <a className="flex text-white justify-center items-center h-full p-2 bg-emerald-700 hover:cursor-pointer rounded-md hover:bg-emerald-800 border-2 border-emerald-800" href={"http://localhost/serp/pdf_show.php?user_id="+localStorage.getItem('user')} download="doc.pdf" onClick={() => {
            close();
          }}>Загрузить</a>
      </div>
    </>
  );
}
