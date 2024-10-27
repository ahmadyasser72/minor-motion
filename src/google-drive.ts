import type { TaskId } from "./types";

const completedTasksFilename = "completed-tasks.json";

export class GoogleDrive {
  private token: string;

  constructor({ token }: Pick<App.Session, "token">) {
    this.token = token;
  }

  fetchCompletedTasks = async () => {
    const fileId = await this.getCompletedTasksFileId();
    if (fileId === undefined) return [];

    const fileUrl = new URL(
      `https://www.googleapis.com/drive/v3/files/${fileId}`
    );
    fileUrl.searchParams.set("alt", "media");

    const response = await this.fetch(fileUrl);
    const json: TaskId[] = await response.json();
    return json;
  };

  getCompletedTasksFileId = async () => {
    const listFilesUrl = new URL("https://www.googleapis.com/drive/v3/files");
    listFilesUrl.searchParams.set(
      "q",
      `'appDataFolder' in parents and name = '${completedTasksFilename}'`
    );
    listFilesUrl.searchParams.set("spaces", "appDataFolder");

    const response = await this.fetch(listFilesUrl);
    const json: { files: Array<{ id: string }> } = await response.json();
    return json.files?.at(0)?.id;
  };

  uploadCompletedTasks = async (data: object) => {
    const fileId = await this.getCompletedTasksFileId();
    if (fileId !== undefined) return this.updateCompletedTasks(fileId, data);

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

    const response = await this.fetch(uploadFileUrl, {
      body,
      method: "POST",
    });

    return response.ok;
  };

  updateCompletedTasks = async (fileId: string, data: object) => {
    const updateFileUrl = new URL(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}`
    );
    updateFileUrl.searchParams.set("uploadType", "media");

    const response = await this.fetch(updateFileUrl, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    return response.ok;
  };

  private fetch = (url: URL, init: RequestInit = {}) =>
    fetch(url, {
      ...init,
      headers: { authorization: `Bearer ${this.token}`, ...init.headers },
    });
}

const jsonToBlob = (content: object) =>
  new Blob([JSON.stringify(content)], { type: "application/json" });
