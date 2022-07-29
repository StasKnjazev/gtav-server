import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCheckmark } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs';

type MainProps = {
    firstName: string,
    lastName: string,
    age: string
};

const BasicCharacterData = () => {
    const [mainData, setMainData] = useState<MainProps>({
        firstName: '',
        lastName: '',
        age: '',
    }), [gender, setGender] = useState('male');

    const navigate = useNavigate();
    const { state } = useLocation();

    // Изменить нажатие кнопки по гендорам, сделать сразу отправку на клиент через ивент
    const handleMaleClick = () => {
        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger('changeToMale');
        }

        setGender('male');
    };

    const handleFemaleClick = () => {
        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger('changeToFemale');
        }

        setGender('female');
    };

    const sendData = async (mainData: MainProps, gender: string) => {
        if (mainData.firstName === "" || mainData.lastName === "" || mainData.age === "") return console.log("Укажите все необходимые данные.");
        if (gender === undefined || gender === null) return console.log('Укажите все необходимые данные.');

        const ruPattern = /^\p{Script=Cyrillic}+$/u;
        const numberPattern = /[0-9]/;
        if (ruPattern.test(mainData.firstName) || ruPattern.test(mainData.lastName)) return console.log("Латиница");
        if (numberPattern.test(mainData.firstName) || numberPattern.test(mainData.lastName)) return console.log("Есть цифры в строке");

        const ageNum = Number(mainData.age);
        if (ageNum >= 100) return console.log("Недопустимый возраст!");

        if (mainData.firstName === mainData.lastName) return console.log('Имя и Фамилия совпадают!');

        const { ue, ul, up }: any = state;

        // @ts-ignore
        if (window.mp) {
            // @ts-ignore
            window.mp.trigger("newAccountWithCharacterFirst", ue, ul, up, mainData.firstName, mainData.lastName, mainData.age, gender);
        }
    };

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

                <button className="success" onClick={() => sendData({ ...mainData }, gender)}>
                    <IoMdCheckmark className="icon" />
                </button>
            </div>

            <div className="description">Используйте мышь для поворота камеры</div>
        </div>
    )
}

export default BasicCharacterData;