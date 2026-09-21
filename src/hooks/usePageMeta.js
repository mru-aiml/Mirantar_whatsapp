import { useEffect } from 'react';

/* Lightweight per-page SEO (no extra dependencies). */
export function usePageMeta({ title, description, ogTitle, ogDescription } = {}) {
  useEffect(() => {
    if (title) document.title = title;
    const setMeta = (selector, attr, value) => {
      if (!value) return;
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [key, val] = attr.includes('property')
          ? ['property', attr.split('=')[1]]
          : ['name', attr.split('=')[1]];
        el.setAttribute(key, val);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    if (description) {
      setMeta('meta[name="description"]', 'name=description', description);
    }
    if (ogTitle) setMeta('meta[property="og:title"]', 'property=og:title', ogTitle);
    if (ogDescription) setMeta('meta[property="og:description"]', 'property=og:description', ogDescription);
  }, [title, description, ogTitle, ogDescription]);
}
