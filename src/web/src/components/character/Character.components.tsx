import BasicCharacterData from "./components/BasicCharacterData.components";

const Character = () => {
    return (
        <div className="character">
            <div className="content">
                <h3 className="title">Создание персонажа</h3>

                <BasicCharacterData />
            </div>
        </div>
    )
}

export default Character;