import React from "react";

const useToggleModalInfoAccount = () => {
    const [isOpenModalInfoAccount, setIsOpenModalInfoAccount] = React.useState(false);

    const onToggleOpenModalInfoAccount = () =>{
        setIsOpenModalInfoAccount(true)
    }
    const onToggleCloseModalInfoAccount = () =>{
        setIsOpenModalInfoAccount(false)
    };

    return {isOpenModalInfoAccount, onToggleOpenModalInfoAccount, onToggleCloseModalInfoAccount};
}

export default useToggleModalInfoAccount;