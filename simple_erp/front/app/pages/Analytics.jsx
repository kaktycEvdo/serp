import { useEffect, useState } from 'react';
import { Modal } from '../components/UI/Modal.jsx';
import axios from 'axios';
import CreateResourceForm from '../components/CreateResourceForm.jsx';
import CreateWarehouseForm from '../components/CreateWarehouseForm.jsx';

const url_get = 'http://localhost/serp/get.php?';
const url_rf = 'http://localhost/serp/resource.php/';
const url_wf = 'http://localhost/serp/warehouse.php/';
const url_gf = 'http://localhost/serp/goal.php/';
const url_sf = 'http://localhost/serp/supplier.php/';
const url_snf = 'http://localhost/serp/snapshot.php/';

export function Analytics() {
    let [data, setData] = useState(null);

    let [opened, changeOpened] = useState(false);
    function close(){
        changeOpened(false);
    }
    let [opened_res_form, changeOpenedRF] = useState(false);
    let [opened_ware_form, changeOpenedWF] = useState(false);
    let [opened_goal_form, changeOpenedGF] = useState(false);
    let [opened_supp_form, changeOpenedSF] = useState(false);

    function getDaysUntilSafestock(resource){
        let days = 0;
        let dynamic = resource['consumption'] - resource['income'];
        let total_amount = resource['amount'];
        while(total_amount != resource['safestock']){
            total_amount-=dynamic;
            days++;
        }
        return days;
    }

    useEffect(() => {
        axios.get('http://localhost/serp/org.php?command=acception&id='+localStorage.getItem('user')).then((res) => {
            if(res.data != 1){
                redirect('/');
            }
        })
        axios.get(url_get+'item=everything&command=getAll&user_id='+localStorage.getItem('user'), {mode:'cors'}).then(res => {setData(res.data)});
    }, [])
    
    return <div className='flex w-screen h-full justify-center flex-col items-center'>
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
                    <CreateResourceForm url_rf={url_rf} changeOpenedRF={changeOpenedRF} axios={axios} />
                </div>
            </Modal>
            <Modal opened={opened_ware_form} close={() => changeOpenedWF(false)}>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                    <h3 className="modal-title text-base font-semibold text-gray-900">
                        Добавление склада
                    </h3>
                    {data ? <CreateWarehouseForm url={url_wf} changeOpened={changeOpenedWF} axios={axios} resources={data['resources']} /> : <>Загрузка...</>}
                </div>
            </Modal>
            <div className='grid max-h-full overflow-y-scroll grid-cols-2 grid-flow-col w-full justify-center items-start'>
                <div className='p-5 w-1/2 grid grid-flow-row gap-5'>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpenedRF(true);
                    }}>
                        Добавить ресурс
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpenedWF(true);
                    }}>
                        Добавить склад
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpenedGF(true);
                    }}>
                        Добавить цель
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpenedSF(true);
                    }}>
                        Добавить поставщика
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        axios.post(url_snf, {mode: 'cors', command: 'create'}, {headers: {"Content-Type": "application/x-www-form-urlencoded"}});
                    }}>
                        Сделать "снимок"
                    </div>
                    <div className='flex justify-center items-center h-30 dark:bg-emerald-950 hover:cursor-pointer rounded-md' onClick={() => {
                        changeOpened(true);
                    }}>
                        Просмотреть отчёт
                    </div>
                </div>
                <div className='p-5 w-full grid grid-flow-row gap-5'>
                    <div className='h-fit flex flex-col gap-5'>
                        <h2>Ресурсы</h2>
                        {
                            data ? (data['resources'].length > 0 ? data['resources'].map((resource, index) => {
                                return <div key={index} className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                                    <div>Наименование: {resource['name']}</div>
                                    <div>Описание: {resource['description'] != '' ? resource['description'] : 'У данного ресурса нет описания.'}</div>
                                    <div>Количество: {resource['amount']}шт.</div>
                                    <div>Потребление: {resource['consumption']}шт.</div>
                                    <div>Прирост: {resource['income']}шт.</div>
                                    <div>Динамика: {resource['income'] - resource['consumption'] < 0 ? "Убыль в "+(resource['consumption'] - resource['income']) : "Прибыль в "+(resource['income'] - resource['consumption'])}шт.</div>
                                    <div>"Подушка безопасности": {resource['safestock']}шт.</div>
                                    {/*resource['income'] - resource['consumption'] < 0 ? <div>Достижение "подушки" через: {getDaysUntilSafestock(resource)} дней, {new Date(Date() + getDaysUntilSafestock(resource))}</div> : <></>*/}
                                    <div>Цена: {resource['price']}руб.</div>
                                </div>
                            }) : <>Нет ресурсов.</>) : <>Загрузка...</>
                        }
                    </div>
                    <div className='h-fit flex flex-col gap-5'>
                        <h2>Склады</h2>
                        {
                            data ? (data['warehouses'].length > 0 ? data['warehouses'].map((warehouse, index) => {
                                return <div key={"w"+index} className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                                    <div>Наименование: {warehouse['name']}</div>
                                    <div>Описание: {warehouse['description'] != '' ? warehouse['description'] : 'У данного склада нет описания.'}</div>
                                    <div>Адрес: {warehouse['address']}</div>
                                    <div>Ресурс: {warehouse['resource_name']}</div>
                                    <div>Количество ресурса на складе: {warehouse['resource_amount']}</div>
                                </div>
                            }): <>Нет складов.</>) : <>Загрузка...</>
                        }
                    </div>
                    <div className='h-fit flex flex-col gap-5'>
                        <h2>Цели</h2>
                        {
                            data ? (data['goals'].length > 0 ? data['goals'].map((goal, index) => {
                                return <div key={"g"+index} className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                                    <div>Наименование: {goal['name']}</div>
                                    <div>Описание: {goal['description'] != '' ? goal['description'] : 'У данной цели нет описания.'}</div>
                                    <div>Дата окончания действия: {goal['deadline'] != null ? goal['deadline'] : 'Нету.'}</div>
                                    <div>Листинг: {goal['resource_name']}</div>
                                </div>
                            }): <>Нет целей.</>) : <>Загрузка...</>
                        }
                    </div>
                    
                </div>
            </div>
        </div>;
    }
  
  