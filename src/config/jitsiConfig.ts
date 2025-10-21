const baseConfigOverwrite = {
  appName: 'Mindloom',
  disableAudioLevels: false, // Можно включить или выключить
  constraints: {
    video: {
      height: { ideal: 720, max: 1080, min: 240 },
      width: { ideal: 1280, max: 1920, min: 320 },
      frameRate: { ideal: 30, max: 30 },
    },
    audio: true,
  },
  startWithAudioMuted: true,
  startWithVideoMuted: true,
  resolution: 720,
  disableSimulcast: false, // Для H264 лучше отключить
  videoQuality: {
    codecPreferenceOrder: ['H264'],
    minHeightForQualityLvl: {
      360: 'standard',
      720: 'high',
    },
    h264: {
      // maxBitratesVideo: {
      //   low: 80000, // 80 Kbps - очень низкое качество
      //   standard: 200000, // 200 Kbps
      //   high: 400000, // 400 Kbps максимум
      //   fullHd: 600000, // убрано высокое качество
      // },
      maxBitratesVideo: {
        low: 200000,
        standard: 500000,
        high: 1500000,
        fullHd: 3000000,
        ultraHd: 6000000,
        ssHigh: 2500000,
      },
      scalabilityModeEnabled: false, // для яндекса без ошибок
      useSimulcast: false, // Отключаем симулькаст для H.264 (нестабильно в Safari)
    },
  },
  disableChat: true,
  disableTileView: false, // разрешаем переключение
  defaultTileView: false,
  startWithTileView: false,
  tileView: { disabled: false, numberOfVisibleTiles: 6 },
  enableWelcomePage: false,
  prejoinPageEnabled: false,
  maxFullResolutionParticipants: -1, // Показывает всех в HD без ограничения
  disableDeepLinking: true, // Убираем все брендинги Jitsi

  // Отключить приветственную страницу
  welcomePage: {
    disabled: true, // Отключает welcome page полностью
  },
  enableClosePage: false, // Отключить страницу закрытия после завершения звонка
  // отключить уведомления о присоединении/покидании
  // (если они мешают)
  disabledNotifications: [
    'notify.connectedOneMember',
    'notify.connectedTwoMembers',
    'notify.connectedThreePlusMembers',
    'notify.leftOneMember',
    'notify.leftTwoMembers',
    'notify.leftThreePlusMembers',
    // Добавляем отключение благодарственных уведомлений
    'dialog.thankYou',
    'notify.thankYou',
    'feedback.thankYou',
  ],
  // Отключить автоматическую форму обратной связи
  feedbackPercentage: 0,

  disabledSounds: ['RECORDING_ON_SOUND', 'RECORDING_OFF_SOUND'],

  // Полностью отключить filmstrip
  disable1On1Mode: false, // Отключить скрытие в режиме 1-на-1
  // НАСТРОЙКА FILMSTRIP
  filmstrip: {
    // disabled: true, // Отключает filmstrip полностью
    // disableResizable: true, // Отключает возможность изменения размера
    // disableStageFilmstrip: true, // Отключает stage filmstrip
    // disableTopPanel: true, // Отключает верхнюю панель
  },

  hideParticipantsStats: true, // скрыть количество участников

  disableSelfViewSettings: true, // Скрыть настройки self-view из UI
};

const baseInterfaceConfigOverwrite = {
  // TOOLBAR_BUTTONS: ['tileview'],
  TOOLBAR_BUTTONS: [],

  SHOW_JITSI_WATERMARK: true, // отключить брендинг Jitsi
  SHOW_BRAND_WATERMARK: false,

  SHOW_POWERED_BY: false,
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  VIDEO_LAYOUT_FIT: 'both',
  TOOLBAR_ALWAYS_VISIBLE: true, // Панель управления всегда видна
  TOOLBAR_TIMEOUT: 0,
};

// Функция для получения конфигурации на основе типа сессии
export const getJitsiConfig = (isGroupSession: boolean) => {
  const configOverwrite = {
    ...baseConfigOverwrite,
    // Для одиночных сессий - отключаем tile view полностью
    disableTileView: !isGroupSession, // true для одиночных, false для групповых
    defaultTileView: false,
    startWithTileView: false,
    tileView: {
      disabled: !isGroupSession, // отключено для одиночных сессий
      numberOfVisibleTiles: isGroupSession ? 6 : 2, // максимум 2 для одиночных
    },
    // Настройки filmstrip для разных типов сессий
    filmstrip: {
      disabled: !isGroupSession, // полностью отключаем для одиночных сессий
      disableResizable: !isGroupSession, // запрещаем изменение размера для одиночных
      disableStageFilmstrip: !isGroupSession, // отключаем stage filmstrip для одиночных
    },

    hideDisplayName: !isGroupSession,

    // сервил аватарок можно подкл с тем же email что и на mindloom
    gravatar: {
      disabled: true,
    },
  };

  const interfaceConfigOverwrite = {
    ...baseInterfaceConfigOverwrite,
    // Toolbar buttons: для групповых - включаем tileview, для одиночных - убираем
    TOOLBAR_BUTTONS: [],
  };

  return { configOverwrite, interfaceConfigOverwrite };
};

// Для обратной совместимости - экспортируем дефолтные конфиги
export const configOverwrite = baseConfigOverwrite;
export const interfaceConfigOverwrite = baseInterfaceConfigOverwrite;
