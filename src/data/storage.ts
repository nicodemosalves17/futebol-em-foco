import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, emptyAppData } from '../types/models';

const STORAGE_KEY = '@futebol-em-foco/v1';

export async function loadAppData(): Promise<AppData> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyAppData;
    const parsed = JSON.parse(raw) as Partial<AppData>;
    return {
      athletes: parsed.athletes ?? [],
      sessions: parsed.sessions ?? [],
      videos: parsed.videos ?? [],
      clips: parsed.clips ?? [],
      observations: parsed.observations ?? [],
    };
  } catch {
    return emptyAppData;
  }
}

export async function saveAppData(data: AppData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function clearAppData(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
