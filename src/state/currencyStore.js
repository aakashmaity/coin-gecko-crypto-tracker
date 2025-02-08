import { create } from "zustand";

const currencyStore = create((set) => ({
    currency: 'usd',
    setCurrency: (newCurrency) => set((state) => {
        return {
            ...state,
            currency: newCurrency
        }
    })
}))

export default currencyStore