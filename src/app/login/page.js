'use client';

import React, { useContext, useState, useEffect } from "react";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import InputComponent from "@/components/FormElements/InputComponent";
import Cookies from "js-cookie";
import Notification from "@/components/Notification";

const initialFormdata = {
    email: "",
    password: "",
};

export default function Login() {
    const [formData, setFormData] = useState(initialFormdata);
    const { isAuthUser, setIsAuthUser, user, setUser } = useContext(GlobalContext);
    const router = useRouter();

    // Check if the form data is valid
    function isValidForm() {
        return (
            formData &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== ""
        );
    }

    // Handle the login process
    async function handleLogin() {
        const res = await login(formData);

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(true);
            setUser(res?.finalData?.user);
            setFormData(initialFormdata);
            Cookies.set("token", res?.finalData?.token);
            localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(false);
        }
    }

    // Redirect to the home page if the user is authenticated
    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    // Render the component
    return (
        <div className="relative py-24">
            <div className="flex flex-col items-center justify-between pr-10 pb-0 pl-10 mt-44 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mb-0 relative lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start py-10 px-10 bg-white shadow-2xl rounded-xl relative">
                            <p className="w-full text-2xl font-medium text-center font-serif text-black">
                                Connexion
                            </p>
                            <div className="w-full mt-8 mb-0 relative space-y-8">
                                {loginFormControls.map((controlItem) =>
                                    controlItem.componentType === "input" ? (
                                        <InputComponent
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            value={formData[controlItem.id]}
                                            onChange={(event) => {
                                                setFormData({
                                                    ...formData,
                                                    [controlItem.id]: event.target.value,
                                                });
                                            }}
                                        />
                                    ) : null
                                )}
                                <div className="text-black flex flex-col underline cursor-pointer">
                                    Mot de passe oublié?
                                </div>
                                <button
                                    className="
                                        disabled:opacity-50
                                        inline-flex 
                                        w-full 
                                        items-center 
                                        justify-center 
                                        bg-black 
                                        px-4
                                        py-3
                                        text-lg
                                        text-white
                                        transition-all 
                                        duration-200
                                        ease-in-out 
                                        focus:shadow 
                                        font-medium 
                                        uppercase 
                                        tracking-wide
                                        hover:bg-slate-300
                                        hover:text-black
                                    "
                                    disabled={!isValidForm()}
                                    onClick={handleLogin}
                                >
                                    Se connecter
                                </button>
                                <div className="flex items-center gap-2">
                                    <hr className="flex-grow" />
                                    <span className="text-black">ou créer un compte</span>
                                    <hr className="flex-grow" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        className="
                                            inline-flex 
                                            w-full 
                                            items-center 
                                            justify-center 
                                            bg-black 
                                            px-4
                                            py-3
                                            text-l
                                            text-white
                                            transition-all 
                                            duration-200
                                            ease-in-out 
                                            focus:shadow 
                                            font-medium 
                                            uppercase 
                                            tracking-wide
                                            hover:bg-slate-300
                                            hover:text-black
                                        "
                                        onClick={() => router.push('/register')}
                                    >
                                        S'inscrire
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
}