import type { TaskId } from "./types";

const completedTasksFilename = "completed-tasks.json";

export const fetchCompletedTasks = async (token: string) => {
  const fileId = await getCompletedTasksFileId(token);
  if (fileId === undefined) return [];

  const fileUrl = new URL(
    `https://www.googleapis.com/drive/v3/files/${fileId}`
  );
  fileUrl.searchParams.set("alt", "media");

  const response = await fetchWithToken(token, fileUrl);
  const json: TaskId[] = await response.json();
  return json;
};

export const getCompletedTasksFileId = async (token: string) => {
  const listFilesUrl = new URL("https://www.googleapis.com/drive/v3/files");
  listFilesUrl.searchParams.set(
    "q",
    `'appDataFolder' in parents and name = '${completedTasksFilename}'`
  );
  listFilesUrl.searchParams.set("spaces", "appDataFolder");

  const response = await fetchWithToken(token, listFilesUrl);
  const json: { files: Array<{ id: string }> } = await response.json();
  return json.files?.at(0)?.id;
};

export const uploadCompletedTasks = async (token: string, data: object) => {
  const fileId = await getCompletedTasksFileId(token);
  if (fileId !== undefined) return updateCompletedTasks(token, fileId, data);

  const uploadFileUrl = new URL(
    "https://www.googleapis.com/upload/drive/v3/files"
  );
  uploadFileUrl.searchParams.set("uploadType", "multipart");

  const body = new FormData();
  body.append(
    "metadata",
    jsonToBlob({
      name: completedTasksFilename,
      parents: ["appDataFolder"],
    })
  );
  body.append("file", jsonToBlob(data));

  const response = await fetchWithToken(token, uploadFileUrl, {
    body,
    method: "POST",
  });

  return response.ok;
};

const updateCompletedTasks = async (
  token: string,
  fileId: string,
  data: object
) => {
  const updateFileUrl = new URL(
    `https://www.googleapis.com/upload/drive/v3/files/${fileId}`
  );
  updateFileUrl.searchParams.set("uploadType", "media");

  const response = await fetchWithToken(token, updateFileUrl, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json" },
  });

  return response.ok;
};

const fetchWithToken = (token: string, url: URL, init: RequestInit = {}) =>
  fetch(url, {
    ...init,
    headers: { authorization: `Bearer ${token}`, ...init.headers },
  });

const jsonToBlob = (content: object) =>
  new Blob([JSON.stringify(content)], { type: "application/json" });
