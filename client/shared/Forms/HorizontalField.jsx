import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HorizontalField(props){
    const { name, type, label, handleChange, value } = props; // <--- Required props
    const { placeholder, icon, attributes, options, optionDefault } = props; // <--- Optional props
    const input = useRef(null);

    useEffect(() => {
        if(!attributes) return;
        for(let attribute in attributes) input.current.setAttribute(attribute, attributes[attribute]);
    }, []);

    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{label}</label>
            </div>
            <div className="field-body">
                <div className="field">
                    <div className={'control' + (icon ? ' has-icons-left' : '')}>
                        {type !== 'select' ?
                            <input className="input" type={type} name={name} value={value} onChange={handleChange} placeholder={placeholder} ref={input} />
                        : 
                            <div className="select">
                                <select name={name} value={value} onChange={handleChange} ref={input}>
                                    {options}
                                    {optionDefault}
                                </select>
                            </div>
                        }
                        {icon ? 
                            <div className="icon is-small is-left">
                                <FontAwesomeIcon icon={icon} />
                            </div>
                        : null }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalField;