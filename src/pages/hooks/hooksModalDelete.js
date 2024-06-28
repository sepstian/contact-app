import React from "react";

const useToggleModalDelete = () => {
    const [isOpenModalDelete, setIsOpenModalDelete] = React.useState(false);

    const onToggleOpenModalDelete = () =>{
        setIsOpenModalDelete(true)
    }
    const onToggleCloseModalDelete = () =>{
        setIsOpenModalDelete(false)
    };

    return {isOpenModalDelete, onToggleOpenModalDelete, onToggleCloseModalDelete};
}

export default useToggleModalDelete;