import type { State } from "$lib/types";

import * as devalue from "devalue";

const dataFilename = "state.json";

export type GoogleDriveData = Omit<State, "login">;

export class GoogleDrive {
  private token: string;

  constructor({ token }: Pick<App.Session, "token">) {
    this.token = token;
  }

  fetchData = async (_fileId?: string) => {
    const fileId = _fileId ?? (await this.getFileId());
    if (fileId === undefined) return;

    // https://developers.google.com/drive/api/guides/manage-downloads
    const url = new URL(`https://www.googleapis.com/drive/v3/files/${fileId}`);
    url.searchParams.set("alt", "media");

    const response = await this.fetch(url);
    const data: GoogleDriveData = await response.text().then(devalue.parse);
    return data;
  };

  getFileId = async () => {
    const results = await this.listFiles(
      `'appDataFolder' in parents and name = '${dataFilename}'`
    );
    return results.files.at(0)?.id;
  };

  uploadData = async (data: GoogleDriveData) => {
    const fileId = await this.getFileId();
    if (fileId !== undefined) return this.updateData(fileId, data);

    // https://developers.google.com/drive/api/guides/manage-uploads#multipart
    const url = new URL("https://www.googleapis.com/upload/drive/v3/files");
    url.searchParams.set("uploadType", "multipart");

    const metadata = {
      name: dataFilename,
      parents: ["appDataFolder"],
    };

    const body = new FormData();
    body.append("metadata", jsonBlob(JSON.stringify(metadata)));
    body.append("file", jsonBlob(devalue.stringify(data)));

    const response = await this.fetch(url, { body, method: "POST" });

    return response.ok;
  };

  updateData = async (fileId: string, data: GoogleDriveData) => {
    // https://developers.google.com/drive/api/reference/rest/v3/files/update
    const url = new URL(
      `https://www.googleapis.com/upload/drive/v3/files/${fileId}`
    );
    url.searchParams.set("uploadType", "media");

    const response = await this.fetch(url, {
      method: "PATCH",
      body: devalue.stringify(data),
      headers: { "content-type": "application/json" },
    });

    return response.ok;
  };

  listFiles = async (query: string) => {
    // https://developers.google.com/drive/api/reference/rest/v3/files/list
    const url = new URL("https://www.googleapis.com/drive/v3/files");
    url.searchParams.set("q", query);
    url.searchParams.set("spaces", "appDataFolder");

    const response = await this.fetch(url);
    const results: { files: Array<{ id: string }> } = await response.json();
    return results;
  };

  private fetch = (url: URL, init: RequestInit = {}) =>
    fetch(url, {
      ...init,
      headers: { authorization: `Bearer ${this.token}`, ...init.headers },
    });
}

const jsonBlob = (json: string) =>
  new Blob([json], { type: "application/json" });
