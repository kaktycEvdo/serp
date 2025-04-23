import { useState } from 'react';
import ky from 'ky';
import { Modal } from '../components/UI/Modal';

const url = 'http://localhost/serp/user.php/';

function validateEmail(email){
    if(!email.match(/[a-z0-9._-]+@[a-z]{3,}\.[a-z]{2,3}/)){
        return [1, 'Электронная почта пользователя не соответствует стандарту'];
    }

    return [0, 'Почта валидна'];
}

export function Auth(){
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [opened, setOpened] = useState(false);
    const [status, setStatus] = useState('error');

    async function exportData(email, password){
        const response = await ky.post(url, {
            mode: 'cors',
            body: "email="+email+"&password="+password+"&command=auth",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        let text = response.text();
        if(validateEmail(text)[0] == 0){
            localStorage.setItem('user', text);
            setStatus('success');
            setOpened(true);
        }
    }

    function changeEmail(email){
        if(email.trim() != ''){
            let validationRes = validateEmail(email);
            if(validationRes[0] === 1){
                document.getElementById('error-box').innerHTML = validationRes[1];
            }
            else{
                setEmail(email);
                document.getElementById('error-box').innerHTML = '';
            }
        }
    }
    function changePassword(password){
        if(password.trim() != ''){
            if(password.length < 6){
                document.getElementById('error-box').innerHTML = 'Пароль меньше 6 символов';
            }
            else{
                setPassword(password);
                document.getElementById('error-box').innerHTML = '';
            }
        }
    }

    return (
        <>
        <Modal opened={opened} close={() => setOpened(false)}>
            {status == 'error' ? <><h2>Ошибка авторизации</h2></> : <><h2>Успешная авторизация</h2></>}
        </Modal>
        <div className='flex justify-center flex-col items-center'>
            <div className='flex p-5 justify-center flex-col items-center gap-5 bg-gray-800 border-2 dark:border-white w-2xs'>
                <h1>Авторизация</h1>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' onChange={(e) => {
                    changeEmail(e.target.value);
                }} className='bg-white rounded-md text-black p-1 border-2 border-black dark:border-0' />
                <label htmlFor="password">Password:</label>
                <input type="password" name='password' onChange={(e) => {
                    changePassword(e.target.value);
                }} className='bg-white rounded-md text-black p-1 border-2 border-black dark:border-0' />
                <input type="button" value="Отправить данные" onClick={() => exportData(email, password)} />
                <div id='error-box' className='error-box text-red-600 max-w-1/2 text-center'>
                    Заполните поля.
                </div>
            </div>
        </div>
        </>
        
    );
}