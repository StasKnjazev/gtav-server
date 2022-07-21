import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmark } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { sendData } from "../scripts/sendBasicCharacterData";

const BasicCharacterData = () => {
    const [firstName, setFirstName] = React.useState(''),
        [lastName, setLastName] = React.useState(''),
        [age, setAge] = React.useState('');

    const navigate = useNavigate();

    return (
        <div className="basicData">
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Укажите имя"
                max="12"
                min="2"
            />

            <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Укажите фамилию"
                max="18"
                min="4"
            />

            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Укажите возраст"
                min="10"
                max="100"
            />

            <div className="container_gender">
                <button className="male">
                    <BsGenderMale className="icon" />
                </button>
                <button className="female">
                    <BsGenderFemale className="icon" />
                </button>
            </div>

            <div className="container_button">
                <button className="back" onClick={() => navigate(-1)}>
                    <BiArrowBack className="icon" />
                </button>

                <button className="success" onClick={() => sendData(firstName, lastName, age)}>
                    <IoMdCheckmark className="icon" />
                </button>
            </div>
        </div>
    )
}

export default BasicCharacterData;