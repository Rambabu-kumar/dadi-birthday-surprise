# Sandhiya's Birthday Surprise 🎂💗

A lightweight, mobile-first birthday scrapbook made with HTML, CSS, and vanilla JavaScript. Each of the seven surprise sections opens with its own button, so Sandhiya can explore the page one step at a time. No build step, account, or backend is required.

## Add your photographs

The ten photos are already in `assets/images/` and are wired into the gallery:

```text
dadi (1).jpeg
dadi (2).jpeg
dadi (3).jpeg
dadi (4).jpeg
dadi (5).jpeg
dadi (6).jpeg
dadi (7).jpeg
dadi (8).jpeg
dadi (9).jpeg
dadi (10).jpeg
```

Replace a photo in that folder while keeping its filename to update a memory. Images are lazy-loaded and displayed in their original proportions inside the scrapbook frames, so portrait and landscape pictures fit without being cropped; the lightbox displays the full photo.

## Personalize the page

- Edit the `memories` array near the top of `script.js` to change photo captions.
- Edit the `birthdayMessage` template string in `script.js` to update the letter.
- Edit the `quizQuestions` array in `script.js` to change the questions or answers.
- Change the page text and design in `index.html` and `style.css` as you like.
- The **Play Tune** button plays a short, original melody synthesized in the browser. It starts only after the visitor presses the button; no copyrighted song or audio download is used.

## Test locally in VS Code

1. Open this folder in VS Code.
2. Add the photographs to `assets/images/`.
3. Open `index.html` in a browser. For convenient live reload, you can use the VS Code **Live Server** extension, then choose **Open with Live Server** from the file's context menu.
4. Test each section's **Next** button, memory lightbox (including Escape and arrow keys), birthday letter, candle button, quiz, birthday cheer button, and music toggle. Later surprises stay hidden until the previous section's button is pressed. Check at 360px, 390px, 430px, and desktop widths using browser responsive design mode.

The site is static and can also be previewed by opening `index.html` directly. A local HTTP server is recommended for a closer match to deployment behavior.

## Publish free with GitHub Pages

1. Create a new public GitHub repository (for example, `sandhiya-birthday`) and upload the contents of this folder: `index.html`, `style.css`, `script.js`, `README.md`, and `assets/`.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**, choose the `main` branch and `/ (root)`, then save.
4. Wait for GitHub Pages to publish. The repository's Pages screen will show the website URL, usually `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.
5. Open the published URL on your phone and verify that all ten photos load.

## Share on WhatsApp

Copy the published GitHub Pages URL and send it in a WhatsApp chat with Sandhiya. A short note such as “Dadi Ji, I made a little birthday surprise for you 💗 Tap to open 🎁” is a sweet way to introduce it.
