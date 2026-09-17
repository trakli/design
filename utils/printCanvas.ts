/**
 * Client-side print for an already-rendered HTML element (e.g. a canvas/report
 * body). No backend involved. Clones the element into a top-level portal so no
 * scrollable/positioned ancestor can clip it, then lets `@media print` show only
 * that portal using the app's already-loaded styles.
 */
export function printCanvas(bodyEl: HTMLElement | null | undefined, title: string): void {
  if (!bodyEl || typeof window === 'undefined' || typeof document === 'undefined') return;

  const portal = document.createElement('div');
  portal.className = 'print-canvas-portal';

  const heading = document.createElement('h1');
  heading.textContent = title;
  portal.appendChild(heading);
  portal.appendChild(bodyEl.cloneNode(true));
  document.body.appendChild(portal);

  // A document should print light regardless of the on-screen theme.
  const html = document.documentElement;
  const wasDark = html.classList.contains('dark');
  if (wasDark) html.classList.remove('dark');
  document.body.classList.add('printing-canvas');

  let cleaned = false;
  const cleanup = () => {
    if (cleaned) return;
    cleaned = true;
    document.body.classList.remove('printing-canvas');
    if (wasDark) html.classList.add('dark');
    portal.remove();
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);

  // A tick lets the print classes apply before the dialog opens; the trailing
  // timeout is a safety net for browsers that do not fire afterprint.
  window.setTimeout(() => {
    window.print();
    window.setTimeout(cleanup, 1000);
  }, 50);
}
