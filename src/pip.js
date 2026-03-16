import cssText from './pip.css?inline';

function ensureStylesInjected() {
  if (document.getElementById('gumlet-ecommerce-video-styles')) return;

  const style = document.createElement('style');
  style.id = 'gumlet-ecommerce-video-styles';
  style.textContent = cssText;
  document.head.appendChild(style);
}

function buildEmbedSrc(embedSrc) {
  const url = new URL(embedSrc);
  url.searchParams.set('background', 'true');
  return url.toString();
}

function createIframe(embedSrc) {
  const iframe = document.createElement('iframe');
  iframe.loading = 'lazy';
  iframe.title = 'Gumlet video player';
  iframe.src = buildEmbedSrc(embedSrc);
  iframe.referrerPolicy = 'origin';
  iframe.allow = 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;';
  iframe.style.border = 'none';
  return iframe;
}

function parseAspectRatio(value) {
  if (!value || typeof value !== 'string') return null;
  const raw = value.trim();

  const parts = raw.split(/[:/x]/i).map((p) => p.trim()).filter(Boolean);
  if (parts.length !== 2) return null;

  const w = Number(parts[0]);
  const h = Number(parts[1]);
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null;
  return { w, h };
}

function mount(rootEl, options = {}) {
  ensureStylesInjected();

  const embedSrc = options.embedSrc ?? rootEl.dataset.embedSrc;
  const corner = options.corner ?? rootEl.dataset.corner ?? 'bottom-right';
  const aspectRatioRaw = options.aspectRatio ?? rootEl.dataset.aspectRatio ?? '9:16';
  const aspectRatio = parseAspectRatio(aspectRatioRaw) ?? { w: 9, h: 16 };

  if (!embedSrc) {
    throw new Error('[GumletEcommerceVideo] Missing data-embed-src');
  }

  rootEl.classList.add('gumlet-ecommerce-video');

  const pip = document.createElement('div');
  pip.className = 'gumlet-ecommerce-video__pip';
  pip.classList.toggle('is-bottom-left', corner === 'bottom-left');
  pip.classList.toggle('is-bottom-right', corner !== 'bottom-left');
  pip.style.aspectRatio = `${aspectRatio.w} / ${aspectRatio.h}`;

  const close = document.createElement('button');
  close.className = 'gumlet-ecommerce-video__close';
  close.type = 'button';
  close.setAttribute('aria-label', 'Close');
  close.textContent = '✕';

  const ratio = document.createElement('div');
  ratio.className = 'gumlet-ecommerce-video__ratio';

  const iframe = createIframe(embedSrc);
  ratio.appendChild(iframe);

  pip.appendChild(close);
  pip.appendChild(ratio);

  rootEl.replaceChildren();
  rootEl.appendChild(pip);

  function onClose() {
    pip.remove();
  }

  close.addEventListener('click', onClose);

  return {
    destroy() {
      close.removeEventListener('click', onClose);
      pip.remove();
      rootEl.replaceChildren();
    },
  };
}

function scan(selector = '.gumlet-ecommerce-video') {
  const nodes = Array.from(document.querySelectorAll(selector));
  return nodes.map((el) => {
    if (el.__gumletEcommerceVideoInstance) return el.__gumletEcommerceVideoInstance;
    const instance = mount(el);
    el.__gumletEcommerceVideoInstance = instance;
    return instance;
  });
}

const GumletEcommerceVideo = {
  init(rootEl, options) {
    if (!rootEl) throw new Error('[GumletEcommerceVideo] init(rootEl) requires a root element');
    if (rootEl.__gumletEcommerceVideoInstance) return rootEl.__gumletEcommerceVideoInstance;
    const instance = mount(rootEl, options);
    rootEl.__gumletEcommerceVideoInstance = instance;
    return instance;
  },
  scan,
};

if (typeof window !== 'undefined') {
  window.GumletEcommerceVideo = GumletEcommerceVideo;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => scan());
  } else {
    scan();
  }
}

export default GumletEcommerceVideo;
