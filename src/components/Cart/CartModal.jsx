"use client";

import { Fragment, useContext } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems
  } = useContext(GlobalContext);

  const router = useRouter();

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => {
              router.push("/panier");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Aller au panier
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={() => {
              router.push("/paiement");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Paiement
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button
              onClick={() => setShowCartModal(false)}
              type="button" className="font-medium text-grey">
              ou - Continuer mes achats
            </button>
          </div>
        </Fragment>
      }
    />
  );
}