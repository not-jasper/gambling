document.addEventListener("DOMContentLoaded", () => { const symbols = [ { emoji: '🦄', percent: 8 }, { emoji: '🐸', percent: 20 }, { emoji: '🧃', percent: 20 }, { emoji: '🍕', percent: 20 }, { emoji: '🍩', percent: 20 }, { emoji: '🐙', percent: 20 }, { emoji: '🧠', percent: 20 }, { emoji: '🎮', percent: 20 }, { emoji: '📦', percent: 20 }, { emoji: '📀', percent: 20 }, { emoji: '📼', percent: 20 }, { emoji: '🧸', percent: 20 }, { emoji: '🍉', percent: 20 }, { emoji: '🛸', percent: 20 }, { emoji: '👾', percent: 20 }, { emoji: '🎲', percent: 20 }, { emoji: '📍', percent: 20 }, { emoji: '📚', percent: 20 }, { emoji: '🌮', percent: 20 }, { emoji: '🌌', percent: 20 }, { emoji: '🐧', percent: 20 }, { emoji: '🍦', percent: 20 }, { emoji: '🍔', percent: 20 }, { emoji: '🎉', percent: 20 }, { emoji: '🚀', percent: 20 }, { emoji: '🐍', percent: 20 } ];

const getRandomSymbol = () => { const total = symbols.reduce((sum, s) => sum + s.percent, 0); let rand = Math.random() * total; for (const s of symbols) { if (rand < s.percent) return s.emoji; rand -= s.percent; } };

const slotEls = [...document.querySelectorAll('.slot')]; const message = document.getElementById('message'); const achievementsPanel = document.getElementById('achievements-panel'); const achievementsButton = document.getElementById('achievements-button'); let spinning = false;

const achievements = { firstSpin: { unlocked: false, name: 'First Spin!' }, allDifferent: { unlocked: false, name: 'Try Again!' }, tripleSame: { unlocked: false, name: 'Jackpot!' }, tripleUnicorn: { unlocked: false, name: 'Mythical Spin!' } };

const unlockAchievement = key => { if (!achievements[key].unlocked) { achievements[key].unlocked = true; localStorage.setItem('achievements', JSON.stringify(achievements)); const note = document.createElement('div'); note.className = 'achievement-toast'; note.textContent = Achievement Unlocked: ${achievements[key].name}; document.body.appendChild(note); setTimeout(() => note.remove(), 4000); updateAchievementsDisplay(); } };

const updateAchievementsDisplay = () => { achievementsPanel.innerHTML = ''; for (const key in achievements) { const item = document.createElement('div'); item.className = 'achievement'; item.textContent = achievements[key].name; if (!achievements[key].unlocked) item.classList.add('locked'); achievementsPanel.appendChild(item); } };

const startSpin = () => { if (spinning) return; spinning = true; message.style.opacity = 0; slotEls.forEach(el => { el.classList.remove('match', 'no-match'); el.style.borderColor = 'white'; });

const results = [];
const delays = [0, 200, 400];

slotEls.forEach((el, i) => {
  setTimeout(() => {
    const interval = setInterval(() => {
      el.textContent = getRandomSymbol();
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
      const result = getRandomSymbol();
      el.textContent = result;
      results.push(result);
      if (results.length === 3) handleResult(results);
    }, 1000 + i * 300);
  }, delays[i]);
});

};

const handleResult = results => { const [a, b, c] = results; if (results.every(r => r === a)) { unlockAchievement('tripleSame'); if (a === '🦄') { unlockAchievement('tripleUnicorn'); document.body.classList.add('rainbow'); } flashSlots('gold'); emojiRain(a); } else { flashSlots('red'); unlockAchievement('allDifferent'); }

unlockAchievement('firstSpin');

setTimeout(() => {
  document.body.classList.remove('rainbow');
  spinning = false;
  message.style.opacity = 1;
}, 5000);

};

const flashSlots = color => { slotEls.forEach(el => { el.style.borderColor = color; el.classList.add(color === 'gold' ? 'match' : 'no-match'); }); };

const emojiRain = emoji => { for (let i = 0; i < 100; i++) { const drop = document.createElement('div'); drop.className = 'emoji-drop'; drop.textContent = emoji; drop.style.left = ${Math.random() * 100}%; drop.style.animationDelay = ${Math.random()}s; document.body.appendChild(drop); setTimeout(() => drop.remove(), 6000); } };

document.body.addEventListener('click', startSpin); achievementsButton.addEventListener('click', () => { achievementsPanel.classList.toggle('show'); });

const saved = localStorage.getItem('achievements'); if (saved) Object.assign(achievements, JSON.parse(saved)); updateAchievementsDisplay(); });

