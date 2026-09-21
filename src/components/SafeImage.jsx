import { useState } from 'react';
import { FALLBACK_IMAGE } from '../data/images.js';

/*
 * SafeImage — never shows a broken browser image.
 * If the source fails to load (missing file, bad URL), it swaps to a
 * clean branded Mirantar placeholder instead.
 */
export default function SafeImage({ src, alt = '', fallbackSrc = FALLBACK_IMAGE, ...rest }) {
  const [current, setCurrent] = useState(src);
  const [failed, setFailed] = useState(false);

  // If the configured src itself changes, retry it.
  if (current !== src && !failed) setCurrent(src);

  return (
    <img
      src={failed ? fallbackSrc : current}
      alt={alt}
      onError={() => {
        if (!failed) {
          setFailed(true);
          setCurrent(fallbackSrc);
        }
      }}
      {...rest}
    />
  );
}
