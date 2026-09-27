// Visitor Counter Service using CounterAPI (free, no account needed)
// Docs: https://counterapi.dev

const NAMESPACE = 'darshil-nathwani-portfolio';
const KEY = 'visitors';

const BASE_URL = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`;

/**
 * Increments the visitor count by 1 and returns the new count.
 * Called once per session using sessionStorage to avoid double-counting.
 */
export async function incrementVisitorCount(): Promise<number> {
  try {
    const response = await fetch(`${BASE_URL}/up`, { method: 'GET' });
    if (!response.ok) throw new Error('Counter API error');
    const data = await response.json();
    return data.count ?? 0;
  } catch (error) {
    console.error('Visitor counter error:', error);
    return 0;
  }
}

/**
 * Fetches the current visitor count without incrementing.
 */
export async function getVisitorCount(): Promise<number> {
  try {
    const response = await fetch(BASE_URL, { method: 'GET' });
    if (!response.ok) throw new Error('Counter API error');
    const data = await response.json();
    return data.count ?? 0;
  } catch (error) {
    console.error('Visitor counter error:', error);
    return 0;
  }
}
