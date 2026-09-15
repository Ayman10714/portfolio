# Mohd Ayman Ansari — Portfolio

Voxel/Minecraft-themed portfolio built in React + TypeScript + Vite + framer-motion,
following the hero / marquee / projects / CTA build order from your guide, wired up
with your resume data (skills, projects, contact links).

## 1. Install and run

```bash
cd ayman-portfolio
npm install
npm run dev
```

Open the printed localhost URL. Everything works right away — the site just shows
gray placeholder boxes where images belong until you drop those in (step 2).

## 2. Generate the 5 images (do this once)

Use an image model (Gemini "Nano Banana", GPT image, Midjourney) with these prompts,
then save each result into the `public/` folder with the **exact filename** shown —
the code already points at these paths.

| File to save in `public/` | What to generate |
|---|---|
| `transparent-base.png` | Your voxel avatar, no flame. Upload a real photo of yourself and use this prompt: *"Using the uploaded photo as the exact facial reference, recreate this person's real face shape, jawline, and proportions precisely — do not slim, narrow, or idealize the face. Preserve all real facial hair, hairstyle texture, and hair volume exactly as shown, rendered in voxel/block form. Style: voxel block art, [your outfit], hood down, facing the camera directly, centered composition, plain warm-gray background, soft studio lighting, no text, no logos."* Then remove the background (see step 3) and re-export as a transparent PNG. |
| `transparent-flame.png` | Same avatar with the cyan-flame reveal effect: *"Keep this exact image completely unchanged — same face, jawline, facial hair, sunglasses/hoodie, hair, pose, background, voxel style. Add intense cyan and electric-blue flame/ember effects made of small glowing voxel blocks, rising from the shoulders and engulfing the head and hair. Make the eyes glow bright cyan-white. Scatter small floating cube particles in cyan/blue/orange. Keep the flame cool cyan-blue, not orange."* Remove the background the same way. |
| `nether-portal-nobg.png` | *"A Minecraft nether portal frame made of obsidian blocks, realistic voxel/blocky 3D style. Rectangular portal shape, glowing purple/violet portal energy swirling inside. Obsidian texture with purple undertones. Plain white background, no text, no logos."* Remove background. |
| `enchantedbook.png` | *"A Minecraft enchanting table with an open enchanted book resting on top, realistic voxel/blocky 3D style. Pages glow magenta-purple, faint magical sparkles. Plain white background, no text, no logos."* Remove background. |
| `llama.png` | *"A Minecraft llama, cream/white wool, realistic voxel/blocky 3D style, sitting pose, facing the camera. Plain white background, no text, no logos."* Remove background. |
| `night-sky.png` | *"A Minecraft-style voxel landscape at night, wide panoramic view, snow-dusted mountains, a winding river valley, pine trees, distant village silhouettes. Dark navy sky, stars, one glowing full moon. Blocky voxel style, wide aspect ratio, no text, no logos."* Background can stay as-is (it's the full backdrop). |
| `cloud.png` | Any small voxel cloud PNG with a transparent background — used as the floating decoration in the Projects section. |

## 3. Remove backgrounds

For every asset above except the night sky, you need a transparent PNG. Easiest path —
hand this exact instruction to a coding agent (Claude Code, Cursor, etc.) once you have
the raw generated image:

> Write and run a Python script using the `rembg` library to remove the background from
> `<filename>.png` and save the output as `<filename>` with a transparent alpha channel.
> Install `rembg` (and `onnxruntime`; fall back to `pip install rembg[cpu] --break-system-packages`
> if needed) if not already installed, then run it on the file in the current directory.

## 4. Add your resume PDF

Drop your resume file into `public/` as `Mohd_Ayman_Ansari_Resume.pdf` — the "View Resume"
button in the hero already links to and downloads that exact path.

## 5. Build order recap

1. `npm install`, confirm `npm run dev` renders the layout with placeholders.
2. Generate + background-remove the 6 images above, drop into `public/`.
3. Add your resume PDF into `public/`.
4. Edit `src/data/content.ts` any time you add/change a project or contact link —
   nothing else needs to change, the grid and marquees read from that file.
5. Deploy: `npm run build`, then deploy the `dist/` folder to Vercel, Netlify, or GitHub Pages.

## File map

```
src/
  App.tsx                 - stacks Hero → Marquee → Projects → Marquee → CTA
  data/content.ts         - all your resume-derived content lives here
  components/
    Hero.tsx / .css       - spotlight mouse-reveal avatar, word-reveal headline, CTA button
    Marquee.tsx / .css    - scrolling skill rows with portal frame image
    FeaturedProjects.tsx / .css - project grid, parallax clouds, view more/less
    MagicCard.tsx / .css  - shared mouse-tracked glow card (used by projects + CTA)
    CTASection.tsx / .css - closing parallax section with contact links
```
