// Twitter/X Likes Remover - Safe & Simple
// Usage: Open twitter.com/YOUR_USERNAME/likes → Press F12 → Paste this → Enter

(async function() {
  const wait = ms => new Promise(r => setTimeout(r, ms));
  let total = 0;
  let empty = 0;
  
  // Rate limit detection
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const res = await originalFetch(...args);
    if (res.status === 429) {
      console.warn('pausing 2 minutes...');
      await wait(120000);
    }
    return res;
  };



  while (empty < 5) {
    const buttons = Array.from(
      document.querySelectorAll('button[data-testid="unlike"]')
    ).filter(btn => btn.offsetParent !== null);

    if (buttons.length === 0) {
      empty++;
      console.log(`No likes found (${empty}/5)`);
      window.scrollTo(0, document.body.scrollHeight);
      await wait(3000);
      continue;
    }

    empty = 0;
  

    for (let i = 0; i < Math.min(buttons.length, 10); i++) {
      buttons[i].scrollIntoView({ behavior: 'smooth', block: 'center' });
      await wait(800);
      buttons[i].click();
      total++;
     
      await wait(2000);
    }

    await wait(5000);
    window.scrollTo(0, document.body.scrollHeight);
    await wait(3000);
  }

})();
