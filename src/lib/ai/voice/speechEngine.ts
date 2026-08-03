export class VoiceSpeechEngine {
  public static isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  public static startListening(onCommand: (command: string) => void, onError?: (err: any) => void): any {
    if (!this.isSupported()) {
      if (onError) onError('Web Speech API is not supported in this browser.');
      return null;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      onCommand(transcript);
    };

    recognition.onerror = (err: any) => {
      if (onError) onError(err);
    };

    recognition.start();
    return recognition;
  }
}
