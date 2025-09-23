import { optimize } from 'svgo';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');

  // Crear carpeta optimized si no existe
  const optimizedDir = path.join(publicDir, 'optimized');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  // Optimizar SVGs
  const svgFiles = fs.readdirSync(imagesDir).filter(file => file.endsWith('.svg'));
  for (const file of svgFiles) {
    const filePath = path.join(imagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const result = optimize(content, { path: filePath, multipass: true });
    fs.writeFileSync(path.join(optimizedDir, file), result.data);
  }

  // Optimizar PNG/JPG con Sharp
  const rasterFiles = fs
    .readdirSync(imagesDir)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file));

  for (const file of rasterFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(optimizedDir, file);

    await sharp(inputPath)
      .resize({ width: 1920 }) // ejemplo de resize
      .toFile(outputPath);
  }

  console.log('✅ Images optimized successfully');
}

optimizeImages().catch(console.error);
