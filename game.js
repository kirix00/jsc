const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const gameTextElement = document.getElementById('game-text');
const choicesButtons = document.querySelectorAll('.choice-buttons button');

// 物語と画像のパスを定義
const story = {
  start: {
    text: '東京ミスティック・ストーン',
    background: '/imgs/text_title.jpg', // 背景画像のパス
    choices: [
      // { text: '左に行く', nextKey: 'next001' },
      { text: '次へ', nextKey: 'nexts1' }
    ]
  },
  nexts1: {
    text: '第1章：偶然の出会い',
    background: '/imgs/text001.jpg', // 背景画像のパス
    choices: [
      // { text: '左に行く', nextKey: 'next001' },
      { text: '次へ', nextKey: 'next001' }
    ]
  },
  next001: {
    text: '東京の繁華街を歩いていた三十代独身OLの主人公、麻美。',
    choices: [
      { text: '次へ', nextKey: 'next002' }
      // { text: '戻る', nextKey: 'start' }
    ],
    audio: '/voice/text001.mp3',
  },
  next002: {
    text: '高層ビルがひしめき合う中、彼女の目に留まったのは、',
    choices: [
      { text: '進む', nextKey: 'next002_1' }
      // { text: '戻る', nextKey: 'start' }
    ],
    audio: '/voice/text002.mp3',
  },
  next002_1: {
    text: 'アスファルトの隙間に落ちている一つの不思議な形をした石だった。',
    background: '/imgs/text005.jpg',
    choices: [
      { text: '進む', nextKey: 'next003' }
      // { text: '戻る', nextKey: 'start' }
    ],
    audio: '/voice/text003.mp3',
  },
  next003: {
    text: '普段なら気にも留めない小さな石だが、今日はなぜかその石が麻美の足を止めさせた。',
    choices: [
      { text: '進む', nextKey: 'next004' }
      // { text: '戻る', nextKey: 'start' }
    ],
    audio: '/voice/text004.mp3',
  },
  next004: {
    text: '手に取ると、その温かみとピッタリと手に馴染む感覚に、ふと心が和む。',
    choices: [
      { text: '次へ', nextKey: 'next005' },
      // { text: '石をポケットに入れて持ち帰る', nextKey: 's001_2' }
    ],
    audio: '/voice/text005.mp3',
  },
  next005: {
    text: '麻美はどうする？',
    choices: [
      { text: '石をその場に戻す', nextKey: 's01_01' },
      { text: '石をポケットに入れて持ち帰る', nextKey: 's01_02' }
    ]
  },
  s01_02: {
    text: '麻美はほんの一瞬躊躇ったが、その石をポケットに滑り込ませた。',
    choices: [
      { text: '次へ', nextKey: 's01_02_01' },
      // { text: '石をポケットに入れて持ち帰る', nextKey: 's001_2' }
    ],
    audio: '/voice/text006.mp3',
  },
  s01_02_01: {
    text: '家に帰ると、その石をデスクの上に置いた。',
    background: '/imgs/text006.jpg',
    choices: [
      { text: '次へ', nextKey: 's01-02-01' },
      // { text: '石をポケットに入れて持ち帰る', nextKey: 's001_2' }
      
    ],
    audio: '/voice/text007.mp3',
  },
};

let currentState = 'start';

function drawBackground(imagePath) {
  const image = new Image();
  image.onload = () => {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
  image.src = imagePath;
}

function renderStory() {
  const state = story[currentState];
  
  // テキストと背景を更新
  drawBackground(state.background);
  gameTextElement.textContent = state.text;

  // オーディオを再生
  playAudio(state.audio);

  // 選択肢のボタンを更新
  choicesButtons.forEach((button, index) => {
    if (state.choices[index]) {
      button.textContent = state.choices[index].text;
      button.style.display = 'block';
      button.onclick = () => makeChoice(state.choices[index].nextKey);
    } else {
      button.style.display = 'none';
    }
  });
}

function playAudio(audioPath) {
  if (audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
  }
}


function makeChoice(nextState) {
  currentState = nextState;
  renderStory();
}

// ゲームを初期化して最初のシーンをレンダリング
renderStory();

