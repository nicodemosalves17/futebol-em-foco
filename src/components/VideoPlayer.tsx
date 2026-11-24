import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { VideoRecord } from '../types/models';
import { formatDuration } from '../media/media';

type Props = {
  video: VideoRecord;
  onSaveClip: (startMs: number, endMs: number) => void;
};

export default function VideoPlayer({ video, onSaveClip }: Props) {
  const player = useRef<Video>(null);
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [start, setStart] = useState<number | null>(null);
  const [end, setEnd] = useState<number | null>(null);

  function statusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setPlaying(status.isPlaying);
    }
  }

  async function togglePlayback() {
    if (!player.current) return;
    if (playing) await player.current.pauseAsync(); else await player.current.playAsync();
  }

  function saveClip() {
    if (start === null || end === null || end <= start) {
      Alert.alert('Marque o lance', 'Toque em “Marcar início” e depois em “Marcar fim”. O fim deve ser depois do início.');
      return;
    }
    onSaveClip(start, end);
    setStart(null); setEnd(null);
  }

  return <View style={styles.container}>
    <Video ref={player} source={{ uri: video.uri }} style={styles.video} resizeMode={ResizeMode.CONTAIN} useNativeControls onPlaybackStatusUpdate={statusUpdate} />
    <View style={styles.timeline}><Text style={styles.time}>{formatDuration(position)} / {formatDuration(video.durationMs)}</Text><Text style={styles.local}>REVISÃO MANUAL</Text></View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.button} onPress={togglePlayback}><Text style={styles.buttonText}>{playing ? 'Pausar' : 'Reproduzir'}</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, start !== null && styles.marked]} onPress={() => setStart(position)}><Text style={styles.buttonText}>Início {start !== null ? formatDuration(start) : ''}</Text></TouchableOpacity>
      <TouchableOpacity style={[styles.button, end !== null && styles.marked]} onPress={() => setEnd(position)}><Text style={styles.buttonText}>Fim {end !== null ? formatDuration(end) : ''}</Text></TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.save} onPress={saveClip}><Text style={styles.saveText}>Guardar este lance</Text></TouchableOpacity>
  </View>;
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#10251B', borderRadius: 18, overflow: 'hidden', marginBottom: 18 },
  video: { width: '100%', height: 210, backgroundColor: '#08120D' },
  timeline: { flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  time: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  local: { color: '#9BC7A9', fontWeight: '800', letterSpacing: 1, fontSize: 9 },
  actions: { flexDirection: 'row', gap: 7, paddingHorizontal: 10 },
  button: { flex: 1, backgroundColor: '#2F7653', borderRadius: 9, paddingVertical: 10, alignItems: 'center' },
  marked: { backgroundColor: '#C7852B' },
  buttonText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  save: { margin: 10, backgroundColor: '#FFFFFF', borderRadius: 10, padding: 12, alignItems: 'center' },
  saveText: { color: '#10251B', fontWeight: '800' },
});
