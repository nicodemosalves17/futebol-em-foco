import { AnalysisReport, VideoRecord } from '../types/models';

export type AnalysisProgress = {
  progress: number;
  status: AnalysisReport['status'];
  message: string;
};

export type AnalysisEngine = {
  id: string;
  label: string;
  supportsVideoFrames: boolean;
  analyze: (video: VideoRecord, onProgress?: (progress: AnalysisProgress) => void) => Promise<{
    findings: AnalysisReport['findings'];
    limitations: string[];
    message: string;
  }>;
  cancel?: () => void;
};

/**
 * Engine padrão do MVP. Não simula inferência: o Expo/Android atual do projeto
 * não fornece extração de frames de arquivos via expo-video e nenhum modelo local
 * foi validado para eventos futebolísticos ou identificação de atleta.
 */
export const unavailableLocalEngine: AnalysisEngine = {
  id: 'local-unavailable',
  label: 'Análise local (indisponível no MVP)',
  supportsVideoFrames: false,
  async analyze(_video, onProgress) {
    onProgress?.({ progress: 0, status: 'failed', message: 'Nenhum modelo local validado está disponível.' });
    return {
      findings: [],
      limitations: [
        'Nenhum frame foi extraído nem enviado para um modelo.',
        'O app não possui atualmente um modelo local validado para ações, movimentação, participação ou posição no futebol.',
        'Não é possível atribuir atleta por reconhecimento visual; use marcadores e observações manuais.',
      ],
      message: 'Análise automática indisponível: nenhum resultado foi gerado.',
    };
  },
};
