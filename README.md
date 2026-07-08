# Getting Started

1 - npm install
2 - npm run dev


# rodar o projeto pela api no app localmente 
adb -s ZF524WXRF5 reverse tcp:3000 tcp:3000










import { fileURLToPath } from 'url';
import path from 'path';

// recria __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, 'imagens');
const outputPath = path.join(outputDir, req.file.filename);


