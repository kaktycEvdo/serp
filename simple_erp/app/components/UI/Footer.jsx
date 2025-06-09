import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="hidden sm:flex flex-row items-center p-5 gap-5 h-20 border-emerald-400 border-t-4 ">
      <div>
        Почта для связи:{" "}
        <a href="mailto:tretyakov_i.105s9@stud.asu.ru" className="underline">
          tretyakov_i.105s9@stud.asu.ru
        </a>
      </div>
      <Link to="documentation">Ссылка на документацию</Link>
    </footer>
  );
}
