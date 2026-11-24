export type SessionKind = 'treino' | 'jogo';

export type Athlete = {
  id: string;
  name: string;
  notes: string;
  createdAt: string;
};

export type Session = {
  id: string;
  athleteId: string;
  title: string;
  kind: SessionKind;
  date: string;
  notes: string;
};

export type VideoRecord = {
  id: string;
  athleteId: string;
  sessionId: string;
  name: string;
  uri: string;
  durationMs?: number;
  createdAt: string;
  source: 'importado' | 'gravado';
};

export type Clip = {
  id: string;
  videoId: string;
  sessionId: string;
  name: string;
  startMs: number;
  endMs: number;
  createdAt: string;
  selected: boolean;
};

export type Observation = {
  id: string;
  athleteId: string;
  sessionId: string;
  category: 'Movimentação' | 'Participação' | 'Ações com bola';
  text: string;
  createdAt: string;
};

export type AnalysisStatus = 'idle' | 'processing' | 'completed' | 'cancelled' | 'failed';
export type AnalysisConclusion = 'observado' | 'estimado' | 'não determinável';
export type AnalysisOrigin = 'automático' | 'interpretação';
export type ReviewStatus = 'pendente' | 'confirmado' | 'corrigido' | 'rejeitado';

export type AnalysisEvidence = {
  id: string;
  startMs: number;
  endMs: number;
  description: string;
};

export type AnalysisFinding = {
  id: string;
  reportId: string;
  videoId: string;
  athleteId: string;
  sessionId: string;
  category: 'momento sugerido' | 'ação observável' | 'movimentação' | 'participação' | 'hipótese de posição' | 'limitação';
  text: string;
  evidence: AnalysisEvidence[];
  confidence?: number;
  conclusion: AnalysisConclusion;
  origin: AnalysisOrigin;
  review: ReviewStatus;
  createdAt: string;
};

export type AnalysisReport = {
  id: string;
  videoId: string;
  athleteId: string;
  sessionId: string;
  status: AnalysisStatus;
  progress: number;
  engine: string;
  createdAt: string;
  updatedAt: string;
  findings: AnalysisFinding[];
  limitations: string[];
  message?: string;
  cancelRequested?: boolean;
};

export type AppData = {
  athletes: Athlete[];
  sessions: Session[];
  videos: VideoRecord[];
  clips: Clip[];
  observations: Observation[];
  analysisReports: AnalysisReport[];
};

export const emptyAppData: AppData = {
  athletes: [], sessions: [], videos: [], clips: [], observations: [], analysisReports: [],
};
