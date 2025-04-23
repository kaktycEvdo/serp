import { useState } from 'react';
import { Modal } from '../components/UI/Modal.jsx';
import ky from 'ky';

const url_rf = 'http://localhost/serp/resource.php/';
const url_wf = 'http://localhost/serp/warehouse.php/';
const url_gf = 'http://localhost/serp/goal.php/';
const url_sf = 'http://localhost/serp/supplier.php/';
const url_snf = 'http://localhost/serp/snapshot.php/';

export function Analytics() {
    async function getResources(){
        // return await ky.post(url_rf, {mode: "cors", headers: {"content-type": "application/x-www-form-urlencoded"}, body: "command=getAll"}).json();
    }

    let [opened, changeOpened] = useState(false);
    function close(){
        changeOpened(false);
    }
    let [opened_res_form, changeOpenedRF] = useState(false);
    let [opened_ware_form, changeOpenedWF] = useState(false);
    function closeWF(){
        changeOpenedWF(false);
    }
    let [opened_goal_form, changeOpenedGF] = useState(false);
    function closeRF(){
        changeOpenedGF(false);
    }
    let [opened_supp_form, changeOpenedSF] = useState(false);
    function closeSF(){
        changeOpenedSF(false);
    }

    let list = getResources();
    
    return <div className='flex w-screen h-screen justify-center flex-col items-center'>
            <Modal opened={opened} close={close}>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                    <h3
                        className="modal-title text-base font-semibold text-gray-900"
                    >
                        Загрузка отчёта
                    </h3>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Проверьте отчёт и, при необходимости, загрузите его.
                        </p>
                    </div>
                    <embed src="http://localhost/serp/pdf_show.php" height={600} width={450} />
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:ml-3 sm:w-auto"
                        onClick={() => {
                            this.props.close();
                        }}
                    >
                        Загрузить
                    </button>
                </div>
            </Modal>
            <Modal opened={opened_res_form} close={() => changeOpenedRF(false)}>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                    <h3 className="modal-title text-base font-semibold text-gray-900">
                        Добавление ресурса
                    </h3>
                    <form className='grid grid-cols-2 gap-5' onSubmit={(e) => {
                                    e.preventDefault();
                                    // changeOpenedRF(false);
                                    let rf_fields = document.querySelectorAll('input.rf, textarea.rf');
                                    let response = ky.post(url_rf, {
                                        mode: 'cors',
                                        body: "name="+rf_fields[0].value+"&description="+rf_fields[1].value+"&amount="+rf_fields[2].value+"&income="+rf_fields[3].value+"&consumption="+rf_fields[4].value+"&safestock="+rf_fields[5].value+"&price="+rf_fields[6].value+"&command=add",
                                        headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                    }).then(res => console.log(res.text()));

                                }}>
                        <label htmlFor="rf_name">Наименование</label>
                        <input type="text" className='rf bg-white text-black border-2 border-black' name="name" id="rf_name" />
                        <label htmlFor="rf_description">Описание</label>
                        <textarea className='rf bg-white text-black border-2 border-black' name="description" id="rf_description"></textarea>
                        <label htmlFor="rf_amount">Количество</label>
                        <input type="number" defaultValue={0} max={100000000} min={0} className='rf bg-white text-black border-2 border-black' name="amount" id="rf_amount" />
                        <label htmlFor="rf_income">Доход</label>
                        <input type="number" defaultValue={0} max={100000000} min={0} className='rf bg-white text-black border-2 border-black' name="income" id="rf_income" />
                        <label htmlFor="rf_consumption">Убыток</label>
                        <input type="number" defaultValue={0} max={100000000} min={0} className='rf bg-white text-black border-2 border-black' name="consumption" id="rf_consumption" />
                        <label htmlFor="rf_safestock">"Подушка безопасности"</label>
                        <input type="number" defaultValue={0} max={100000000} min={0} className='rf bg-white text-black border-2 border-black' name="safestock" id="rf_safestock" />
                        <label htmlFor="rf_price">Цена</label>
                        <input type="number" defaultValue={0} max={10000000000} min={0} className='rf bg-white text-black border-2 border-black' name="price" id="rf_price" />
                        <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
                            <input
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:w-auto"
                                 value={'Создать'} />
                        </div>
                    </form>
                </div>
            </Modal>
            <div className='grid grid-cols-2 grid-flow-col w-full h-full justify-center items-start'>
                <div className='p-5 w-1/2 grid grid-flow-row gap-5'>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpenedRF(true);
                    }}>
                        Добавить ресурс
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                        Добавить склад
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                        Добавить цель
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                        Добавить поставщика
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                        Сделать "снимок"
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpened(true);
                    }}>
                        Просмотреть отчёт
                    </div>
                </div>
                <div className='p-5 w-full grid grid-flow-row gap-5'>
                    <div className='h-fit'>
                        <h2 className='h-10'>Ресурсы</h2>
                        <div className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                            <div>Наименование: Труба 200х10 Сталь</div>
                            <div>Описание: У данного ресурса нет описания.</div>
                            <div>Количество: 1500000шт.</div>
                            <div>Количество расходуется: 515000шт.</div>
                            <div>Количество поставляется: 500000шт.</div>
                            <div>"Подушка безопасности": 600000шт.</div>
                            <div>Цена за шт.: 600000шт.</div>
                        </div>
                    </div>
                    <div className='h-fit'>
                        <h2 className='h-10'>Склады</h2>
                        <div className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                            <div>Наименование: Для металла</div>
                            <div>Описание: У данного склада нет описания.</div>
                            <div>Адрес: г. Барнаул, ул. Антона Петрова, д. 520б</div>
                            <div>Хранимый ресурс: Труба 10х20 Сталь</div>
                        </div>
                    </div>
                    <div className='h-fit'>
                        <h2 className='h-10'>Цели</h2>
                        <div className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                            <div>Наименование: Создавать котлы</div>
                            <div>Описание: У данной цели нет описания.</div>
                            <div>Листинг:<div>Необходимо: Труба 200х10 Сталь, Количество: 515000шт.</div></div>
                            <div>Срок окончания цели: Нету.</div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>;
    }
  
  