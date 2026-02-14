/**
 * X (Twitter) Safe Likes Remover
 * -----------------------------
 * This script automates unliking posts on X.
 * It includes rate-limit detection and human-like delays.
 * * Instructions: 
 * 1. Open your Likes tab on X.
 * 2. Open Console .
 * 3. Paste and Enter.
 */

(async function safeRemoveLikes() {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  let totalRemoved = 0;
  let noProgressRounds = 0;

  console.log(" Safe Like Remover started...");

  let rateLimited = false;
  const originalFetch = window.fetch;
  
  // Monitor for Rate Limit (429) errors from X servers
  window.fetch = async (...args) => {
    const res = await originalFetch(...args);
    if (res.status === 429) {
      rateLimited = true;
      console.log(" Rate limit detected (429). Pausing for 90s...");
    }
    return res;
  };

  function findLikeButtons() {
    // Selects only the 'Unlike' buttons (already liked posts)
    return Array.from(document.querySelectorAll('button[data-testid="unlike"]'));
  }

  while (true) {
    if (rateLimited) {
      await delay(90000); // Wait 90 seconds
      rateLimited = false;
      console.log(" Resuming operations...");
    }

    let buttons = findLikeButtons();
    let removedThisRound = 0;

    for (const btn of buttons) {
      if (rateLimited) break;

      try {
        // Smoothly scroll to the button to mimic human interaction
        btn.scrollIntoView({ behavior: "smooth", block: "center" });
        await delay(500); 
        
        btn.click();
        removedThisRound++;
        totalRemoved++;

        // 1.5s delay between each action to prevent account flagging
        await delay(1500);
      } catch (e) {
        console.error(" Error interacting with button:", e);
      }
    }

    console.log(` Current Session Total: ${totalRemoved}`);

    await delay(3000);

    // Scroll down to trigger X's lazy loading for more likes
    window.scrollTo(0, document.body.scrollHeight);
    await delay(4000);

    // Stop logic: If no buttons found for 8 consecutive scroll attempts
    if (removedThisRound === 0) {
      noProgressRounds++;
    } else {
      noProgressRounds = 0;
    }

    if (noProgressRounds >= 8) {
      console.log(" Finished! No more likes found or reached end of list.");
      break;
    }
  }

  console.log(` Operation Complete. Total Unliked: ${totalRemoved}`);
})();
