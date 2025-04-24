import { useEffect, useState } from 'react';
import { Modal } from '../components/UI/Modal.jsx';
import axios from 'axios';
import CreateUserForm from '../components/CreateUserForm.jsx';

const url_get = 'http://localhost/serp/get.php?';
const url_user = 'http://localhost/serp/user.php/';

export function UserManagement() {
    let [data, setData] = useState(null);

    let [opened_user_form, changeOpenedUF] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/serp/org.php?command=acception&id='+localStorage.getItem('user')).then((res) => {
            if(res.data != 1){
                redirect('/');
            }
        })
        axios.get(url_get+'item=users&command=getAll&user_id='+localStorage.getItem('user'), {mode:'cors'}).then(res => {setData(res.data)});
    }, [])
    
    return <div className='flex w-screen h-full justify-center flex-col items-center'>
            <Modal opened={opened_user_form} close={() => changeOpenedUF(false)}>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-center">
                    <h3 className="modal-title text-base font-semibold text-gray-900">
                        Добавление/Изменение работника
                    </h3>
                    <CreateUserForm url={url_user} changeOpenedUF={changeOpenedUF} axios={axios} />
                </div>
            </Modal>
            <div className='flex max-h-full overflow-y-scroll w-full justify-center items-start'>
                <div className='p-5 w-full grid grid-flow-row gap-5'>
                    <div className='h-fit grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <h2 className='col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-5'>Не принятые пользователи</h2>
                        {
                            data ? (data['not_accepted'].length > 0 ? data['not_accepted'].map((user, index) => {
                                return <div key={"n"+index} className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                                <div>Почта: {user['email']}</div>
                            </div>
                            }) : <>Нет ресурсов</>) : <>Загрузка...</>
                        }
                    </div>
                    <div className='h-fit grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                        <h2 className='col-start-1 sm:col-end-2 md:col-end-3 lg:col-end-5'>Принятые пользователи</h2>
                        {
                            data ? (data['accepted'].length > 0 ? data['accepted'].map((user, index) => {
                                return <div key={"n"+index} className='grid h-full p-5 justify-center items-center text-center dark:bg-emerald-950 hover:cursor-pointer rounded-md'>
                                <div>Почта: {user['email']}</div>
                            </div>
                            }) : <>Нет ресурсов</>) : <>Загрузка...</>
                        }
                    </div>
                    
                </div>
            </div>
        </div>;
    }
  
  