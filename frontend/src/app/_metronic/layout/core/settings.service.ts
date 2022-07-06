import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {DefaultSettings, ISettings} from "./default-settings.config";
import {BehaviorSubject} from "rxjs";
import * as objectPath from "object-path";
import {SettingsApiService} from "./settings-api.service";

const SETTINGS_LOCAL_STORAGE_KEY = `${environment.appVersion}-settings`;

export type SettingsType = ISettings | undefined;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public settingsSubject: BehaviorSubject<SettingsType> =
    new BehaviorSubject<SettingsType>(undefined);

  constructor(private ApiSettings: SettingsApiService) { }

  initSettings(): void {
    const settingsFromLocalStorage = localStorage.getItem(
      SETTINGS_LOCAL_STORAGE_KEY
    );
    if (settingsFromLocalStorage) {
      try {
        this.settingsSubject.next(JSON.parse(settingsFromLocalStorage));
        return;
      } catch (error) {
        this.removeSettings();
        console.error('config parse from local storage', error);
      }
    }

    this.defaultSettings();
  }

  setSettings(settings: ISettings) {
    if (!settings) {
      this.removeSettings();
    } else {
      localStorage.setItem(
        SETTINGS_LOCAL_STORAGE_KEY,
        JSON.stringify(settings)
      );
    }
    this.settingsSubject.next(settings);
  }

  removeSettings(): void{
    localStorage.removeItem(SETTINGS_LOCAL_STORAGE_KEY);
  }

  refreshSettingsToDefault(): void {
    this.setConfigWithPageRefresh(undefined);
  }

  getSettings(): ISettings {
    const settings = this.settingsSubject.value;
    if (!settings) {
      return DefaultSettings;
    }
    return settings;
  }

  private setConfigWithPageRefresh(settings: SettingsType) {
    this.settingsSubject.next(settings);
  }

  getProp(path: string): string | boolean | undefined | Object {
    const settingsConfig = this.settingsSubject.value;
    if (!settingsConfig) {
      return;
    }

    return objectPath.get(settingsConfig, path);
  }

  defaultSettings():void {
    this.ApiSettings.getSettings().subscribe((data:any) => {
      this.setSettings(data);
    });
  }
}
