import { state as localState, googleUser } from "$lib/stores";
import { fetchRemoteData, updateGoogleDriveData } from "$lib/utils.sync";

import { signIn } from "auth-astro/client";
import { get } from "svelte/store";

document.addEventListener("astro:page-load", async () => {
  // jangan sinkronisasi data bila offline
  if (!navigator.onLine) return;

  const { login, data, email, name, image } = await fetchRemoteData();

  if (login === "google-invalid") {
    await signIn("google");
    document.location.reload();
    return;
  }

  googleUser.set({ name, image });
  localState.update(({ ...state }) => ({ ...state, login }));

  if (login !== "google") return;

  // @ts-expect-error @types/umami is outdated, see https://umami.is/docs/tracker-functions#session-data
  window.umami?.identify({ email });

  const local = get(localState);
  if (data === undefined || data.last_update < local.last_update) {
    console.log("[sync] local >> google-drive");
    updateGoogleDriveData(local);
  } else if (data.last_update > local.last_update) {
    console.log("[sync] google-drive >> local");
    localState.set({ ...local, ...data });
  }
});
