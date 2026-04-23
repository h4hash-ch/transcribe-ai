export type Tab = "mic" | "upload";
export type OutputStyle = "plain" | "lyrics";

export interface UsageBarProps { usedCount: number; isPremium: boolean; }
export interface InputCardProps {
    tab: Tab;
    setTab: (t: Tab) => void;
    onMicTranscript: (t: string) => void;
    onMicProcessingStart: () => void;
    onMicProcessingEnd: () => void;
    onFile: (f: File) => void;
}
export interface MicRecorderProps {
    onTranscript: (t: string) => void;
    onProcessingStart?: () => void;
    onProcessingEnd?: () => void;
}
export interface FileUploadProps { onFile: (f: File) => void; }
export interface StyleSelectorProps { style: OutputStyle; setStyle: (s: OutputStyle) => void; }
export interface ResultBoxProps { text: string; onClear: () => void; onToast: (msg: string) => void; }
export interface PaywallModalProps { onClose: () => void; onUpgrade: () => void; upgrading: boolean; }
export interface LoadingProps { msg: string; }
export interface ToastProps { msg: string; }

export interface TranscribeResponse { text: string; }
export interface CheckoutResponse { url?: string; error?: string; }
export interface VerifyResponse { paid: boolean; }