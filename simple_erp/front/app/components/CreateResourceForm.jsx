export default function CreateResourceForm({url_rf, axios, changeOpenedRF}){
    return(
        <form className='grid grid-cols-2 gap-5' onSubmit={(e) => {
                    e.preventDefault();
                    changeOpenedRF(false);
                    let rf_fields = document.querySelectorAll('input.rf, textarea.rf');
                    axios.post(url_rf, {
                        mode: 'cors',
                        name: rf_fields[0].value,
                        description: rf_fields[1].value,
                        amount: rf_fields[2].value,
                        income: rf_fields[3].value,
                        consumption: rf_fields[4].value,
                        safestock: rf_fields[5].value,
                        price: rf_fields[6].value,
                        command: 'add',
                        user_id: localStorage.getItem('user')
                    }, {headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }});
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
    )
}