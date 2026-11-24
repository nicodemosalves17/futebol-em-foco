import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Clip = { id: string; name: string; uri: string; athlete: string; session: string; duration?: number };
const colors = { ink: '#11251C', muted: '#6F7D74', green: '#1F6B48', pale: '#E8F2EB', bg: '#F6F8F5', white: '#FFFFFF', line: '#E5EBE6', amber: '#C7852B' };

export default function App() {
  const [tab, setTab] = useState<'Início' | 'Vídeos' | 'Atletas'>('Início');
  const [clips, setClips] = useState<Clip[]>([]);
  const [athlete, setAthlete] = useState('Atleta principal');

  async function importVideo() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) { Alert.alert('Acesso necessário', 'Autorize o acesso às fotos e vídeos para importar um treino.'); return; }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['videos'], allowsEditing: false, quality: 1 });
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];
    const next: Clip = { id: `${Date.now()}`, name: `Vídeo ${clips.length + 1}`, uri: asset.uri, athlete, session: 'Sessão importada', duration: asset.duration ?? undefined };
    setClips(current => [next, ...current]);
    setTab('Vídeos');
  }

  function createSession() {
    Alert.alert('Nova sessão', 'A organização de sessões será ampliada no próximo passo. Por enquanto, vídeos importados ficam agrupados como “Sessão importada”.');
  }

  return <SafeAreaView style={s.safe}><StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
    <View style={s.header}><View><Text style={s.brand}>FUTEBOL EM FOCO</Text><Text style={s.greeting}>O jogo em detalhe.</Text></View><View style={s.avatar}><Text style={s.avatarText}>⚽</Text></View></View>
    <ScrollView contentContainerStyle={s.content}>
      {tab === 'Início' && <>
        <View style={s.hero}><Text style={s.eyebrow}>CENTRAL DE ANÁLISE</Text><Text style={s.heroTitle}>Cada treino conta uma história.</Text><Text style={s.heroBody}>Guarde os vídeos e acompanhe a evolução do atleta, lance a lance.</Text><TouchableOpacity style={s.primary} onPress={importVideo}><Text style={s.primaryText}>＋  Importar vídeo</Text></TouchableOpacity></View>
        <View style={s.sectionHead}><Text style={s.sectionTitle}>Resumo</Text><Text style={s.sectionNote}>Este dispositivo</Text></View>
        <View style={s.stats}><View style={s.stat}><Text style={s.statNum}>{clips.length}</Text><Text style={s.statLabel}>VÍDEOS</Text></View><View style={s.stat}><Text style={s.statNum}>1</Text><Text style={s.statLabel}>ATLETA</Text></View><View style={s.stat}><Text style={s.statNum}>0</Text><Text style={s.statLabel}>LANCES</Text></View></View>
        <View style={s.sectionHead}><Text style={s.sectionTitle}>Comece por aqui</Text></View>
        <TouchableOpacity style={s.actionCard} onPress={createSession}><View style={s.actionIcon}><Text>📋</Text></View><View style={s.actionCopy}><Text style={s.actionTitle}>Organizar uma sessão</Text><Text style={s.actionText}>Separe jogos e treinos por data.</Text></View><Text style={s.chevron}>›</Text></TouchableOpacity>
        <View style={s.notice}><Text style={s.noticeTitle}>Privacidade em primeiro lugar</Text><Text style={s.noticeText}>Os vídeos ficam no aparelho. Peça autorização antes de filmar outras pessoas, sobretudo menores.</Text></View>
      </>}
      {tab === 'Vídeos' && <><View style={s.sectionHead}><Text style={s.sectionTitle}>Biblioteca de vídeos</Text></View><TouchableOpacity style={s.primary} onPress={importVideo}><Text style={s.primaryText}>＋  Importar vídeo</Text></TouchableOpacity>{clips.length === 0 ? <View style={s.empty}><Text style={s.emptyIcon}>▣</Text><Text style={s.emptyTitle}>Sua biblioteca está vazia</Text><Text style={s.emptyText}>Importe um vídeo do aparelho para começar.</Text></View> : clips.map(c => <View key={c.id} style={s.videoCard}><View style={s.videoThumb}><Text style={{fontSize:24}}>▶</Text></View><View style={{flex:1}}><Text style={s.actionTitle}>{c.name}</Text><Text style={s.actionText}>{c.athlete} · {c.session}</Text><Text style={s.duration}>{c.duration ? `${Math.round(c.duration / 1000)} s` : 'Duração indisponível'} · análise manual</Text></View></View>)}</>}
      {tab === 'Atletas' && <><View style={s.sectionHead}><Text style={s.sectionTitle}>Atletas</Text></View><View style={s.actionCard}><View style={s.avatar}><Text style={s.avatarText}>⚽</Text></View><View style={s.actionCopy}><Text style={s.actionTitle}>{athlete}</Text><Text style={s.actionText}>Perfil local · função ainda não avaliada</Text></View></View><View style={s.notice}><Text style={s.noticeTitle}>Análise com revisão humana</Text><Text style={s.noticeText}>Métricas como movimentação, participação e ações com bola ainda não são calculadas. Nenhum posicionamento será apresentado como facto sem dados e validação.</Text></View></>}
    </ScrollView>
    <View style={s.nav}>{(['Início','Vídeos','Atletas'] as const).map((item, i) => <TouchableOpacity key={item} style={s.navItem} onPress={() => setTab(item)}><Text style={[s.navIcon, tab === item && s.navActive]}>{['⌂','▣','◉'][i]}</Text><Text style={[s.navLabel, tab === item && s.navActive]}>{item}</Text></TouchableOpacity>)}</View>
  </SafeAreaView>;
}
const s = StyleSheet.create({ safe:{flex:1,backgroundColor:colors.bg},header:{paddingHorizontal:22,paddingTop:12,paddingBottom:16,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},brand:{fontSize:10,fontWeight:'800',letterSpacing:2,color:colors.green},greeting:{fontSize:21,fontWeight:'800',color:colors.ink,marginTop:5},avatar:{width:42,height:42,borderRadius:21,backgroundColor:colors.pale,alignItems:'center',justifyContent:'center'},avatarText:{fontSize:21},content:{paddingHorizontal:20,paddingBottom:24},hero:{backgroundColor:colors.ink,borderRadius:22,padding:23,marginBottom:26},eyebrow:{color:'#9BC7A9',fontSize:10,fontWeight:'800',letterSpacing:1.5},heroTitle:{color:'white',fontSize:25,fontWeight:'800',lineHeight:31,marginTop:14,maxWidth:260},heroBody:{color:'#D2DDD5',fontSize:14,lineHeight:21,marginTop:9},primary:{backgroundColor:colors.green,borderRadius:13,paddingVertical:14,alignItems:'center',marginTop:18},primaryText:{color:'white',fontSize:14,fontWeight:'700'},sectionHead:{flexDirection:'row',alignItems:'baseline',justifyContent:'space-between',marginBottom:12,marginTop:3},sectionTitle:{fontSize:18,fontWeight:'800',color:colors.ink},sectionNote:{fontSize:12,color:colors.muted},stats:{flexDirection:'row',backgroundColor:colors.white,borderRadius:16,paddingVertical:17,marginBottom:24,borderWidth:1,borderColor:colors.line},stat:{flex:1,alignItems:'center',borderRightWidth:1,borderRightColor:colors.line},statNum:{fontSize:22,fontWeight:'800',color:colors.ink},statLabel:{fontSize:9,letterSpacing:1.1,color:colors.muted,marginTop:5,fontWeight:'700'},actionCard:{backgroundColor:colors.white,borderColor:colors.line,borderWidth:1,borderRadius:15,padding:14,flexDirection:'row',alignItems:'center',marginBottom:12},actionIcon:{width:42,height:42,borderRadius:12,backgroundColor:colors.pale,alignItems:'center',justifyContent:'center',marginRight:12,fontSize:20},actionCopy:{flex:1},actionTitle:{fontSize:14,fontWeight:'700',color:colors.ink},actionText:{fontSize:12,color:colors.muted,marginTop:5},chevron:{fontSize:24,color:colors.muted},notice:{backgroundColor:'#F1F5EF',borderRadius:14,padding:15,marginTop:9},noticeTitle:{fontSize:13,fontWeight:'700',color:colors.green},noticeText:{fontSize:12,color:colors.muted,lineHeight:18,marginTop:6},nav:{height:70,backgroundColor:colors.white,borderTopWidth:1,borderColor:colors.line,flexDirection:'row',justifyContent:'space-around',paddingTop:9},navItem:{alignItems:'center',flex:1},navIcon:{fontSize:21,color:colors.muted},navLabel:{fontSize:10,color:colors.muted,marginTop:3,fontWeight:'600'},navActive:{color:colors.green,fontWeight:'800'},empty:{alignItems:'center',paddingVertical:45},emptyIcon:{fontSize:36,color:'#A4B2A8'},emptyTitle:{fontWeight:'700',color:colors.ink,fontSize:15,marginTop:12},emptyText:{fontSize:12,color:colors.muted,marginTop:6},videoCard:{flexDirection:'row',alignItems:'center',padding:12,backgroundColor:colors.white,borderRadius:15,borderWidth:1,borderColor:colors.line,marginTop:11},videoThumb:{width:62,height:62,borderRadius:12,backgroundColor:colors.pale,alignItems:'center',justifyContent:'center',marginRight:13},duration:{fontSize:10,color:colors.amber,marginTop:6,fontWeight:'600'}});
