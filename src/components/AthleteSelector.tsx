import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { AthleteSelection, VideoRecord } from '../types/models';
import { formatDuration } from '../media/media';

type Props = { video: VideoRecord; onConfirm: (selection: AthleteSelection) => void; onClose: () => void };

export default function AthleteSelector({ video, onConfirm, onClose }: Props) {
  const player = useVideoPlayer(video.uri, (instance) => { instance.loop = false; });
  const [position, setPosition] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [point, setPoint] = useState<{ x: number; y: number } | null>(null);
  const videoWidth = 100;
  const videoHeight = 62;

  useEffect(() => {
    const timeSubscription = player.addListener('timeUpdate', ({ currentTime }) => setPosition(currentTime * 1000));
    return () => timeSubscription.remove();
  }, [player]);

  function seek(deltaMs: number) {
    const duration = (video.durationMs ?? 0);
    player.currentTime = Math.max(0, Math.min(duration ? duration / 1000 : Number.MAX_SAFE_INTEGER, player.currentTime + deltaMs / 1000));
    setPosition(player.currentTime * 1000);
  }

  function toggle() {
    if (playing) player.pause(); else player.play();
    setPlaying(!playing);
  }

  function confirm() {
    if (!point) return;
    onConfirm({ selectedAtMs: position, x: point.x, y: point.y, videoWidth, videoHeight, confirmedAt: new Date().toISOString() });
  }

  return <View style={styles.container}>
    <Text style={styles.title}>Selecione o atleta no vídeo</Text>
    <Text style={styles.help}>Pause no momento desejado e toque sobre o jogador. O marcador é uma seleção manual, não reconhecimento facial.</Text>
    <View style={styles.videoFrame} onStartShouldSetResponder={() => true} onResponderRelease={(event) => { const { locationX, locationY } = event.nativeEvent; setPoint({ x: (locationX / 280) * videoWidth, y: (locationY / 210) * videoHeight }); }}>
      <VideoView player={player} style={styles.video} contentFit="contain" nativeControls={false} />
      {point && <View pointerEvents="none" style={[styles.marker, { left: `${point.x}%`, top: `${(point.y / videoHeight) * 100}%` }]}><Text style={styles.markerText}>ATLETA</Text></View>}
    </View>
    <View style={styles.timeline}><Text style={styles.time}>{formatDuration(position)} / {formatDuration(video.durationMs)}</Text><Text style={styles.state}>{point ? 'selecionado — aguardando confirmação' : 'vídeo pronto para selecionar'}</Text></View>
    <View style={styles.controls}><TouchableOpacity style={styles.button} onPress={() => seek(-500)}><Text style={styles.buttonText}>− 0,5 s</Text></TouchableOpacity><TouchableOpacity style={styles.button} onPress={toggle}><Text style={styles.buttonText}>{playing ? 'Pausar' : 'Reproduzir'}</Text></TouchableOpacity><TouchableOpacity style={styles.button} onPress={() => seek(500)}><Text style={styles.buttonText}>+ 0,5 s</Text></TouchableOpacity></View>
    <Text style={styles.warning}>Se o jogador ficar oculto, sair do enquadramento ou houver dúvida, a futura análise deverá parar e pedir nova seleção. O rastreamento automático ainda não está disponível.</Text>
    <View style={styles.actions}><TouchableOpacity style={styles.secondary} onPress={onClose}><Text style={styles.secondaryText}>Cancelar</Text></TouchableOpacity><TouchableOpacity style={[styles.primary, !point && styles.disabled]} disabled={!point} onPress={confirm}><Text style={styles.primaryText}>Confirmar seleção</Text></TouchableOpacity></View>
  </View>;
}

const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#F6F8F5', padding: 20, paddingTop: 55 }, title: { color: '#11251C', fontSize: 22, fontWeight: '800' }, help: { color: '#6F7D74', fontSize: 13, lineHeight: 19, marginTop: 8, marginBottom: 15 }, videoFrame: { height: 210, backgroundColor: '#08120D', borderRadius: 18, overflow: 'hidden', position: 'relative' }, video: { width: '100%', height: '100%' }, marker: { position: 'absolute', width: 70, height: 70, marginLeft: -35, marginTop: -35, borderWidth: 3, borderColor: '#F1B94B', borderRadius: 35, alignItems: 'center', justifyContent: 'center' }, markerText: { color: '#F1B94B', fontSize: 9, fontWeight: '900', backgroundColor: '#11251C', padding: 3 }, timeline: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }, time: { color: '#11251C', fontWeight: '800', fontSize: 12 }, state: { color: '#1F6B48', fontWeight: '800', fontSize: 11 }, controls: { flexDirection: 'row', gap: 7, marginTop: 14 }, button: { flex: 1, backgroundColor: '#2F7653', borderRadius: 9, paddingVertical: 11, alignItems: 'center' }, buttonText: { color: '#FFF', fontSize: 11, fontWeight: '800' }, warning: { color: '#6F7D74', backgroundColor: '#E8F2EB', borderRadius: 10, padding: 12, fontSize: 12, lineHeight: 18, marginTop: 15 }, actions: { flexDirection: 'row', gap: 8, marginTop: 16 }, primary: { flex: 1, backgroundColor: '#1F6B48', borderRadius: 12, paddingVertical: 14, alignItems: 'center' }, secondary: { backgroundColor: '#E8F2EB', borderRadius: 12, paddingVertical: 14, paddingHorizontal: 18, alignItems: 'center' }, primaryText: { color: '#FFF', fontWeight: '800', fontSize: 12 }, secondaryText: { color: '#1F6B48', fontWeight: '800', fontSize: 12 }, disabled: { opacity: 0.45 } });
