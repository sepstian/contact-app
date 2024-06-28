import React from "react";

const useToggleModalSucces = () => {
    const [isOpenModalSucces, setIsOpenModalSucces] = React.useState(false);

    const onToggleOpenModalSucces = () =>{
        setIsOpenModalSucces(true)
    }
    const onToggleCloseModalSucces = () =>{
        setIsOpenModalSucces(false)
    };

    return {isOpenModalSucces, onToggleOpenModalSucces, onToggleCloseModalSucces};
}

export default useToggleModalSucces;