import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, CheckCircle2, Quote, Headphones } from 'lucide-react';
import { Eyebrow } from '../ui/Eyebrow';
import { FONT_STACK } from '../ui/fontStack';
import { useIsMobile } from '../hooks/useIsMobile';

export function VoiceTestimonialSection() {
  const isMobile = useIsMobile();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(172); // ~2:52 min estimated based on recording
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [hasLoadedMetadata, setHasLoadedMetadata] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
        setHasLoadedMetadata(true);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn('Audio play request error:', err);
        setIsPlaying(false);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="testimonio-audio" style={{ background: '#FFFFFF', padding: isMobile ? '48px 20px' : '72px 40px', borderTop: '1px solid #F3F4F6' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ marginBottom: isMobile ? 28 : 40 }}>
          <Eyebrow color="#3D8BF7">Testimonio real en primera persona</Eyebrow>
          <h2 style={{ 
            font: `400 ${isMobile ? '30px' : '44px'}/1.1 ${FONT_STACK}`, 
            letterSpacing: '-0.03em', 
            color: '#0A0B0D', 
            margin: '16px 0 12px' 
          }}>
            La experiencia de conseguir un hogar
          </h2>
          <p style={{ font: `400 16px/1.6 ${FONT_STACK}`, color: '#6B7280', margin: 0, maxWidth: 640 }}>
            Escucha la nota de audio de Abraham contando su proceso, desde las dudas iniciales hasta la firma de su vivienda con el equipo de Tu Hogar Posible.
          </p>
        </div>

        {/* Audio Card */}
        <div style={{
          background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
          borderRadius: 24,
          border: '1px solid #E2E8F0',
          padding: isMobile ? '24px 20px' : '36px 40px',
          boxShadow: '0 10px 30px -10px rgba(61, 139, 247, 0.08)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,139,247,0.12) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none'
          }} />

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            src="/abraham-testimonio.mp3"
            preload="metadata"
          />

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr', gap: isMobile ? 24 : 40, alignItems: 'center' }}>
            
            {/* Left: Avatar & Identity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: isMobile ? 64 : 80,
                height: isMobile ? 64 : 80,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #3D8BF7 0%, #1D4ED8 100%)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 8px 16px rgba(61, 139, 247, 0.25)',
                position: 'relative'
              }}>
                <Headphones size={isMobile ? 28 : 36} strokeWidth={2} />
                <span style={{
                  position: 'absolute',
                  bottom: -4,
                  right: -4,
                  width: 22,
                  height: 22,
                  borderRadius: 9999,
                  background: '#10B981',
                  border: '2px solid #fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <CheckCircle2 size={12} strokeWidth={3} />
                </span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <h3 style={{ font: `600 ${isMobile ? '20px' : '22px'}/1.2 ${FONT_STACK}`, color: '#0A0B0D', margin: 0, letterSpacing: '-0.015em' }}>
                    Abraham
                  </h3>
                  <span style={{
                    font: `600 11px/1 ${FONT_STACK}`,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#1D4ED8',
                    background: '#DBEAFE',
                    padding: '4px 8px',
                    borderRadius: 9999
                  }}>
                    Cliente Verificado
                  </span>
                </div>
                <div style={{ font: `400 14px/1.4 ${FONT_STACK}`, color: '#4B5563', marginTop: 4 }}>
                  Firma de primera vivienda conseguida al 100%
                </div>
              </div>
            </div>

            {/* Right: Audio Player Controls */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 18,
              padding: isMobile ? '16px 16px' : '20px 24px',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}>
              
              {/* Top Controls Row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 9999,
                      background: '#3D8BF7',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(61, 139, 247, 0.3)',
                      transition: 'transform 0.15s ease, background 0.15s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" style={{ marginLeft: 2 }} />}
                  </button>

                  <div>
                    <div style={{ font: `600 13px/1.2 ${FONT_STACK}`, color: '#1F2937' }}>
                      {isPlaying ? 'Reproduciendo audio...' : 'Nota de audio (2:52)'}
                    </div>
                    <div style={{ font: `400 12px/1.2 ${FONT_STACK}`, color: '#6B7280', marginTop: 2 }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>

                {/* Auxiliary buttons: Restart, Speed, Mute */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={restartAudio}
                    title="Reiniciar audio"
                    style={{
                      background: '#F3F4F6',
                      border: 'none',
                      borderRadius: 8,
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4B5563',
                      cursor: 'pointer'
                    }}
                  >
                    <RotateCcw size={14} />
                  </button>

                  <button
                    onClick={cyclePlaybackRate}
                    title="Velocidad de reproducción"
                    style={{
                      background: '#F3F4F6',
                      border: 'none',
                      borderRadius: 8,
                      height: 32,
                      padding: '0 8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1F2937',
                      font: `600 11px ${FONT_STACK}`,
                      cursor: 'pointer'
                    }}
                  >
                    {playbackRate}x
                  </button>

                  <button
                    onClick={toggleMute}
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                    style={{
                      background: '#F3F4F6',
                      border: 'none',
                      borderRadius: 8,
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4B5563',
                      cursor: 'pointer'
                    }}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
              </div>

              {/* Waveform / Scrubber slider */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ position: 'relative', width: '100%', height: 8, display: 'flex', alignItems: 'center' }}>
                  {/* Track background */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#E5E7EB',
                    borderRadius: 9999,
                    overflow: 'hidden'
                  }}>
                    {/* Filled bar */}
                    <div style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3D8BF7 0%, #2563EB 100%)',
                      borderRadius: 9999,
                      transition: 'width 0.1s linear'
                    }} />
                  </div>

                  {/* Range Input for dragging */}
                  <input
                    type="range"
                    min={0}
                    max={duration || 172}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      cursor: 'pointer',
                      zIndex: 2,
                      margin: 0
                    }}
                  />
                </div>

                {/* Animated Audio Wave Bars Visual */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 16, marginTop: 4 }}>
                  {[40, 75, 55, 90, 30, 85, 60, 95, 45, 70, 100, 50, 80, 65, 40, 85, 90, 60, 75, 45, 95, 80, 55, 70, 40, 85, 60, 100, 50, 75].map((h, idx) => {
                    const isPassed = (idx / 30) * 100 <= progressPercent;
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: isPlaying ? `${Math.max(20, (h * (0.6 + Math.sin(idx + currentTime * 3) * 0.4)))}%` : `${h * 0.45}%`,
                          background: isPassed ? '#3D8BF7' : '#D1D5DB',
                          borderRadius: 2,
                          transition: 'height 0.15s ease, background 0.15s ease'
                        }}
                      />
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Quote Excerpt */}
          <div style={{
            marginTop: 24,
            paddingTop: 20,
            borderTop: '1px solid rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12
          }}>
            <Quote size={20} color="#3D8BF7" style={{ flexShrink: 0, marginTop: 2, opacity: 0.8 }} />
            <p style={{
              font: `400 ${isMobile ? '14px' : '15px'}/1.6 ${FONT_STACK}`,
              color: '#374151',
              margin: 0,
              fontStyle: 'italic'
            }}>
              «Tu Hogar Posible ha conseguido que lo que prometen sea realidad. Hoy tengo una vivienda donde puedo llamar hogar. No solo nos llevamos un proceso o una etapa, nos llevamos a amigos a casa.»
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
