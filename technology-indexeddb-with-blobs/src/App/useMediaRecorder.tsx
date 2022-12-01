import { useCallback, useRef, useState, useEffect, useMemo } from 'react';

export enum StatusMessages {
  Idle = 'Idle',
  Recording = 'Recording',
  Errored = 'Errored',
  CountingDown = 'CountingDown',
}

type ReactMediaRecorderRenderProps = {
  startCountdown: () => void;
  startRecording: () => void;
  cancelCountdown: () => void;
  stopRecording: () => void;
  status: StatusMessages;
  countdownTimerDisplay: string;
  recordingTimerDisplay: string;
};

type ReactMediaRecorderHookProps = {
  onStop: (blob: Blob) => void;
  onStart: () => void;
  onError: (message: string) => void;
};

const formatRecordingTimerDisplay = (duration: number) => {
  if (duration <= 0) return '00:00';

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration - hours * 3600) / 60);
  const seconds = duration - (hours * 3600 + minutes * 60);

  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');

  let output = `${mm}:${ss}`;
  if (hours > 0) output = `${hours.toString()}:${output}`;

  return output;
};

const useMediaRecorder = ({ onStop, onStart, onError }: ReactMediaRecorderHookProps): ReactMediaRecorderRenderProps => {
  const [countdownTimer, setCountdownTimer] = useState<number>(3);
  const countdownTimerIntervalId = useRef<NodeJS.Timeout | null>(null);

  const [recordingTimer, setRecordingTimer] = useState<number>(0);
  const recordingTimerIntervalId = useRef<NodeJS.Timeout | null>(null);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const mediaStream = useRef<MediaStream | null>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const mediaChunks = useRef<Blob[]>([]);

  const [status, setStatus] = useState<StatusMessages>(StatusMessages.Idle);

  const onRecordingStart = useCallback(() => {
    onStart();
  }, [onStart]);

  const onRecordingStop = useCallback(() => {
    const blob = new Blob(mediaChunks.current);
    const url = URL.createObjectURL(blob);
    setStatus(StatusMessages.Idle);
    onStop(blob);
  }, [onStop]);

  const onRecordingActive = ({ data }: BlobEvent) => {
    mediaChunks.current.push(data);
  };

  const getAudioContext = useCallback(async () => {
    audioContext.current = new AudioContext();
  }, []);

  const mergeAudioStreams = useCallback(
    async (userStream: MediaStream, displayStream: MediaStream) => {
      await getAudioContext();

      if (audioContext.current) {
        const displayAudio = audioContext.current.createMediaStreamSource(displayStream);
        const userAudio = audioContext.current.createMediaStreamSource(userStream);
  
        const track = userStream.getAudioTracks()[0]

        const mergedAudioStream = audioContext.current.createMediaStreamDestination();
        displayAudio.connect(mergedAudioStream);
        userAudio.connect(mergedAudioStream);

        // MediaStream can only take one audio track. Otherwise, the first one will be selected and others ignored.
        const mergedAudioTrack = mergedAudioStream.stream.getAudioTracks()[0];
        return new MediaStream([mergedAudioTrack]);
      }
    },
    [getAudioContext],
  );

  const getMediaStream = useCallback(async () => {
    try {
      const displayStream = await window.navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
      const userStream = await window.navigator.mediaDevices.getUserMedia({ audio: true });

      const audioStream = await mergeAudioStreams(userStream, displayStream);
      if (audioStream === undefined) {
        onError('Failed to merge audio');
        return;
      }

      const tracks = [...audioStream.getAudioTracks(), ...displayStream.getVideoTracks()];

      mediaStream.current = new MediaStream(tracks);
      setStatus(StatusMessages.Idle);
    } catch (error) {
      onError('Your browser is not supported');
    }
  }, [onError, mergeAudioStreams]);

  const startRecording = useCallback(async () => {
    if (!window.MediaRecorder || !window.navigator.mediaDevices.getDisplayMedia) {
      onError('Your browser does not support screen recording');
      return;
    }

    if (!mediaStream.current) {
      await getMediaStream();
    }

    if (mediaStream.current) {
      const isStreamEnded = mediaStream.current.getTracks().some((track) => track.readyState === 'ended');
      if (isStreamEnded) {
        await getMediaStream();
      }

      // User blocked the permissions
      if (!mediaStream.current || !mediaStream.current.active) return;

      mediaRecorder.current = new MediaRecorder(mediaStream.current);
      mediaRecorder.current.ondataavailable = onRecordingActive;
      mediaRecorder.current.onstop = onRecordingStop;
      mediaRecorder.current.onstart = onRecordingStart;
      mediaRecorder.current.onerror = ({ error }) => onError(error.message);

      mediaRecorder.current.start();
      setStatus(StatusMessages.Recording);
      recordingTimerIntervalId.current = setInterval(() => setRecordingTimer((prev) => (prev += 1)), 1000);
    } else {
      onError('Failed to begin recording');
    }
  }, [getMediaStream, onError, onRecordingStart, onRecordingStop]);

  const resetCountdown = useCallback(() => {
    setCountdownTimer(3);
    clearInterval(countdownTimerIntervalId.current!);
  }, []);

  useEffect(() => {
    if (countdownTimer === 0) {
      resetCountdown();
      startRecording();
    }
  }, [countdownTimer, resetCountdown, startRecording]);

  const startCountdown = useCallback(async () => {
    setStatus(StatusMessages.CountingDown);
    countdownTimerIntervalId.current = setInterval(() => {
      setCountdownTimer((prev) => (prev -= 1));
    }, 1000);
  }, []);

  const cancelCountdown = useCallback(async () => {
    resetCountdown();
    setStatus(StatusMessages.Idle);
  }, [resetCountdown]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && status === StatusMessages.Recording) {
      mediaRecorder.current.stop();
      mediaStream.current && mediaStream.current.getTracks().forEach((track) => track.stop());
      mediaChunks.current = [];

      setRecordingTimer(0);
      clearInterval(recordingTimerIntervalId.current!);
      setStatus(StatusMessages.Idle);
    }
  }, [status]);

  const countdownTimerDisplay = useMemo(() => countdownTimer.toString(), [countdownTimer]);
  const recordingTimerDisplay = useMemo(() => formatRecordingTimerDisplay(recordingTimer), [recordingTimer]);

  return {
    status,
    startCountdown,
    startRecording,
    cancelCountdown,
    stopRecording,
    countdownTimerDisplay,
    recordingTimerDisplay,
  };
};

export default useMediaRecorder;
export { formatRecordingTimerDisplay };
