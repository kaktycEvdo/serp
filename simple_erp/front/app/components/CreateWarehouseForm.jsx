export default function CreateWarehouseForm({url, axios, changeOpened, resources}){
    return(
        <form className='grid grid-cols-2 gap-5' onSubmit={(e) => {
                    e.preventDefault();
                    // changeOpened(false);
                    let wf_fields = document.querySelectorAll('input.wf, textarea.wf, select#wf_resource_id');
                    axios.post(url, {
                        mode: 'cors',
                        name: wf_fields[0].value,
                        description: wf_fields[1].value,
                        address: wf_fields[2].value,
                        resource_id: wf_fields[3].value,
                        user_id: localStorage.getItem('user'),
                        command: 'add',
                    }, {headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }}).then((res) => {console.log(res.data)});
                }}>
        <label htmlFor="wf_name">Наименование</label>
        <input type="text" className='wf bg-white text-black border-2 border-black' name="name" id="wf_name" />
        <label htmlFor="wf_description">Описание</label>
        <textarea className='wf bg-white text-black border-2 border-black' name="description" id="wf_description"></textarea>
        <label htmlFor="wf_address">Адрес</label>
        <input type="text" className='wf bg-white text-black border-2 border-black' name="address" id="wf_addres" />
        <label htmlFor="wf_resource_id">Ресурс</label>
        <select name="resource_id" id="wf_resource_id">
            {
                resources.length > 0 ? resources.map((resource, key) => {
                    return <option key={'ro'+key} value={resource['id']}>{resource['name']}</option>
                }) : <option value={"0"}>Нет ресурсов</option>
            }
        </select>
        <div className="px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6 col-start-1 col-end-3">
            <input
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-emerald-800 sm:w-auto"
                value={'Создать'} />
        </div>
    </form>
    )
}