(function() {
  'use strict';

  const ICONS = {
    moon: '\u{1F319}',
    sun: '\u{2600}\u{FE0F}',
    car: '\u{1F697}',
    bolt: '\u{26A1}',
    check: '\u{2713}'
  };

  let currentCard = 0;
  let totalCards = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  let isHorizontal = null;

  function init() {
    document.getElementById('start-btn').addEventListener('click', showTimeline);
    document.getElementById('restart-btn').addEventListener('click', showLanding);
    document.getElementById('btn-prev').addEventListener('click', goPrev);
    document.getElementById('btn-next').addEventListener('click', goNext);
    renderCards();
    totalCards = STORY_DATA.length + 1;
    setupSwipe();
    setupKeyboard();
  }

  function showLanding() {
    switchPage('landing');
  }

  function showTimeline() {
    switchPage('timeline');
    currentCard = 0;
    updateTimeline();
    animateCard(0);
  }

  function switchPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  }

  function goPrev() {
    if (currentCard > 0) {
      currentCard--;
      updateTimeline();
      animateCard(currentCard);
    }
  }

  function goNext() {
    if (currentCard < totalCards - 1) {
      currentCard++;
      updateTimeline();
      animateCard(currentCard);
    }
  }

  function renderCards() {
    const container = document.getElementById('cards-container');
    const dots = document.getElementById('dot-indicators');

    STORY_DATA.forEach((item, index) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'card-wrapper';
      wrapper.setAttribute('data-index', index);
      wrapper.innerHTML = renderCardContent(item);
      container.appendChild(wrapper);

      const dot = document.createElement('div');
      dot.className = 'dot' + (index === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        currentCard = index;
        updateTimeline();
        animateCard(currentCard);
      });
      dots.appendChild(dot);
    });

    // End card
    const endWrapper = document.createElement('div');
    endWrapper.className = 'card-wrapper';
    endWrapper.setAttribute('data-index', STORY_DATA.length);
    endWrapper.innerHTML = `
      <div class="card end-card">
        <p class="end-title">30天体验结束</p>
        <p class="end-subtitle">这就是 Lumen 和你建立信任的过程</p>
        <button class="cta-button" id="btn-roadmap">
          查看落地路径 <span class="btn-arrow">&rarr;</span>
        </button>
      </div>
    `;
    container.appendChild(endWrapper);

    const endDot = document.createElement('div');
    endDot.className = 'dot';
    endDot.addEventListener('click', () => {
      currentCard = STORY_DATA.length;
      updateTimeline();
      animateCard(currentCard);
    });
    dots.appendChild(endDot);

    // Defer event binding for dynamically created button
    setTimeout(() => {
      document.getElementById('btn-roadmap').addEventListener('click', () => {
        switchPage('roadmap');
      });
    }, 0);
  }

  function renderCardContent(item) {
    switch(item.type) {
      case 'notification': return renderNotification(item);
      case 'insight': return renderInsight(item);
      case 'suggestion': return renderSuggestion(item);
      case 'proactive': return renderProactive(item);
      case 'report': return renderReport(item);
      case 'alert': return renderAlert(item);
      case 'conversation': return renderConversation(item);
      case 'letter': return renderLetter(item);
      default: return '';
    }
  }

  function renderNotification(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信服务号消息</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="card-content">
          ${item.content.map(p => `<p>${p}</p>`).join('')}
        </div>
      </div>
    `;
  }

  function renderInsight(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信服务号消息</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="card-content">
          ${item.content.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="insight-list">
          ${item.insights.map(i => `
            <div class="insight-item">
              <div class="insight-icon">${ICONS[i.icon] || ''}</div>
              <div class="insight-text">${i.text}</div>
            </div>
          `).join('')}
        </div>
        <div class="card-footer">${item.footer}</div>
      </div>
    `;
  }

  function renderSuggestion(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信服务号消息</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="card-content">
          ${item.content.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="suggestion-box">
          <div class="suggestion-question">${item.suggestion.text}</div>
          <div class="suggestion-options">
            ${item.suggestion.options.map((opt, i) => `
              <div class="suggestion-option ${i === 0 ? 'primary' : 'secondary'}">${opt}</div>
            `).join('')}
          </div>
        </div>
        <div class="savings-tag">${item.savings}</div>
      </div>
    `;
  }

  function renderProactive(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信服务号消息</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="card-content">
          ${item.content.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="action-list">
          ${item.actions.map(a => `
            <div class="action-item">
              <div class="action-status">${ICONS.check}</div>
              <div class="action-text">${a.text}</div>
            </div>
          `).join('')}
        </div>
        <div class="card-footer">${item.footer}</div>
      </div>
    `;
  }

  function renderReport(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信服务号消息</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="card-content">
          ${item.content.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="report-box">
          <div class="report-row">
            <div class="report-label">情况</div>
            <div class="report-value">${item.report.situation}</div>
          </div>
          <div class="report-row">
            <div class="report-label">我的操作</div>
            <div class="report-value">${item.report.action}</div>
          </div>
          <div class="report-row">
            <div class="report-label">如果不这样做</div>
            <div class="report-value">${item.report.result}</div>
          </div>
          <div class="report-row">
            <div class="report-label">净省</div>
            <div class="report-value report-net">${item.report.net}</div>
          </div>
        </div>
        <div class="card-footer">${item.footer}</div>
      </div>
    `;
  }

  function renderAlert(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信服务号消息</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="card-content">
          ${item.content.map(p => `<p>${p}</p>`).join('')}
        </div>
        <div class="alert-box">
          <div class="alert-finding">${item.alert.finding}</div>
          <ul class="alert-analysis">
            ${item.alert.analysis.map(a => `<li>${a}</li>`).join('')}
          </ul>
          <div class="alert-urgency">${item.alert.urgency}</div>
          <div class="alert-suggestion">${item.alert.suggestion}</div>
        </div>
        <div class="alert-impact">${item.impact}</div>
      </div>
    `;
  }

  function renderConversation(item) {
    return `
      <div class="card">
        <div class="wechat-context">
          <span class="wechat-label">微信对话</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="conversation">
          ${item.messages.map(m => `
            <div class="msg ${m.role === 'user' ? 'user' : 'lumen'}">
              <div class="msg-bubble">${m.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderLetter(item) {
    return `
      <div class="card letter">
        <div class="wechat-context">
          <span class="wechat-label">H5 页面（从消息点入）</span>
        </div>
        <div class="card-badge">${item.badge}</div>
        <div class="card-time">Day ${item.day} &middot; ${item.time}</div>
        <div class="letter-greeting">${item.greeting}</div>
        ${item.paragraphs.map(p => `
          <div class="letter-paragraph ${p.highlight ? 'highlight' : ''} ${p.action ? 'action' : ''}">${p.text}</div>
        `).join('')}
        <div class="letter-summary">
          <div class="summary-item">
            <span class="summary-value">${item.summary.saved}</span>
            <span class="summary-label">本月节省</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">${item.summary.selfSufficiency}</span>
            <span class="summary-label">能源自给率</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">${item.summary.roiProgress}</span>
            <span class="summary-label">回本进度</span>
          </div>
          <div class="summary-item">
            <span class="summary-value">${item.summary.healthScore}</span>
            <span class="summary-label">系统健康</span>
          </div>
        </div>
        <div class="letter-signature">${item.signature}</div>
      </div>
    `;
  }

  function setupSwipe() {
    const container = document.getElementById('cards-container');

    // Touch events
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      isHorizontal = null;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      // Determine direction on first significant move
      if (isHorizontal === null && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
        isHorizontal = Math.abs(dx) > Math.abs(dy);
      }
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      if (!isHorizontal) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (diff > 60) goNext();
      else if (diff < -60) goPrev();
    });

    // Mouse drag for desktop
    let mouseStartX = 0;
    container.addEventListener('mousedown', (e) => {
      mouseStartX = e.clientX;
      isDragging = true;
    });
    document.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = mouseStartX - e.clientX;
      if (diff > 60) goNext();
      else if (diff < -60) goPrev();
    });
  }

  function setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('timeline').classList.contains('active')) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    });
  }

  function updateTimeline() {
    const progress = ((currentCard + 1) / totalCards) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';

    if (currentCard < STORY_DATA.length) {
      const item = STORY_DATA[currentCard];
      document.getElementById('nav-day').textContent = 'Day ' + item.day;
      document.getElementById('nav-title').textContent = item.title;
    } else {
      document.getElementById('nav-day').textContent = '';
      document.getElementById('nav-title').textContent = '体验完成';
    }

    // Update dots
    document.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentCard);
    });

    // Update nav buttons
    document.getElementById('btn-prev').style.opacity = currentCard === 0 ? '0.2' : '1';
    document.getElementById('btn-prev').style.pointerEvents = currentCard === 0 ? 'none' : 'auto';
    document.getElementById('btn-next').style.opacity = currentCard === totalCards - 1 ? '0.2' : '1';
    document.getElementById('btn-next').style.pointerEvents = currentCard === totalCards - 1 ? 'none' : 'auto';

    // Hide swipe hint after first navigation
    if (currentCard > 0) {
      const hint = document.getElementById('swipe-hint');
      if (hint) hint.style.display = 'none';
    }
  }

  function animateCard(index) {
    // Hide all cards, show current
    const wrappers = document.querySelectorAll('.card-wrapper');
    wrappers.forEach((w, i) => {
      w.style.display = i === index ? 'flex' : 'none';
    });

    // Animate current card
    if (wrappers[index]) {
      const card = wrappers[index].querySelector('.card');
      if (card) {
        card.style.animation = 'none';
        card.offsetHeight;
        card.style.animation = 'cardEnter 0.4s ease-out';
      }
      // Scroll to top of card
      wrappers[index].scrollTop = 0;
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
