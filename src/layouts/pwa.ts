import { toast } from "svelte-sonner";
import { registerSW } from "virtual:pwa-register";

window.addEventListener("load", () => {
  const updateSW = registerSW({
    immediate: true,
    onRegisteredSW(swScriptUrl) {
      console.log("SW registered: ", swScriptUrl);
    },
    onOfflineReady() {
      toast.success("Aplikasi sudah bisa bekerja secara offline!");
    },
    onNeedRefresh() {
      toast.info("Update tersedia!", {
        action: { label: "update", onClick: () => updateSW() },
        dismissable: true,
        duration: 60_000,
      });
    },
  });
});
