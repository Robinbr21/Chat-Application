import React, { useState } from "react";

function Abbaji(props) {
    const [values, Setvalues] = useState([])

    const handleChange = (value) => {
        const isDuplicate = values.filter(_ => _ !== value);
        if (values.includes(value)) {
            Setvalues(isDuplicate)
        } else {
            Setvalues([...values, value])
        }
    };

    var lis = props.names.map((_val) => {
        const isDuplicate = values.includes(_val);
        const buttonText = isDuplicate ? `${_val} *` : _val;
        return (
            <button key={_val.key} onClick={() => handleChange(_val)}>
                {buttonText}
            </button>
        );
    });
    console.log(values)
    return (
        <div>
            <ul>
                {lis}
            </ul>
        </div>
    )
}

export default Abbaji;