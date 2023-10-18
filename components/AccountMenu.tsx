import React from "react";
import { signOut } from "next-auth/react";

interface AccountmenuProps {
    visible?: boolean;
}


const AccountMenu : React.FC<AccountmenuProps> = ({visible}) =>{

    if(!visible){
        return null
    }

    return (
        <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-blue.png"/>
                    <p className="text-white text-sm group-hover/item:underline">
                        Username
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AccountMenu;