import { defineNuxtPlugin } from '#app'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 5,
    newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
      if (toasts.filter(
        t => t.type === toast.type
      ).length !== 0) {
        // Returning false discards the toast
        return false;
      }
      // You can modify the toast if you want
      return toast;
    }
  })
})