import React from "react";

const useToggleModalDeleteSucces = () => {
    const [isOpenModalDeleteSucces, setIsOpenModalDeleteSucces] = React.useState(false);

    const onToggleOpenModalDeleteSucces = () =>{
        setIsOpenModalDeleteSucces(true)
    }
    const onToggleCloseModalDeleteSucces = () =>{
        setIsOpenModalDeleteSucces(false)
    };

    return {isOpenModalDeleteSucces, onToggleOpenModalDeleteSucces, onToggleCloseModalDeleteSucces};
}

export default useToggleModalDeleteSucces;