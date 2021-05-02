
import Select from 'react-select';

const CustomSelect=({label, options, handleChange})=>{
    return(
        <div className="">
            <label htmlFor="">{label}</label>
            <Select
                defaultValue="one"
                options={options}
                onChange={handleChange}
            />
        </div>
    )
}

export default CustomSelect;