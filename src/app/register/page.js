"use client";

import React, { useContext, useState, useEffect } from "react";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialFormData = {
    civility: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
};

export default function Register() {
    const [formData, setFormData] = useState(initialFormData);
    const [isRegistered, setIsRegistered] = useState(false);
    const { isAuthUser } = useContext(GlobalContext);
    const router = useRouter();

    // Check if the form data is valid
    function isFormValid() {
        return (
            formData &&
            formData.civility.trim() !== "" &&
            formData.lastName.trim() !== "" &&
            formData.firstName.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== ""
        );
    }

    // Handle the registration form submission
    async function handleRegisterOnSubmit() {
        setPageLevelLoader(true);
        const data = await registerNewUser(formData);

        if (data.success) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsRegistered(true);
            setPageLevelLoader(false);
            setFormData(initialFormData);
        } else {
            toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setPageLevelLoader(false);
            setFormData(initialFormData);
        }
    }

    // Redirect to the home page if the user is authenticated
    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    return (
        <div className="py-24">
            <div className="flex flex-col pb-0 px-10 mt-44 ">
                <div className="flex flex-col  w-full px-10">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative ">
                        <div className="flex flex-col items-center justify-start pt-10 px-10 pb-10">
                            <p className="w-full text-3xl font-medium text-center font-serif">
                                {isRegistered
                                    ? "Inscription réussie !"
                                    : "Créer un compte"}
                            </p>
                            {isRegistered ? (
                                <button
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                    onClick={() => router.push('/login')}
                                >
                                    Login
                                </button>
                            ) : (
                                <div className="w-full mt-6 mx-0 relative space-y-8">
                                    {registrationFormControls.map((controlItem) => (
                                        <div key={controlItem.id}>
                                            {controlItem.componentType === "input" ? (
                                                <InputComponent
                                                    type={controlItem.type}
                                                    placeholder={controlItem.placeholder}
                                                    label={controlItem.label}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            [controlItem.id]: event.target.value,
                                                        });
                                                    }}
                                                    value={formData[controlItem.id]}
                                                />
                                            ) : controlItem.componentType === "select" ? (
                                                <SelectComponent
                                                    options={controlItem.options}
                                                    label={controlItem.label}
                                                    onChange={(event) => {
                                                        setFormData({
                                                            ...formData,
                                                            [controlItem.id]: event.target.value,
                                                        });
                                                    }}
                                                    value={formData[controlItem.id]}
                                                />
                                            ) : null}
                                        </div>
                                    ))}
                                    <button
                                        className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-outfont-medium uppercase tracking-wide"
                                        disabled={!isFormValid()}
                                        onClick={handleRegisterOnSubmit}
                                    >
                                        Créer un compte
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </div>
    );
}