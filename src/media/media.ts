import * as FileSystem from 'expo-file-system/legacy';

export function formatDuration(durationMs?: number): string {
  if (!durationMs || durationMs < 0) return 'duração não disponível';
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(iso));
}

export async function copyToPrivateStorage(sourceUri: string, id: string): Promise<string> {
  if (!FileSystem.documentDirectory) throw new Error('O armazenamento privado do aplicativo não está disponível.');
  const extension = sourceUri.split('?')[0].split('.').pop() || 'mp4';
  const target = `${FileSystem.documentDirectory}videos/${id}.${extension}`;
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos`, { intermediates: true });
  await FileSystem.copyAsync({ from: sourceUri, to: target });
  return target;
}

export async function deletePrivateFile(uri: string): Promise<void> {
  if (!uri.startsWith('file://')) return;
  try { await FileSystem.deleteAsync(uri, { idempotent: true }); } catch { /* arquivo já removido */ }
}
