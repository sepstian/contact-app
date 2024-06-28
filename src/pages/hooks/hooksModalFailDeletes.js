import React from "react";

const useToggleModalDeleteFail = () => {
    const [isOpenModalDeleteFail, setIsOpenModalDeleteFail] = React.useState(false);

    const onToggleOpenModalDeleteFail = () =>{
        setIsOpenModalDeleteFail(true)
    }
    const onToggleCloseModalDeleteFail = () =>{
        setIsOpenModalDeleteFail(false)
    };

    return {isOpenModalDeleteFail, onToggleOpenModalDeleteFail, onToggleCloseModalDeleteFail};
}

export default useToggleModalDeleteFail;