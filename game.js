(() => {
  'use strict';

  const SKILLS = {
    SHIELD: { name: 'SHIELD', ja: '次の攻撃を完全防御', detail: '次に受ける攻撃を1回防ぐ。' },
    SCAN: { name: 'SCAN', ja: '敵の攻撃を遅らせる', detail: '対象の次の攻撃ターンを1回遅らせる。' },
    BURST: { name: 'BURST', ja: '単体へ大ダメージ', detail: '対象に攻撃力2回分のダメージ。' },
    WIPE: { name: 'WIPE', ja: '全体へ攻撃', detail: '画面上の敵全体に攻撃力ぶんのダメージ。' },
  };
  const WORDS = [
    { text: '電波', romaji: 'denpa' }, { text: '通信', romaji: 'tsuushin' },
    { text: '暗号', romaji: 'angou' }, { text: '認証', romaji: 'ninshou', alternates: ['ninsyou'] },
    { text: '接続', romaji: 'setsuzoku' }, { text: '警告', romaji: 'keikoku' },
    { text: '記録', romaji: 'kiroku' }, { text: '保護', romaji: 'hogo' },
    { text: '遮断', romaji: 'shadan', alternates: ['syadan'] }, { text: '復旧', romaji: 'fukkyuu' },
    { text: 'ネット', romaji: 'netto' }, { text: 'サーバー', romaji: 'sa-ba-' },
    { text: '安全', romaji: 'anzen' }, { text: '監視', romaji: 'kanshi' },
    { text: '防御', romaji: 'bougyo' }, { text: '情報', romaji: 'jouhou', alternates: ['zyouhou'] },
    { text: '確認', romaji: 'kakunin' }, { text: '対策', romaji: 'taisaku' },
    { text: '更新', romaji: 'koushin' }, { text: '回線', romaji: 'kaisen' },
    ...[
      ['攻撃', 'kougeki'], ['防止', 'boushi'], ['検知', 'kenchi'], ['解析', 'kaiseki'],
      ['監査', 'kansa'], ['脅威', 'kyoui'], ['侵入', 'shinnyuu'], ['対処', 'taisho'],
      ['検査', 'kensa'], ['修復', 'shuufuku'], ['隔離', 'kakuri'], ['警備', 'keibi'],
      ['秘密', 'himitsu'], ['公開', 'koukai'], ['鍵', 'kagi'], ['認可', 'ninka'],
      ['権限', 'kengen'], ['利用者', 'riyousha'], ['管理者', 'kanrisha'], ['アカウント', 'akaunto'],
      ['パスワード', 'pasuwa-do'], ['暗証番号', 'anshoubangou'], ['データ', 'de-ta'], ['ファイル', 'fairu'],
      ['データベース', 'de-ta-be-su'], ['アプリ', 'apuri'], ['ブラウザー', 'burauza-'], ['端末', 'tanmatsu'],
      ['機器', 'kiki'], ['装置', 'souchi'], ['設定', 'settei'], ['機能', 'kinou'],
      ['操作', 'sousa'], ['起動', 'kidou'], ['停止', 'teishi'], ['再起動', 'saikidou'],
      ['処理', 'shori'], ['実行', 'jikkou'], ['保存', 'hozon'], ['削除', 'sakujo'],
      ['変更', 'henkou'], ['追加', 'tsuika'], ['送信', 'soushin'], ['受信', 'jushin'],
      ['転送', 'tensou'], ['応答', 'outou'], ['要求', 'youkyuu'], ['失敗', 'shippai'],
      ['成功', 'seikou'], ['異常', 'ijou'], ['正常', 'seijou'], ['障害', 'shougai'],
      ['復元', 'fukugen'], ['予防', 'yobou'], ['対応', 'taiou'],
      ['利用', 'riyou'], ['作業', 'sagyou'], ['記憶', 'kioku'], ['速度', 'sokudo'],
      ['時間', 'jikan'], ['画面', 'gamen'], ['文字', 'moji'], ['入力', 'nyuuryoku'],
      ['練習', 'renshuu'], ['集中', 'shuuchuu'], ['正確', 'seikaku'], ['連続', 'renzoku'],
      ['挑戦', 'chousen'], ['準備', 'junbi'], ['開始', 'kaishi'], ['終了', 'shuuryou'],
      ['選択', 'sentaku'], ['進行', 'shinkou'], ['記録する', 'kirokusuru'], ['守り切る', 'mamorikiru'],
      ['新しい', 'atarashii'], ['素早く', 'subayaku'], ['確実', 'kakujitsu'], ['重要', 'juuyou'],
      ['注意', 'chuui'], ['確認する', 'kakuninsuru'], ['接続する', 'setsuzokusuru'], ['問題', 'mondai'],
      ['解決', 'kaiketsu'], ['仲間', 'nakama'], ['最後', 'saigo'], ['未来', 'mirai'],
      ['電力', 'denryoku'], ['回復', 'kaifuku'], ['強化', 'kyouka'], ['防壁', 'bouheki'],
      ['装甲', 'soukou'], ['信号', 'shingou'], ['回避', 'kaihi'], ['警報', 'keihou'],
    ].map(([text, romaji]) => ({ text, romaji })),
    { text: '原因', romaji: 'genin', alternates: ['gennin'] },
  ];
  const BOSS_LINES = [
    { text: '不正な通信を検知して侵入経路を遮断する', romaji: 'fuseinatsuushinwokenchishiteshinnyuukeirowoshadansuru' },
    { text: 'サーバーを守るため全ての接続を確認する', romaji: 'sa-ba-womamorutamesubetenosetsuzokuwokakuninsuru' },
    { text: '攻撃プログラムを特定して防御を再構築する', romaji: 'kougekipuroguramuwotokuteishitebougyowosaikouchikusuru' },
    { text: '管理者の権限を確認し、不審な利用者を隔離する', romaji: 'kanrishanokengenwokakuninshifushinnariyoushawokakurisuru' },
    { text: '暗号鍵を更新し、失われたデータを復元する', romaji: 'angoukagiwokoushinshiushinawaretade-tawofukugensuru' },
    { text: '外部からの要求を遮断し、安全な回線だけを残す', romaji: 'gaibukaranoyoukyuuwoshadanshianzennakaisendakewonokosu' },
    { text: '全ての侵入経路を閉じて、安全な状態に戻す', romaji: 'subetenoshinnyuukeirowotojiteanzennajoutainimodosu' },
  ];
  // Equivalent spellings are checked as the player types instead of building
  // every possible spelling up front. This keeps long boss commands reliable
  // and avoids silently losing variants when a combination count gets large.
  const ROMAJI_RULES = [
    ['shi', 'si'], ['chi', 'ti'], ['tsu', 'tu'], ['fu', 'hu'], ['ji', 'zi'],
    ['sha', 'sya'], ['shu', 'syu'], ['sho', 'syo'],
    ['cha', 'tya'], ['chu', 'tyu'], ['cho', 'tyo'],
    ['ja', 'zya'], ['ju', 'zyu'], ['jo', 'zyo'],
    ['ja', 'jya'], ['ju', 'jyu'], ['jo', 'jyo'],
    ['ou', 'oo'], ['ei', 'ee'],
  ].flatMap(([a, b]) => [[a, b], [b, a]]);
  function romajiBase(value) { return value.endsWith('n') ? `${value}n` : value; }
  function displayRomaji(word) { return romajiBase(word.romaji); }
  function bossMaxHp() {
    const commandLength = BOSS_LINES.reduce((total, line) => total + romajiBase(line.romaji).length, 0);
    return Math.ceil(commandLength / 5) * Math.max(1, state?.attack || 1);
  }
  function romajiTransitions(source, index) {
    const transitions = [[source[index], index + 1]];
    for (const [from, to] of ROMAJI_RULES) {
      if (source.startsWith(from, index)) transitions.push([to, index + from.length]);
    }
    const next = source[index + 1];
    // A nasal ん before a consonant accepts both n and nn. At the end of a
    // word it remains nn, matching the game's established input convention.
    if (source[index] === 'n' && next && !'aeiouyn'.includes(next) && next !== 'n') {
      transitions.push(['nn', index + 1]);
    }
    // Small っ: doubled consonant, xtu, or ltu.
    const consonant = source[index];
    if (consonant === next && 'bcdfghjklmpqrstvwxyz'.includes(consonant)) {
      transitions.push([`xtu${consonant}`, index + 2], [`ltu${consonant}`, index + 2]);
    }
    // A long-vowel mark can also be entered as the previous vowel.
    if (source[index] === '-') {
      const previousVowel = source.slice(0, index).match(/[aeiou](?!.*[aeiou])/);
      if (previousVowel) transitions.push([previousVowel[0], index + 1]);
    }
    // Long vowels written with a repeated vowel may use the keyboard's '-'.
    if ('aeiou'.includes(source[index]) && source[index] === next) {
      transitions.push([`${source[index]}-`, index + 2]);
    }
    return transitions;
  }
  function romajiPathStatus(word, typed) {
    const sources = [word.romaji, ...(word.alternates || [])].map(romajiBase);
    const nextLetters = new Set();
    let complete = false;
    for (const source of sources) {
      const visited = new Set();
      const walk = (index, typedIndex) => {
        const key = `${index}:${typedIndex}`;
        if (visited.has(key)) return;
        visited.add(key);
        if (index === source.length) {
          if (typedIndex === typed.length) complete = true;
          return;
        }
        for (const [output, nextIndex] of romajiTransitions(source, index)) {
          const remaining = typed.length - typedIndex;
          const compared = Math.min(remaining, output.length);
          if (output.slice(0, compared) !== typed.slice(typedIndex, typedIndex + compared)) continue;
          if (output.length > remaining) nextLetters.add(output[remaining]);
          else walk(nextIndex, typedIndex + output.length);
        }
      };
      walk(0, 0);
    }
    return { complete, nextLetters };
  }
  function isCompleteRomaji(word, typed) {
    return romajiPathStatus(word, typed).complete;
  }
  function nextRomajiLetters(word, typed) {
    return [...romajiPathStatus(word, typed).nextLetters];
  }
  const ENEMIES = {
    standard: { name: '侵入ボット', icon: '⌁', hp: 3, misses: 3, damage: 1, label: 'STANDARD' },
    fast: { name: '高速ボット', icon: '⟫', hp: 2, misses: 2, damage: 1, label: 'FAST' },
    charger: { name: '突進ボット', icon: '⌁', hp: 2, misses: 3, damage: 1, label: 'CHARGER' },
    jammer: { name: 'ジャマー', icon: '∿', hp: 2, misses: 3, damage: 1, label: 'JAMMER' },
  };
  const $ = (id) => document.getElementById(id);
  const screens = ['start', 'battle', 'choice', 'pick', 'result'];
  let state = null;
  let selectedStarter = null;
  let timerHandle = null;
  let noticeTimer = null;
  let clearIntroCallback = null;
  const readPreference = (key, fallback) => { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, String(value)); } catch { /* Preferences still work for this session. */ } };
  let audioContext = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let soundEnabled = readPreference('server-defense-audio-enabled', 'true') !== 'false';
  let musicVolume = Number(readPreference('server-defense-music-volume', '1.2'));
  let sfxVolume = Number(readPreference('server-defense-sfx-volume', '0.85'));
  if (!Number.isFinite(musicVolume)) musicVolume = 1.2;
  if (!Number.isFinite(sfxVolume)) sfxVolume = 0.85;
  musicVolume = Math.max(0, Math.min(1.5, musicVolume));
  sfxVolume = Math.max(0, Math.min(1, sfxVolume));
  let musicTimer = null;
  let musicMode = 'combat';
  const activeMusicSources = new Set();
  let homeMusicStarted = false;
  let musicStep = 0;
  let nextMusicTime = 0;

  function initAudio() {
    if (!soundEnabled) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = 0.75;
      musicGain = audioContext.createGain();
      sfxGain = audioContext.createGain();
      musicGain.gain.value = musicVolume;
      sfxGain.gain.value = sfxVolume;
      musicGain.connect(masterGain);
      sfxGain.connect(masterGain);
      masterGain.connect(audioContext.destination);
    }
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    return audioContext;
  }
  function scheduleTone(frequency, duration, wave, volume, start, endFrequency = null, output = sfxGain) {
    if (!audioContext || !soundEnabled) return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = wave;
    oscillator.frequency.setValueAtTime(frequency, start);
    if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.012, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(output || masterGain || audioContext.destination);
    if (output === musicGain) {
      activeMusicSources.add(oscillator);
      oscillator.addEventListener('ended', () => activeMusicSources.delete(oscillator), { once: true });
    }
    oscillator.start(start);
    oscillator.stop(start + duration + 0.01);
  }
  function playNoise(duration = 0.06, volume = 0.02, centerFrequency = 1600, delay = 0) {
    const context = initAudio();
    if (!context) return;
    const frameCount = Math.max(1, Math.floor(context.sampleRate * duration));
    const buffer = context.createBuffer(1, frameCount, context.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i += 1) samples[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const start = context.currentTime + delay;
    source.buffer = buffer;
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(centerFrequency, start);
    filter.Q.setValueAtTime(0.72, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.008, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter); filter.connect(gain); gain.connect(sfxGain || masterGain || context.destination);
    source.start(start); source.stop(start + duration + 0.01);
  }
  function playTone(frequency, duration = 0.06, wave = 'sine', volume = 0.025, delay = 0, endFrequency = null) {
    const context = initAudio();
    if (!context) return;
    scheduleTone(frequency, duration, wave, volume, context.currentTime + delay, endFrequency);
  }
  function scheduleMusicTone(frequency, duration, wave, volume, start, endFrequency = null) {
    scheduleTone(frequency, duration, wave, volume, start, endFrequency, musicGain);
  }
  function scheduleMusicNoise(duration, volume, centerFrequency, start, type = 'highpass') {
    if (!audioContext || !musicGain || !soundEnabled) return;
    const frameCount = Math.max(1, Math.floor(audioContext.sampleRate * duration));
    const buffer = audioContext.createBuffer(1, frameCount, audioContext.sampleRate);
    const samples = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i += 1) samples[i] = (Math.random() * 2 - 1) * (1 - i / frameCount);
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    source.buffer = buffer;
    filter.type = type;
    filter.frequency.setValueAtTime(centerFrequency, start);
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + Math.min(0.006, duration / 3));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    source.connect(filter); filter.connect(gain); gain.connect(musicGain);
    activeMusicSources.add(source);
    source.addEventListener('ended', () => activeMusicSources.delete(source), { once: true });
    source.start(start); source.stop(start + duration + 0.01);
  }
  function scheduleMusic() {
    if (!soundEnabled || !audioContext || audioContext.state !== 'running') return;
    const isBoss = musicMode === 'boss';
    const isHome = musicMode === 'home';
    const bpm = isHome ? 112 : isBoss ? 156 : 132;
    const stepDuration = 60 / bpm / 2;
    const roots = isBoss ? [38, 36, 34, 33] : isHome ? [40, 43, 38, 35] : [40, 43, 38, 35];
    const bossRiff = [0, 1, 7, 3, 1, -2, 0, 7];
    const mobRiff = [0, 3, 7, 5, 3, 10, 7, 5];
    const note = (midi) => 440 * (2 ** ((midi - 69) / 12));
    while (nextMusicTime < audioContext.currentTime + 0.18) {
      const step = musicStep % 32;
      const bar = Math.floor(musicStep / 8) % roots.length;
      const root = roots[bar];
      const beat = step % 8;
      const noteTime = nextMusicTime;
      if (beat === 0) {
        // Each track has its own minor progression and chord color.
        const chord = isBoss ? [0, 3, 7, 13] : [0, 3, 7, 10];
        chord.forEach((interval, index) => {
          const octave = isBoss ? 24 : 24;
          scheduleMusicTone(note(root + octave + interval), isBoss ? 1.75 : 1.35,
            isBoss ? 'sawtooth' : 'triangle', isBoss ? 0.012 : isHome ? 0.008 : 0.011,
            noteTime + index * 0.025, note(root + octave + interval) * (index % 2 ? 0.997 : 1.003));
        });
        scheduleMusicTone(note(root - 12), isBoss ? 0.42 : 0.3, 'triangle', isBoss ? 0.045 : 0.032, noteTime, note(root - 17));
      }
      if (isBoss) {
        // Boss: urgent industrial four-on-the-floor, noisy metal backbeat,
        // pulsing sub bass, and a recognizable descending warning hook.
        if (beat % 2 === 0) {
          scheduleMusicTone(112, 0.24, 'sine', 0.115, noteTime, 36);
          scheduleMusicTone(note(root - 12), 0.18, 'sawtooth', 0.052, noteTime + 0.035, note(root - 17));
        }
        if (beat === 2 || beat === 6) {
          scheduleMusicTone(188, 0.13, 'sawtooth', 0.032, noteTime, 72);
          scheduleMusicNoise(0.12, 0.035, 1250, noteTime, 'bandpass');
        }
        if (beat % 2 === 1) scheduleMusicNoise(0.045, 0.012, 7200, noteTime);
        if ([0, 1, 3, 4, 6, 7].includes(beat)) {
          const lead = note(root + 24 + bossRiff[beat]);
          scheduleMusicTone(lead, 0.2, 'sawtooth', 0.027, noteTime, lead * (beat % 2 ? 0.94 : 1.025));
        }
        // A piercing two-note alarm motif is exclusive to the boss track.
        if (beat === 1 || beat === 5) scheduleMusicTone(880, 0.31, 'square', 0.026, noteTime, 660);
        if (beat === 3 || beat === 7) scheduleMusicTone(740, 0.23, 'sawtooth', 0.021, noteTime, 554);
        if (beat === 0) scheduleMusicTone(note(root + 12), 1.4, 'sawtooth', 0.026, noteTime, note(root + 11));
      } else {
        // Mob: a more melodic, elastic breakbeat with brighter plucks and
        // softer drums, keeping action while leaving room for typing SFX.
        if (beat === 0 || beat === 4) scheduleMusicTone(104, 0.18, 'sine', isHome ? 0.045 : 0.085, noteTime, 44);
        if (beat === 2 || beat === 6) {
          scheduleMusicTone(208, 0.09, 'triangle', isHome ? 0.016 : 0.03, noteTime, 112);
          scheduleMusicNoise(0.085, isHome ? 0.012 : 0.024, 1600, noteTime, 'bandpass');
        }
        if (beat % 2 === 1) scheduleMusicNoise(0.04, isHome ? 0.006 : 0.011, 8500, noteTime);
        if ([1, 2, 3, 5, 6, 7].includes(beat)) {
          const lead = note(root + 24 + mobRiff[beat]);
          scheduleMusicTone(lead, 0.14, 'triangle', isHome ? 0.011 : 0.022, noteTime, lead * (beat % 2 ? 1.015 : 0.985));
        }
        if (beat === 3 || beat === 7) scheduleMusicTone(note(root + 36), 0.1, 'square', isHome ? 0.004 : 0.008, noteTime, note(root + 43));
      }
      nextMusicTime += stepDuration;
      musicStep += 1;
    }
  }
  function startMusic(mode = 'combat') {
    stopMusic();
    if (!soundEnabled || !initAudio()) return;
    musicMode = mode;
    musicStep = 0;
    nextMusicTime = audioContext.currentTime + 0.04;
    musicGain.gain.cancelScheduledValues(audioContext.currentTime);
    musicGain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    musicGain.gain.linearRampToValueAtTime(musicVolume, audioContext.currentTime + 0.22);
    scheduleMusic();
    if (mode === 'boss') {
      // Make the transition unmistakable: a low core impact followed by a
      // falling dual alarm before the boss groove takes over.
      const cueAt = audioContext.currentTime + 0.035;
      scheduleMusicTone(48, 0.95, 'sawtooth', 0.15, cueAt, 28);
      scheduleMusicTone(988, 0.58, 'square', 0.045, cueAt + 0.08, 494);
      scheduleMusicTone(740, 0.62, 'square', 0.04, cueAt + 0.3, 370);
      scheduleMusicNoise(0.55, 0.025, 1100, cueAt, 'lowpass');
    }
    musicTimer = setInterval(scheduleMusic, 70);
  }
  function stopMusic() {
    clearInterval(musicTimer);
    musicTimer = null;
    if (audioContext && musicGain) {
      const now = audioContext.currentTime;
      musicGain.gain.cancelScheduledValues(now);
      musicGain.gain.setTargetAtTime(0.0001, now, 0.018);
    }
    activeMusicSources.forEach((source) => {
      try { source.stop(); } catch { /* A short note may have already ended. */ }
    });
    activeMusicSources.clear();
  }
  function playSound(name) {
    if (!soundEnabled) return;
    if (name === 'type') {
      // Soft terminal key acknowledgement: a glassy tick with a tiny static edge.
      playTone(1080 + Math.random() * 180, 0.045, 'sine', 0.022, 0, 760);
      playTone(190, 0.045, 'triangle', 0.012, 0, 110);
      playNoise(0.028, 0.016, 3600);
    }
    if (name === 'attack') { playTone(640, 0.21, 'sawtooth', 0.05, 0, 115); playTone(74, 0.26, 'sine', 0.075, 0.025, 36); playNoise(0.13, 0.052, 880, 0.015); }
    if (name === 'boot') { playTone(72, 0.9, 'sine', 0.045, 0, 310); playTone(420, 0.62, 'triangle', 0.025, 0.25, 1180); playNoise(0.8, 0.03, 1900, 0.08); }
    if (name === 'mistake') {
      playTone(310, 0.32, 'sawtooth', 0.055, 0, 74);
      playTone(58, 0.48, 'triangle', 0.075, 0.015, 32);
      playTone(1450, 0.055, 'square', 0.022, 0.02, 380);
      playTone(1180, 0.07, 'square', 0.018, 0.16, 260);
      playNoise(0.24, 0.065, 720);
    }
    if (name === 'hit') { playTone(88, 0.24, 'sine', 0.075, 0, 34); playTone(520, 0.12, 'triangle', 0.022, 0.015, 150); playNoise(0.14, 0.06, 460); }
    if (name === 'kill') { playTone(188, 0.48, 'sawtooth', 0.055, 0, 38); playTone(1240, 0.2, 'sine', 0.032, 0, 180); playTone(72, 0.78, 'sine', 0.07, 0.1, 28); playNoise(0.36, 0.065, 1020, 0.025); playNoise(0.16, 0.028, 3300, 0.12); }
    if (name === 'skill') { playTone(260, 0.34, 'sine', 0.035, 0, 920); playTone(1180, 0.24, 'triangle', 0.025, 0.17, 660); playNoise(0.26, 0.03, 2400, 0.02); }
    if (name === 'lock') { playTone(190, 0.48, 'sine', 0.04, 0, 720); playTone(980, 0.19, 'sine', 0.027, 0.23, 1340); playNoise(0.35, 0.024, 1800, 0.05); }
    if (name === 'hover') playTone(1060, 0.045, 'sine', 0.015, 0, 1480);
    if (name === 'boss') { playTone(54, 1.05, 'sine', 0.065, 0, 37); playTone(280, 0.75, 'sawtooth', 0.032, 0.06, 64); playTone(880, 0.52, 'sine', 0.027, 0.25, 1250); playNoise(0.9, 0.04, 1650, 0.04); }
    if (name === 'clear') { playTone(410, 0.42, 'sine', 0.032, 0, 640); playTone(920, 0.31, 'triangle', 0.024, 0.13, 1280); playNoise(0.3, 0.018, 2500, 0.08); }
    if (name === 'defeat') {
      playTone(196, 0.42, 'sawtooth', 0.05, 0, 58);
      playTone(146.8, 0.68, 'triangle', 0.05, 0.2, 49);
      playTone(73.4, 1.35, 'sawtooth', 0.07, 0.38, 34);
      playTone(520, 0.16, 'square', 0.03, 0.42, 310);
      playTone(520, 0.2, 'square', 0.026, 0.86, 250);
      playTone(110, 1.7, 'triangle', 0.035, 0.72, 38);
    }
  }
  function renderSoundToggle() {
    const button = $('sound-toggle');
    button.textContent = soundEnabled ? '♪ AUDIO ON' : '♪ AUDIO OFF';
    button.setAttribute('aria-pressed', String(soundEnabled));
    button.classList.toggle('muted', !soundEnabled);
  }
  function renderAudioSettings() {
    $('music-volume').value = String(Math.round(musicVolume * 100));
    $('sfx-volume').value = String(Math.round(sfxVolume * 100));
    $('music-volume-value').textContent = `${Math.round(musicVolume * 100)}%`;
    $('sfx-volume-value').textContent = `${Math.round(sfxVolume * 100)}%`;
  }

  function showScreen(name) {
    screens.forEach((item) => $(`screen-${item}`).classList.toggle('hidden', item !== name));
  }
  function randomWord() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }
  function shuffle(list) { return [...list].sort(() => Math.random() - 0.5); }
  function startMenu() {
    const host = $('starter-options');
    host.replaceChildren();
    Object.entries(SKILLS).forEach(([id, skill], index) => {
      const button = document.createElement('button');
      button.className = `starter-card${selectedStarter === id ? ' selected' : ''}`;
      button.innerHTML = `<b>${id}</b><span>${skill.ja}</span><small>KEY ${index + 1} DURING BATTLE</small>`;
      button.addEventListener('click', () => { selectedStarter = id; startMenu(); });
      host.append(button);
    });
    $('start-run').disabled = !selectedStarter;
  }
  function newRun() {
    if (!selectedStarter) return;
    $('screen-result').classList.remove('failed');
    document.body.classList.remove('run-failed');
    clearInterval(timerHandle);
    state = {
      hp: 10, maxHp: 10, attack: 1, shield: 0, level: 1, xp: 0,
      xpNext: 60, ownedSkills: new Set([selectedStarter]), skillUses: 0,
      entities: [], targetId: null, boss: null, battleType: 'normal',
      mainIndex: 0, pendingMain: null, dangerCount: 0,
      combo: 0, bonusReady: false, bestCombo: 0,
      runStart: Date.now(), correctKeys: 0, totalKeys: 0, mistakes: 0,
      activeSeconds: 0,
      kills: 0, wordsCompleted: 0, pendingLevels: 0, afterLevelUps: null,
      totalAttacks: 0, interrupted: false, guardNext: false, deathReason: '',
    };
    timerHandle = setInterval(updateClock, 1000);
    showScreen('battle');
    startMainBattle(0);
  }
  function showStartIntro() {
    initAudio(); stopMusic(); homeMusicStarted = false; playSound('boot');
    const intro = $('start-intro'); intro.classList.remove('hidden'); intro.setAttribute('aria-hidden', 'false');
    $('start-intro-go').focus({ preventScroll: true });
  }
  function dismissStartIntro() {
    const intro = $('start-intro'); intro.classList.add('hidden'); intro.setAttribute('aria-hidden', 'true'); newRun();
  }
  function updateClock() {
    if (!state) return;
    const elapsed = Math.floor((Date.now() - state.runStart) / 1000);
    $('footer-clock').textContent = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${String(elapsed % 60).padStart(2, '0')}`;
    if ($('screen-battle').classList.contains('hidden') || !$('start-intro').classList.contains('hidden') || !$('boss-intro').classList.contains('hidden') || !$('clear-intro').classList.contains('hidden')) return;
    state.activeSeconds += 1;
    const mins = Math.max(state.activeSeconds / 60, 1 / 60);
    $('speed-live').textContent = `速度 ${Math.round(state.correctKeys / mins)} キー/分`;
    $('accuracy-live').textContent = `正確率 ${accuracy()}%`;
    state.entities.filter((e) => e.type === 'charger').forEach((e) => {
      e.timer = Math.max(0, e.timer - 1);
      if (e.timer === 0) {
        if (e.stagger > 0) {
          e.stagger -= 1;
          e.timer = 5;
          showNotice('SCAN // 突進ボットの攻撃を遅延');
          return;
        }
        takeDamage(1, '突進ボットが到達', '突進ボットのタイマーが0になり、攻撃を受けた');
        if (state.hp <= 0) return;
        removeEntity(e.id, false);
      }
    });
    renderAll();
  }
  function accuracy() {
    if (!state || state.totalKeys === 0) return 100;
    return Math.round((state.correctKeys / state.totalKeys) * 100);
  }
  function createEnemy(type, elite = false, extra = {}) {
    const template = ENEMIES[type];
    return {
      id: crypto.randomUUID(), type, name: template.name, icon: template.icon,
      hp: template.hp + (elite ? 1 : 0), maxHp: template.hp + (elite ? 1 : 0),
      baseMisses: template.misses, misses: 0, damage: template.damage,
      word: randomWord(), progress: 0, typed: '', timer: type === 'charger' ? 10 : null,
      elite, stagger: 0, ...extra,
    };
  }
  function startMainBattle(index) {
    if (!state) return;
    if (index >= 2) { startBattle('boss', index); return; }
    state.mainIndex = index;
    let types;
    if (index === 0) types = ['standard', 'standard', 'standard'];
    else types = ['standard', 'standard', 'fast', Math.random() < .5 ? 'charger' : 'standard'];
    startBattle('normal', index, types);
  }
  function startDangerBattle() {
    state.dangerCount += 1;
    const types = ['standard', 'fast', 'charger', 'jammer'];
    startBattle('elite', null, types);
  }
  function startBattle(type, index = null, types = []) {
    state.battleType = type;
    state.skillUses = type === 'boss' ? 3 : 2;
    state.combo = 0; state.bonusReady = false;
    state.entities = [];
    state.targetId = null;
    const guide = type === 'boss'
      ? ['最終防衛戦', '長文コマンドを最後まで入力。5文字ごとに中枢へ攻撃。', '規定回数ミスすると反撃。フェーズ移行後は反撃が強化される。']
      : type === 'elite'
        ? ['危険ノード', '強敵4体を出現順に撃破。勝利すると追加強化を獲得。', '突進ボットは時間切れで攻撃。ジャマー生存中は他の敵へのミス許容数が減る。']
        : index === 0
          ? ['ノード 01 // 基礎侵入', '侵入ボット3体を出現順に撃破。', '攻撃までのミス回数を敵カードで確認。ミスが上限に達するとHPを失う。']
          : ['ノード 02 // 複合侵入', '高速ボットを含む敵集団を出現順に撃破。', '高速ボットはミス許容が少ない。突進ボットはタイマーが0になると攻撃。'];
    $('stage-guide-title').textContent = guide[0];
    $('stage-guide-objective').textContent = guide[1];
    $('stage-guide-danger').textContent = guide[2];
    const coreHp = type === 'boss' ? bossMaxHp() : 0;
    state.boss = type === 'boss' ? { hp: coreHp, maxHp: coreHp, phase: 1, misses: 0, stagger: 0, charProgress: 0, typed: '', lineIndex: 0, lockAt: Date.now() } : null;
    if (type === 'boss') {
      $('battle-title').textContent = 'ボットネット中枢を停止せよ';
      $('battle-kicker').textContent = '// CORE INCIDENT';
      $('field-state').textContent = 'BOTNET CORE // LIVE';
      $('boss-panel').classList.remove('hidden');
    } else {
      $('boss-panel').classList.add('hidden');
      $('battle-title').textContent = type === 'elite' ? '危険ルート // 強敵を排除' : `侵入ノード ${index + 1} を排除せよ`;
      $('battle-kicker').textContent = type === 'elite' ? '// HIGH RISK INCIDENT' : `// INCIDENT 0${index + 1}`;
      $('field-state').textContent = type === 'elite' ? 'HOSTILE CLUSTER // LIVE' : 'FIREWALL ZONE // LIVE';
    }
    if (type !== 'boss') {
      types.forEach((enemyType) => state.entities.push(createEnemy(enemyType, type === 'elite')));
      if (type === 'elite' && state.entities.length < 4) state.entities.push(createEnemy('standard', true));
    }
    $('room-progress').innerHTML = `<span class="${index === 0 ? 'active' : ''}">NODE 01</span><span class="${index === 1 ? 'active' : ''}">NODE 02</span><span class="${type === 'boss' ? 'active' : ''}">CORE</span>`;
    if (type === 'boss') showNotice('CORE LOCK ON // ボットネット中枢を捕捉');
    else showNotice(type === 'elite' ? '危険ノード: 報酬強化を獲得せよ' : '侵入プログラムを出現順に迎撃せよ');
    showScreen('battle');
    if (state.entities.length) {
      state.targetId = state.entities[0].id; state.entities[0].lockAt = Date.now();
      playSound('lock');
      showNotice(`LOCK ON // ${state.entities[0].name}を捕捉`);
    } else if (state.boss) state.targetId = 'boss';
    renderAll();
    if (type === 'boss') showBossIntro();
    else {
      startMusic('combat');
      // Move focus off the now-hidden start/upgrade button so the first keystroke
      // is captured by the battle screen immediately after auto-locking a target.
      $('enemy-arena').focus({ preventScroll: true });
    }
  }
  function showBossIntro() {
    stopMusic();
    $('start-intro').classList.add('hidden');
    $('start-intro').setAttribute('aria-hidden', 'true');
    $('clear-intro').classList.add('hidden');
    $('clear-intro').setAttribute('aria-hidden', 'true');
    playSound('boss');
    const intro = $('boss-intro');
    intro.classList.remove('hidden');
    intro.setAttribute('aria-hidden', 'false');
    intro.style.zIndex = '100';
    $('boss-intro-start').focus({ preventScroll: true });
  }
  function dismissBossIntro() {
    const intro = $('boss-intro');
    intro.classList.add('hidden');
    intro.setAttribute('aria-hidden', 'true');
    if (state?.boss) state.boss.lockAt = Date.now();
    startMusic('boss');
    showNotice('CORE LOCK ON // 防衛コマンドを入力せよ');
    renderAll();
    $('enemy-arena').focus({ preventScroll: true });
  }
  function currentTarget() { return state?.entities.find((e) => e.id === state.targetId) || null; }
  function effectiveMissLimit(enemy) {
    let limit = enemy.baseMisses;
    if (enemy.type !== 'jammer' && state.entities.some((e) => e.type === 'jammer')) limit = Math.max(1, limit - 1);
    return limit;
  }
  function currentBossLine() { return BOSS_LINES[Math.min(state?.boss?.lineIndex || 0, BOSS_LINES.length - 1)]; }
  function renderAll() {
    if (!state) return;
    $('player-level').textContent = state.level;
    $('xp-label').textContent = `${state.xp} / ${state.xpNext} EXP`;
    $('xp-fill').style.width = `${Math.min(100, (state.xp / state.xpNext) * 100)}%`;
    $('hp-label').textContent = `${state.hp} / ${state.maxHp}`;
    $('hp-fill').style.width = `${Math.max(0, (state.hp / state.maxHp) * 100)}%`;
    $('shield-label').textContent = `${state.shield} / 5`;
    $('shield-fill').style.width = `${state.shield * 20}%`;
    $('attack-label').textContent = state.attack;
    $('enemy-count').textContent = `ENEMIES ${String(state.entities.length + (state.boss ? 1 : 0)).padStart(2, '0')}`;
    $('skill-count').textContent = `${state.skillUses} USES`;
    renderEnemies(); renderSkills(); renderTarget(); renderBoss(); renderIntel();
  }
  function renderEnemies() {
    const arena = $('enemy-arena');
    const lockAt = state.targetId === 'boss' ? state.boss?.lockAt : currentTarget()?.lockAt;
    arena.classList.toggle('lock-sweep', !!lockAt && Date.now() - lockAt < 850);
    arena.replaceChildren();
    state.entities.forEach((enemy, index) => {
      const card = document.createElement('article');
      card.dataset.enemyId = enemy.id;
      const queueClass = enemy.id === state.targetId ? ' selected active' : index === 1 ? ' queued next-up' : ' queued waiting';
      card.className = `enemy-card${queueClass}${enemy.elite ? ' danger' : ''}`;
      if (enemy.id === state.targetId && enemy.lockAt) {
        const lockAge = Date.now() - enemy.lockAt;
        if (lockAge < 850) card.classList.add('lock-acquire');
        card.style.setProperty('--lock-delay', `-${lockAge}ms`);
      }
      if (enemy.id === state.targetId && enemy.keyPulseAt && Date.now() - enemy.keyPulseAt < 145) {
        const pulseAge = Date.now() - enemy.keyPulseAt;
        card.classList.add('typing-recoil');
        card.style.setProperty('--pulse-delay', `-${pulseAge}ms`);
      }
      card.setAttribute('aria-label', `${enemy.name} HP ${enemy.hp}${enemy.id === state.targetId ? ' 攻撃中' : ' 待機中'}`);
      const threat = enemy.type === 'charger' ? `到達まで ${enemy.timer}秒` : `攻撃まで ${Math.max(0, effectiveMissLimit(enemy) - enemy.misses)}ミス`;
      const inputPreview = enemy.id === state.targetId
        ? `<div class="enemy-input-preview"><small>入力コマンド</small><b>${enemy.word.text}</b><span>${displayRomaji(enemy.word)}</span></div>`
        : '';
      card.innerHTML = `<div class="enemy-icon ${enemy.type}"><span>${enemy.icon}</span></div><span class="enemy-kind">HOSTILE // ${ENEMIES[enemy.type].label}${enemy.elite ? ' // ELITE' : ''}</span><div class="enemy-name">${enemy.name}</div><div class="enemy-hp"><i style="width:${Math.max(0, enemy.hp / enemy.maxHp * 100)}%"></i></div><div class="enemy-threat">${threat}</div>${inputPreview}${enemy.type === 'charger' ? `<div class="charger-timer" style="width:${enemy.timer * 10}%"></div>` : ''}`;
      if (enemy.hitAt && Date.now() - enemy.hitAt < 320) {
        card.classList.add('hit-flash');
        const impact = document.createElement('i'); impact.className = 'attack-projectile'; card.append(impact);
        const damageText = document.createElement('b'); damageText.className = 'damage-number'; damageText.textContent = `−${enemy.lastHitDamage || 1}`; card.append(damageText);
        setTimeout(() => impact.remove(), Math.max(0, 320 - (Date.now() - enemy.hitAt)));
        setTimeout(() => damageText.remove(), Math.max(0, 520 - (Date.now() - enemy.hitAt)));
      }
      arena.append(card);
    });
    if (state.boss) {
      const card = document.createElement('article');
      card.dataset.enemyId = 'boss';
      card.className = `enemy-card boss-card${state.targetId === 'boss' ? ' selected active' : ''}`;
      if (state.targetId === 'boss' && state.boss.lockAt) {
        const lockAge = Date.now() - state.boss.lockAt;
        if (lockAge < 850) card.classList.add('lock-acquire');
        card.style.setProperty('--lock-delay', `-${lockAge}ms`);
      }
      if (state.targetId === 'boss' && state.boss.keyPulseAt && Date.now() - state.boss.keyPulseAt < 145) {
        const pulseAge = Date.now() - state.boss.keyPulseAt;
        card.classList.add('typing-recoil');
        card.style.setProperty('--pulse-delay', `-${pulseAge}ms`);
      }
      const bossInput = state.targetId === 'boss' ? `<div class="enemy-input-preview boss-input-preview"><small>現在のコマンド</small><b>${currentBossLine().text}</b><span>${romajiBase(currentBossLine().romaji)}</span></div>` : '';
      card.innerHTML = `<div class="enemy-icon boss-icon"><span>◉</span></div><span class="enemy-kind">HOSTILE CORE // P${state.boss.phase}</span><div class="enemy-name">ボットネット中枢</div><div class="enemy-hp"><i style="width:${Math.max(0, state.boss.hp / state.boss.maxHp * 100)}%"></i></div><div class="enemy-threat">攻撃まで ${Math.max(0, bossMissLimit() - state.boss.misses)}ミス</div>${bossInput}`;
      arena.prepend(card);
    }
  }
  function renderSkills() {
    const host = $('skill-buttons');
    host.replaceChildren();
    [...state.ownedSkills].forEach((id, index) => {
      const button = document.createElement('button');
      button.className = 'skill-button';
      button.disabled = state.skillUses <= 0 || (['BURST'].includes(id) && !currentTarget()) || (id === 'SCAN' && !(currentTarget() || state.boss));
      button.innerHTML = `<b>${id}<small> [${index + 1}]</small></b><span>${SKILLS[id].ja}</span>`;
      button.title = SKILLS[id].detail;
      button.addEventListener('click', () => useSkill(id));
      host.append(button);
    });
  }
  function renderTarget() {
    const enemy = currentTarget();
    if (state.boss && state.targetId === 'boss') {
      const line = currentBossLine();
      const nextLine = BOSS_LINES[state.boss.lineIndex + 1];
      $('target-name').textContent = 'ボットネット中枢 // CORE';
      $('target-reading').innerHTML = `<div class="word-queue"><div class="word-queue-card current"><small>INPUT NOW</small><b>${line.text}</b><span>${romajiBase(line.romaji)}</span></div><div class="word-queue-card next"><small>NEXT COMMAND</small><b>${nextLine?.text || 'これが最終コマンド'}</b><span>${nextLine ? romajiBase(nextLine.romaji) : 'CORE SHUTDOWN'}</span></div></div>`;
      $('typed-prefix').textContent = state.boss.typed;
      $('typed-rest').textContent = romajiBase(line.romaji).slice(state.boss.charProgress);
      pulseTypedCharacter(state.boss.lastKeyAt);
      $('target-hp').textContent = `CORE HP ${state.boss.hp}/${state.boss.maxHp}`;
      $('words-left').textContent = `コマンド ${String(state.boss.lineIndex + 1).padStart(2, '0')}/${BOSS_LINES.length} // ${Math.max(0, 5 - state.boss.charProgress % 5)}打で攻撃`;
      $('miss-left').textContent = Math.max(0, bossMissLimit() - state.boss.misses);
      return;
    }
    if (!enemy) {
      $('target-name').textContent = '防衛対象なし';
      $('target-reading').innerHTML = '<div class="word-queue"><div class="word-queue-card current"><small>INPUT NOW</small><b>待機中</b><span>次の侵入を待っています</span></div><div class="word-queue-card next"><small>NEXT</small><b>—</b><span>—</span></div></div>';
      $('typed-prefix').textContent = ''; $('typed-rest').textContent = '';
      $('target-hp').textContent = '—'; $('words-left').textContent = '— 語';
      $('miss-left').textContent = '—'; return;
    }
    const enemyIndex = state.entities.indexOf(enemy);
    const nextEnemy = state.entities[enemyIndex + 1];
    $('target-name').textContent = `迎撃中 // ${enemy.name}`;
    $('target-reading').innerHTML = `<div class="word-queue"><div class="word-queue-card current"><small>INPUT NOW</small><b>${enemy.word.text}</b><span>${displayRomaji(enemy.word)}</span></div><div class="word-queue-card next"><small>NEXT TARGET${nextEnemy ? ` // ${nextEnemy.name}` : ''}</small><b>${nextEnemy?.word.text || '待機中'}</b><span>${nextEnemy ? displayRomaji(nextEnemy.word) : '次の侵入を待っています'}</span></div></div>`;
    $('typed-prefix').textContent = enemy.typed;
    $('typed-rest').textContent = displayRomaji(enemy.word).slice(enemy.progress);
    pulseTypedCharacter(enemy.lastKeyAt);
    $('target-hp').textContent = `HP ${enemy.hp}/${enemy.maxHp}`;
    $('words-left').textContent = `${Math.ceil(enemy.hp / Math.max(1, state.attack))} 語`;
    $('miss-left').textContent = Math.max(0, effectiveMissLimit(enemy) - enemy.misses);
  }
  function pulseTypedCharacter(timestamp) {
    const progress = document.querySelector('.typing-progress');
    const consoleEl = $('typing-console');
    const arena = $('enemy-arena');
    if (!timestamp || Date.now() - timestamp > 170) {
      progress?.classList.remove('key-pulse');
      consoleEl.classList.remove('typing-keystroke');
      arena.classList.remove('letter-hit');
      return;
    }
    const age = Date.now() - timestamp;
    progress?.classList.remove('key-pulse');
    if (progress) {
      progress.style.setProperty('--pulse-delay', `-${age}ms`);
      void progress.offsetWidth;
      progress.classList.add('key-pulse');
    }
    consoleEl.classList.remove('typing-keystroke');
    consoleEl.style.setProperty('--pulse-delay', `-${age}ms`);
    void consoleEl.offsetWidth;
    consoleEl.classList.add('typing-keystroke');
    arena.classList.remove('letter-hit');
    arena.style.setProperty('--pulse-delay', `-${age}ms`);
    void arena.offsetWidth;
    arena.classList.add('letter-hit');
  }
  function renderBoss() {
    if (!state.boss) return;
    $('boss-fill').style.width = `${state.boss.hp / state.boss.maxHp * 100}%`;
    $('boss-hp-label').textContent = `${state.boss.hp} / ${state.boss.maxHp} CORE HP`;
    $('boss-phase').textContent = `PHASE 0${state.boss.phase}`;
    $('boss-warning').textContent = `反撃まで ${Math.max(0, bossMissLimit() - state.boss.misses)} ミス`;
  }
  function renderIntel() {
    $('combo-label').textContent = state.combo;
    $('combo-fill').style.width = `${Math.min(100, (state.combo % 3) / 3 * 100)}%`;
    $('bonus-label').textContent = state.bonusReady ? 'READY' : `${state.combo % 3} / 3`;
  }
  function bossMissLimit() { return state.boss.phase === 1 ? 3 : state.boss.phase === 2 ? 2 : 1; }
  function gainXP(amount) {
    state.xp += amount;
    while (state.xp >= state.xpNext && state.level < 10) {
      state.xp -= state.xpNext;
      state.level += 1;
      state.pendingLevels += 1;
      state.xpNext += 20;
    }
    if (state.level >= 10) state.xp = Math.min(state.xp, state.xpNext - 1);
  }
  function dealEnemyDamage(enemy, amount) {
    if (!state || !enemy) return;
    if (enemy.hp <= amount) spawnTargetBurst(enemy.id);
    enemy.hp -= amount;
    if (enemy.hp <= 0) removeEntity(enemy.id, true);
  }
  function dealBossDamage(amount) {
    if (!state?.boss) return;
    // The core can be weakened throughout the fight, but only the completed
    // final command can take its HP to zero.
    const remainingHp = state.boss.hp - amount;
    state.boss.hp = state.boss.scriptComplete ? Math.max(0, remainingHp) : Math.max(1, remainingHp);
    renderBoss();
    const bossPanel = $('boss-panel');
    bossPanel.classList.remove('boss-hit');
    void bossPanel.offsetWidth;
    bossPanel.classList.add('boss-hit');
    setTimeout(() => bossPanel.classList.remove('boss-hit'), 460);
    if (state.boss.hp <= 0) {
      spawnTargetBurst('boss');
      playSound('kill');
      const boss = state.boss;
      state.boss = null;
      $('boss-panel').classList.add('hidden');
      gainXP(100);
      finishBattle('boss');
      return;
    }
    const nextPhase = state.boss.hp <= state.boss.maxHp / 3 ? 3 : state.boss.hp <= state.boss.maxHp * 2 / 3 ? 2 : 1;
    if (nextPhase > state.boss.phase) enterBossPhase(nextPhase);
  }
  function enterBossPhase(phase) {
    state.boss.phase = phase;
    state.boss.misses = 0;
    $('boss-panel').classList.add('phase-flash');
    setTimeout(() => $('boss-panel').classList.remove('phase-flash'), 700);
    showNotice(phase === 2 ? 'PHASE 02 // 反撃間隔が短縮' : 'PHASE 03 // 過負荷連撃を開始');
  }
  function removeEntity(id, reward) {
    const enemy = state.entities.find((e) => e.id === id);
    if (!enemy) return;
    state.entities = state.entities.filter((e) => e.id !== id);
    if (reward) {
      playSound('kill');
      state.kills += 1;
      gainXP(20);
      $('enemy-arena').classList.add('success-flash');
      setTimeout(() => $('enemy-arena').classList.remove('success-flash'), 400);
    }
    if (state.targetId === id) {
      state.targetId = state.entities[0]?.id || (state.boss ? 'boss' : null);
      const nextTarget = state.entities[0];
      if (nextTarget) { nextTarget.lockAt = Date.now(); playSound('lock'); }
      else if (state.boss) state.boss.lockAt = Date.now();
      if (state.targetId) showNotice(`LOCK ON // ${nextTarget?.name || 'ボットネット中枢'}を捕捉`);
    }
    if (state.battleType !== 'boss' && state.entities.length === 0) finishBattle(state.battleType);
    else renderAll();
  }
  function takeDamage(amount, source, cause = '') {
    if (!state) return;
    if (state.guardNext) {
      playSound('skill');
      state.guardNext = false;
      showNotice(`SHIELD // ${source} を防いだ`);
      renderAll();
      return;
    }
    let remaining = amount;
    if (state.shield > 0 && remaining > 0) { state.shield -= 1; remaining -= 1; }
    state.hp = Math.max(0, state.hp - remaining);
    playSound('hit');
    state.totalAttacks += 1;
    $('screen-battle').classList.add('hurt');
    setTimeout(() => $('screen-battle').classList.remove('hurt'), 300);
    showNotice(`${source} // ${amount} ダメージ`);
    if (state.hp <= 0) { state.deathReason = cause || `${source}の攻撃でHPが0になった`; endRun(false); return; }
    renderAll();
  }
  function attackTarget(enemyOrBoss, amount) {
    if (enemyOrBoss === 'boss') dealBossDamage(amount);
    else dealEnemyDamage(enemyOrBoss, amount);
  }
  function completeWord(enemy) {
    state.wordsCompleted += 1;
    let damage = state.attack + (state.bonusReady ? 1 : 0);
    if (state.bonusReady) state.bonusReady = false;
    fireAtEnemy(enemy, damage); playSound('attack');
    dealEnemyDamage(enemy, damage);
    state.combo += 1;
    state.bestCombo = Math.max(state.bestCombo, state.combo);
    if (state.combo > 0 && state.combo % 3 === 0) state.bonusReady = true;
    if (state.entities.some((e) => e.id === enemy.id)) {
      const nextWord = randomWord();
      enemy.progress = 0; enemy.typed = ''; enemy.word = nextWord;
    }
  }
  function fireAtEnemy(enemy, amount) {
    enemy.hitAt = Date.now();
    enemy.lastHitDamage = amount;
  }
  function fireTypingShot(targetId) {
    const card = [...document.querySelectorAll('.enemy-card')].find((item) => item.dataset.enemyId === targetId);
    const consoleEl = $('typing-console');
    if (!card || !consoleEl) return;
    const from = consoleEl.getBoundingClientRect();
    const to = card.getBoundingClientRect();
    const sx = from.left + from.width / 2; const sy = from.top + 10;
    const tx = to.left + to.width / 2; const ty = to.top + to.height / 2;
    const bolt = document.createElement('i'); bolt.className = 'typing-bolt';
    bolt.style.left = `${sx}px`; bolt.style.top = `${sy}px`;
    bolt.style.width = `${Math.hypot(tx - sx, ty - sy)}px`;
    bolt.style.setProperty('--bolt-angle', `${Math.atan2(ty - sy, tx - sx)}rad`);
    document.body.append(bolt);
    setTimeout(() => bolt.remove(), 190);
    const spark = document.createElement('i'); spark.className = 'target-spark';
    spark.style.left = `${to.left + to.width * (0.25 + Math.random() * 0.5)}px`;
    spark.style.top = `${to.top + to.height * (0.22 + Math.random() * 0.52)}px`;
    document.body.append(spark); setTimeout(() => spark.remove(), 240);
  }
  function spawnTargetBurst(targetId) {
    const card = [...document.querySelectorAll('.enemy-card')].find((item) => item.dataset.enemyId === targetId);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const remains = card.cloneNode(true);
    remains.className = 'enemy-destruction-remains';
    remains.style.left = `${rect.left}px`; remains.style.top = `${rect.top}px`;
    remains.style.width = `${rect.width}px`; remains.style.height = `${rect.height}px`;
    document.body.append(remains); setTimeout(() => remains.remove(), 540);
    const burst = document.createElement('div'); burst.className = 'kill-burst';
    burst.style.left = `${rect.left + rect.width / 2}px`; burst.style.top = `${rect.top + rect.height / 2}px`;
    burst.innerHTML = '<i></i><i></i><i></i><b>DESTROYED</b>';
    document.body.append(burst); setTimeout(() => burst.remove(), 680);
  }
  function handleBossCorrectKey() {
    const boss = state.boss;
    const line = currentBossLine();
    state.correctKeys += 1;
    playSound('type');
    boss.typed += boss.lastKey;
    boss.charProgress += 1;
    if (boss.charProgress % 5 === 0) {
      const damage = state.attack + (state.bonusReady ? 1 : 0);
      if (state.bonusReady) state.bonusReady = false;
      dealBossDamage(damage);
      if (!state.boss) return;
      state.combo += 1;
      state.bestCombo = Math.max(state.bestCombo, state.combo);
      if (state.combo > 0 && state.combo % 3 === 0) state.bonusReady = true;
    }
    if (isCompleteRomaji(line, boss.typed)) {
      if (boss.lineIndex === BOSS_LINES.length - 1) {
        boss.scriptComplete = true;
        dealBossDamage(boss.hp);
        if (!state.boss) return;
      } else {
        boss.lineIndex += 1;
        boss.charProgress = 0;
        boss.typed = '';
        showNotice(`COMMAND ${String(boss.lineIndex + 1).padStart(2, '0')}/${BOSS_LINES.length} // 次の防衛コマンドへ`);
      }
      state.wordsCompleted += 1;
    }
    renderAll();
  }
  function mistype() {
    playSound('mistake');
    const battleScreen = $('screen-battle');
    battleScreen.classList.remove('mistyped');
    void battleScreen.offsetWidth;
    battleScreen.classList.add('mistyped');
    setTimeout(() => battleScreen.classList.remove('mistyped'), 260);
    state.mistakes += 1;
    const enemy = currentTarget();
    if (state.boss && state.targetId === 'boss') {
      state.boss.misses += 1;
      if (state.boss.misses >= bossMissLimit()) {
        state.boss.misses = 0;
        if (state.boss.stagger > 0) { state.boss.stagger -= 1; showNotice('SCAN // ボスの攻撃ターンを遅延'); }
        else takeDamage(state.boss.phase === 3 ? 3 : 2, state.boss.phase === 3 ? '過負荷連撃' : 'ボットネット中枢', `ボス戦でミスが上限に達し、${state.boss.phase === 3 ? '過負荷連撃' : '中枢の反撃'}を受けた`);
      }
    } else if (enemy) {
      enemy.misses += 1;
      const limit = effectiveMissLimit(enemy);
      if (enemy.misses >= limit) {
        enemy.misses = 0;
        if (enemy.stagger > 0) { enemy.stagger -= 1; showNotice('SCAN // 敵の攻撃ターンを遅延'); }
        else takeDamage(enemy.damage, enemy.name, `${enemy.name}へのミスが上限に達し、反撃を受けた`);
      }
    }
    state.combo = 0; state.bonusReady = false;
    renderAll();
  }
  function typeKey(key, code = '') {
    if (!state || $('screen-battle').classList.contains('hidden') || !$('start-intro').classList.contains('hidden') || !$('boss-intro').classList.contains('hidden') || !$('clear-intro').classList.contains('hidden')) return;
    // Japanese IMEs can report `Process` or a kana character in event.key.
    // Fall back to the physical key so romaji typing still works in that mode.
    const physicalKey = code.match(/^Key([A-Z])$/)?.[1]?.toLowerCase() || (code === 'Minus' ? '-' : '');
    const letter = /^[a-z-]$/i.test(key) ? key.toLowerCase() : physicalKey;
    if (!letter) return;
    const enemy = currentTarget();
    if (state.boss && state.targetId === 'boss') {
      const boss = state.boss;
      const expected = nextRomajiLetters(currentBossLine(), boss.typed);
      state.totalKeys += 1;
      if (expected.includes(letter)) { boss.lastKey = letter; boss.lastKeyAt = Date.now(); boss.keyPulseAt = boss.lastKeyAt; fireTypingShot('boss'); handleBossCorrectKey(); }
      else mistype();
      return;
    }
    if (!enemy) return;
    const expected = nextRomajiLetters(enemy.word, enemy.typed);
    state.totalKeys += 1;
    if (expected.includes(letter)) {
      playSound('type');
      enemy.lastKeyAt = Date.now();
      enemy.keyPulseAt = enemy.lastKeyAt;
      fireTypingShot(enemy.id);
      state.correctKeys += 1;
      enemy.progress += 1;
      enemy.typed += letter;
      if (isCompleteRomaji(enemy.word, enemy.typed)) completeWord(enemy);
      renderAll();
    } else mistype();
  }
  function useSkill(id) {
    if (!state || state.skillUses <= 0 || !state.ownedSkills.has(id)) return;
    const target = currentTarget();
    if (id === 'BURST' && !target && state.targetId !== 'boss') { showNotice('対象をロックオンしてください'); return; }
    if (id === 'SCAN' && !target && state.targetId !== 'boss') { showNotice('対象をロックオンしてください'); return; }
    state.skillUses -= 1;
    playSound('skill');
    if (id === 'SHIELD') { state.guardNext = true; showNotice('SHIELD // 次の攻撃を防御'); }
    if (id === 'SCAN') {
      if (state.targetId === 'boss' && state.boss) state.boss.stagger += 1;
      else if (target) target.stagger += 1;
      showNotice('SCAN // 対象を硬直させた');
    }
    if (id === 'BURST') attackTarget(state.targetId === 'boss' ? 'boss' : target, state.attack * 2);
    if (id === 'WIPE') {
      [...state.entities].forEach((enemy) => dealEnemyDamage(enemy, state.attack));
      if (state.boss) dealBossDamage(state.attack);
      showNotice('WIPE // 画面内の敵を攻撃');
    }
    renderAll();
  }
  function showNotice(message) {
    const node = $('notice');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => node.classList.remove('show'), 1800);
  }
  function finishBattle(type) {
    if (!state) return;
    showClearIntro(type, () => {
      if (!state) return;
      if (type === 'boss') {
        processAfterBattle(() => endRun(true));
        return;
      }
      const wasDanger = type === 'elite';
      processAfterBattle(() => {
        if (wasDanger) showUpgradePick(true);
        else {
          state.pendingMain = state.mainIndex + 1;
          showRoutes();
        }
      });
    });
  }
  function showClearIntro(type, callback) {
    const details = type === 'boss'
      ? { kicker: 'CORE SHUTDOWN', title: 'ボットネット停止成功', copy: '全防衛コマンド完了。侵入元の中枢を停止しました。' }
      : type === 'elite'
        ? { kicker: 'HIGH RISK CLEARED', title: '危険ノード突破', copy: '強敵の排除に成功。追加強化を獲得しました。' }
        : { kicker: `NODE 0${state.mainIndex + 1} CLEARED`, title: 'ノード制圧成功', copy: 'このエリアの敵をすべて排除しました。防衛記録を更新しました。' };
    $('clear-intro-kicker').textContent = details.kicker;
    $('clear-intro-title').textContent = details.title;
    $('clear-intro-copy').textContent = details.copy;
    playSound('clear');
    clearIntroCallback = callback;
    const intro = $('clear-intro');
    intro.classList.remove('hidden');
    intro.setAttribute('aria-hidden', 'false');
    $('clear-intro-next').focus({ preventScroll: true });
  }
  function dismissClearIntro() {
    const intro = $('clear-intro');
    intro.classList.add('hidden');
    intro.setAttribute('aria-hidden', 'true');
    const callback = clearIntroCallback;
    clearIntroCallback = null;
    callback?.();
  }
  function processAfterBattle(callback) {
    state.afterLevelUps = callback;
    if (state.pendingLevels > 0) showLevelPick();
    else { const next = state.afterLevelUps; state.afterLevelUps = null; next(); }
  }
  function showLevelPick() {
    $('pick-title').textContent = `LEVEL UP // LV ${state.level}`;
    $('pick-subtitle').textContent = `レベルアップ強化を選択（残り ${state.pendingLevels} 回）`;
    const options = [
      { id: 'hp', title: '最大HP +2', detail: '最大HPを増やし、HPも2回復。' },
      { id: 'attack', title: '攻撃力 +1', detail: '単語攻撃とボス攻撃のダメージ上昇。' },
      { id: 'shield', title: 'シールド +3', detail: 'シールドを3獲得（上限5）。' },
    ];
    showPickOptions(options, () => {
      state.pendingLevels -= 1;
      if (state.pendingLevels > 0) showLevelPick();
      else { renderAll(); const next = state.afterLevelUps; state.afterLevelUps = null; next(); }
    });
  }
  function availableUpgradeOptions() {
    const options = [
      { id: 'hp', title: '最大HP +2', detail: '最大HPを増やし、HPも2回復。', icon: '＋' },
      { id: 'attack', title: '攻撃力 +1', detail: '単語攻撃とボス攻撃の威力を上げる。', icon: '⚡' },
      { id: 'shield', title: 'シールド +3', detail: 'シールドを3獲得（上限5）。', icon: '⬡' },
    ];
    const unowned = Object.keys(SKILLS).filter((id) => !state.ownedSkills.has(id));
    if (unowned.length) {
      const skill = unowned[Math.floor(Math.random() * unowned.length)];
      options.push({ id: 'skill', skill, title: `${skill}を習得`, detail: SKILLS[skill].detail, icon: '⌘' });
    }
    return shuffle(options).slice(0, 3);
  }
  function showUpgradePick(extra) {
    $('pick-title').textContent = extra ? 'DANGER CLEAR // BONUS UPGRADE' : 'SYSTEM UPGRADE';
    $('pick-subtitle').textContent = extra ? '危険ノード突破報酬。追加強化を選択。' : 'ノード報酬を選択。';
    showPickOptions(availableUpgradeOptions(), () => {
      if (extra) continueMain(state.pendingMain);
      else continueMain(state.pendingMain);
    });
  }
  function showPickOptions(options, onChoose) {
    const host = $('pick-grid'); host.replaceChildren();
    options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'choice-card';
      button.innerHTML = `<div class="choice-icon">${option.icon || '▣'}</div><b>${option.title}</b><span>${option.detail}</span><small>SELECT MODULE →</small>`;
      button.addEventListener('click', () => { applyUpgrade(option); onChoose(); });
      host.append(button);
    });
    showScreen('pick');
  }
  function applyUpgrade(option) {
    if (option.id === 'hp') { state.maxHp += 2; state.hp = Math.min(state.maxHp, state.hp + 2); }
    if (option.id === 'attack') state.attack += 1;
    if (option.id === 'shield') state.shield = Math.min(5, state.shield + 3);
    if (option.id === 'skill') { state.ownedSkills.add(option.skill); showNotice(`${option.skill} // MODULE INSTALLED`); }
    renderAll();
  }
  function showRoutes() {
    $('choice-title').textContent = '次の行き先を選択';
    $('choice-subtitle').textContent = state.pendingMain === 2 ? 'ボットネット中枢へ向かう前に、準備か危険な追加戦を選ぶ。' : '補給するか、強化するか、危険なルートに挑む。';
    const options = [
      { id: 'supply', title: '補給ノード', icon: '＋', detail: `HPを4回復。現在 ${state.hp}/${state.maxHp}`, disabled: state.hp >= state.maxHp },
      { id: 'upgrade', title: '強化ノード', icon: '⌘', detail: '3つの強化候補から1つ選ぶ。' },
      { id: 'danger', title: '危険ノード', icon: '⚠', detail: '強敵との追加戦。勝利すると追加強化。' },
    ];
    const host = $('choice-grid'); host.replaceChildren();
    options.forEach((option) => {
      const button = document.createElement('button');
      button.className = 'choice-card'; button.disabled = !!option.disabled;
      button.innerHTML = `<div class="choice-icon">${option.icon}</div><b>${option.title}</b><span>${option.detail}</span><small>${option.id === 'danger' ? 'HIGH RISK / BONUS REWARD' : 'SELECT ROUTE →'}</small>`;
      button.addEventListener('click', () => {
        if (option.id === 'supply') { state.hp = Math.min(state.maxHp, state.hp + 4); continueMain(state.pendingMain); }
        if (option.id === 'upgrade') showUpgradePick(false);
        if (option.id === 'danger') startDangerBattle();
      });
      host.append(button);
    });
    showScreen('choice');
  }
  function continueMain(index) {
    if (index === 2) startMainBattle(2);
    else startMainBattle(index);
  }
  function endRun(won) {
    if (!state) return;
    clearInterval(timerHandle);
    stopMusic();
    if (!won) {
      $('screen-result').classList.add('failed');
      $('screen-result').classList.remove('failure-entry');
      void $('screen-result').offsetWidth;
      $('screen-result').classList.add('failure-entry');
      document.body.classList.add('run-failed');
      document.body.classList.add('failure-impact');
      setTimeout(() => document.body.classList.remove('failure-impact'), 900);
      playSound('defeat');
    }
    showScreen('result');
    $('result-tag').textContent = won ? '// INCIDENT CONTAINED' : '// CRITICAL FAILURE // CORE BREACHED';
    $('result-title').textContent = won ? 'サーバー防衛成功' : '防衛システム、崩壊';
    $('result-copy').textContent = won ? 'ボットネット中枢を停止。システムは安全な状態に復旧しました。' : `防衛システムが停止しました。敗因: ${state.deathReason || '敵の攻撃でHPが0になった'}。`;
    const elapsedMin = Math.max(state.activeSeconds / 60, 1 / 60);
    const speed = Math.round(state.correctKeys / elapsedMin);
    const stats = [
      ['RESULT', won ? 'CLEAR' : 'FAILED'], ['到達レベル', `LV ${state.level}`], ['敵撃破', `${state.kills}`],
      ['正確率', `${accuracy()}%`], ['最高コンボ', `${state.bestCombo}`], ['危険ルート', `${state.dangerCount}`],
      ['入力速度', `${speed} キー/分`], ['入力ミス', `${state.mistakes}`], ['プレイ時間', `${Math.floor((Date.now() - state.runStart) / 60000)}分 ${Math.floor(((Date.now() - state.runStart) / 1000) % 60)}秒`],
    ];
    $('result-stats').innerHTML = stats.map(([label, value]) => `<div class="result-stat"><span>${label}</span><b>${value}</b></div>`).join('');
  }
  function confirmQuit() {
    if (state && window.confirm('防衛を中断してタイトルに戻りますか？')) {
      clearInterval(timerHandle); stopMusic(); state = null; selectedStarter = null; startMenu(); showScreen('start');
      homeMusicStarted = false; if (soundEnabled) { startMusic('home'); homeMusicStarted = true; }
    }
  }
  document.addEventListener('keydown', (event) => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
    if (!$('start-intro').classList.contains('hidden') || !$('boss-intro').classList.contains('hidden') || !$('clear-intro').classList.contains('hidden')) return;
    if (!$('screen-battle').classList.contains('hidden') && /^[1-4]$/.test(event.key)) {
      const id = [...(state?.ownedSkills || [])][Number(event.key) - 1];
      if (id) useSkill(id);
      return;
    }
    typeKey(event.key, event.code);
  });
  $('start-run').addEventListener('click', showStartIntro);
  $('start-intro-go').addEventListener('click', dismissStartIntro);
  $('audio-settings-toggle').addEventListener('click', () => {
    const panel = $('audio-panel');
    const open = panel.classList.toggle('hidden') === false;
    $('audio-settings-toggle').setAttribute('aria-expanded', String(open));
  });
  $('music-volume').addEventListener('input', (event) => {
    musicVolume = Number(event.target.value) / 100;
    if (musicGain && audioContext) musicGain.gain.setTargetAtTime(musicVolume, audioContext.currentTime, 0.025);
    savePreference('server-defense-music-volume', musicVolume);
    renderAudioSettings();
  });
  $('sfx-volume').addEventListener('input', (event) => {
    sfxVolume = Number(event.target.value) / 100;
    if (sfxGain && audioContext) sfxGain.gain.setTargetAtTime(sfxVolume, audioContext.currentTime, 0.025);
    savePreference('server-defense-sfx-volume', sfxVolume);
    renderAudioSettings();
  });
  $('sound-toggle').addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    savePreference('server-defense-audio-enabled', soundEnabled);
    renderSoundToggle();
    if (!soundEnabled) {
      stopMusic();
      if (masterGain && audioContext) masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.025);
    } else {
      initAudio();
      if (masterGain) masterGain.gain.setTargetAtTime(0.75, audioContext.currentTime, 0.025);
      playTone(740, 0.09, 'triangle', 0.025);
      if (state && !$('screen-battle').classList.contains('hidden') && $('boss-intro').classList.contains('hidden') && $('clear-intro').classList.contains('hidden')) {
        startMusic(state.battleType === 'boss' ? 'boss' : 'combat');
      } else if (!state && !$('screen-start').classList.contains('hidden') && $('start-intro').classList.contains('hidden')) { startMusic('home'); homeMusicStarted = true; }
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest?.('.audio-controls')) return;
    $('audio-panel').classList.add('hidden');
    $('audio-settings-toggle').setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('pointerdown', (event) => {
    if (event.target.closest?.('#sound-toggle') || state || $('screen-start').classList.contains('hidden') || homeMusicStarted || !soundEnabled) return;
    initAudio(); startMusic('home'); homeMusicStarted = true;
  });
  $('boss-intro-start').addEventListener('click', dismissBossIntro);
  $('clear-intro-next').addEventListener('click', dismissClearIntro);
  $('restart-run').addEventListener('click', () => {
    selectedStarter = null;
    $('screen-result').classList.remove('failed');
    document.body.classList.remove('run-failed');
    state = null; startMenu(); showScreen('start');
    homeMusicStarted = false; if (soundEnabled) { startMusic('home'); homeMusicStarted = true; }
  });
  $('quit-run').addEventListener('click', confirmQuit);
  document.addEventListener('pointerover', (event) => {
    const button = event.target.closest?.('button');
    const previous = event.relatedTarget instanceof Element ? event.relatedTarget.closest('button') : null;
    if (button && !button.disabled && button !== previous) playSound('hover');
  });
  renderSoundToggle();
  renderAudioSettings();
  startMenu();
})();
