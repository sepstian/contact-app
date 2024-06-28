import React from "react";

const useToggleModalEdit = () => {
    const [isOpenModalEdit, setIsOpenModalEdit] = React.useState(false);

    const onToggleOpenModalEdit = () =>{
        setIsOpenModalEdit(true)
    }
    const onToggleCloseModalEdit = () =>{
        setIsOpenModalEdit(false)
    };

    return {isOpenModalEdit, onToggleOpenModalEdit, onToggleCloseModalEdit};
}

export default useToggleModalEdit;