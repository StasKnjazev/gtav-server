import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCheckmark } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';
import { sendData } from "../scripts/sendBasicCharacterData";

type MainProps = {
    firstName: string,
    lastName: string,
    age: string
};

type GenderProps = {
    female: boolean,
    male: boolean
};

const BasicCharacterData = () => {
    const [mainData, setMainData] = useState<MainProps>({
        firstName: '',
        lastName: '',
        age: '',
    }), [gender, setGender] = useState<GenderProps>({ female: false, male: false });

    const navigate = useNavigate();

    // Изменить нажатие кнопки по гендорам, сделать сразу отправку на клиент через ивент
    const handleMaleClick = () => setGender({ ...gender, female: false, male: true });
    const handleFemaleClick = () => setGender({ ...gender, female: true, male: false });

    return (
        <div className="basicData">
            <input
                type="text"
                id="fe"
                value={mainData.firstName}
                onChange={(e) => setMainData({ ...mainData, firstName: e.target.value })}
                placeholder={"Укажите имя"}
                max={12}
                min={2}
            />

            <input
                type="text"
                id="le"
                value={mainData.lastName}
                onChange={(e) => setMainData({ ...mainData, lastName: e.target.value })}
                placeholder={"Укажите фамилию"}
                max={18}
                min={4}
            />

            <input
                type="number"
                id="ae"
                value={mainData.age}
                onChange={(e) => setMainData({ ...mainData, age: e.target.value })}
                placeholder={"Укажите возраст"}
                min={10}
                max={100}
            />

            <div className="container_gender">
                <button className="male" onClick={handleMaleClick}>
                    <BsGenderMale className="icon" />
                </button>

                <button className="female" onClick={handleFemaleClick}>
                    <BsGenderFemale className="icon" />
                </button>
            </div>

            <div className="container_button">
                <button className="back" onClick={() => navigate(-1)}>
                    <BiArrowBack className="icon" />
                </button>

                <button className="success" onClick={() => sendData({ ...mainData }, { ...gender })}>
                    <Link to='/characterSettings' className="link">
                        <IoMdCheckmark className="icon" />
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default BasicCharacterData;