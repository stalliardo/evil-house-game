import { closeModal } from "@/features/gameState/modalSlice"

export const modalCallbacks = {
    close: (dispatch) => {
        dispatch(closeModal());
    }
}