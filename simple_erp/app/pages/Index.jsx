import { Component } from "react";
import { Link } from "react-router";

export class Index extends Component {
  render() {
    return (
      <>
        <h1>Добро пожаловать в программу SERP</h1>
        <p>
          Данное веб-приложение разработано для концептуальных манипуляций
          ресурсами.
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 sm:w-full lg:w-1/2 p-10 h-56 gap-5">
          <Link
            to="dashboard"
            className="flex justify-center items-center bg-emerald-400 dark:bg-emerald-900 rounded-xl"
          >
            Перейти к панели управления
          </Link>
          <Link
            to="documentation"
            className="flex justify-center items-center bg-emerald-400 dark:bg-emerald-900 rounded-xl"
          >
            Перейти к документации
          </Link>
        </div>
      </>
    );
  }
}
