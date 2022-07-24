import BasicCharacterData from "./components/BasicCharacterData.components";

const Character = () => {
    return (
        <div className="character">
            <div className="content">
                <h3 className="title">Создание персонажа</h3>

                <BasicCharacterData />
                <div className="description">Используйте мышь для поворота камеры</div>
            </div>
        </div>
    )
}

export default Character;