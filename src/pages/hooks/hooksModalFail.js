import React from "react";

const useToggleModalFail = () => {
    const [isOpenModalFail, setIsOpenModalFail] = React.useState(false);

    const onToggleOpenModalFail = () =>{
        setIsOpenModalFail(true)
    }
    const onToggleCloseModalFail = () =>{
        setIsOpenModalFail(false)
    };

    return {isOpenModalFail, onToggleOpenModalFail, onToggleCloseModalFail};
}

export default useToggleModalFail;