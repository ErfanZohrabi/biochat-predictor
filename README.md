# BioEZ Protein Predictor

BioEZ is an AI-powered protein function prediction tool that analyzes protein sequences and structures to predict biological functions, identify domains, and provide relevant scientific literature.

![BioEZ Screenshot](./public/screenshot.png)

## Features

- **AI-Powered Prediction**: Advanced deep learning models for accurate protein function prediction
- **Multi-Format Support**: Upload FASTA, PDB, or raw sequence formats
- **3D Structure Visualization**: Interactive molecular visualization with MolStar
- **Domain Analysis**: Identifies functional domains and binding sites
- **Literature Integration**: Links to relevant scientific papers
- **Biological Database Search**: Integrated search across RCSB PDB, UniProt, NCBI PubMed, and PubChem
- **Smart AI Assistant**: Context-aware chatbot to answer biology questions

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **State Management**: Zustand, React Query
- **UI Components**: Shadcn UI, Tailwind CSS, Framer Motion
- **Visualization**: MolStar for 3D protein structures
- **Testing**: Vitest, React Testing Library
- **PWA Support**: Service workers for offline capability

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm or bun package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/biochat-predictor.git
   cd biochat-predictor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with bun
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys
   ```

4. Start development server:
   ```bash
   npm run dev
   # or with bun
   bun dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Protein Prediction

1. Upload a protein file (FASTA, PDB, or raw sequence)
2. Review the analysis results, including:
   - Predicted function
   - Confidence score
   - Functional domains
   - 3D structure visualization
   - Related scientific literature

### Database Search

1. Navigate to the "Database Search" tab
2. Enter a search term related to proteins, genes, or compounds
3. View results from multiple biological databases:
   - RCSB PDB (protein structures)
   - UniProt (protein sequences)
   - NCBI PubMed (scientific literature)
   - PubChem (chemical compounds)

### AI Assistant

- Click the chat bubble icon to open the AI assistant
- Ask questions about protein biology, prediction results, or bioinformatics concepts
- The assistant provides context-aware responses based on your current activity

## Development

### Project Structure

```
biochat-predictor/
├── public/             # Static assets
├── src/
│   ├── components/     # UI components
│   ├── hooks/          # Custom React hooks
│   ├── lib/
│   │   ├── api.ts      # API integration
│   │   ├── stores/     # Zustand stores
│   │   └── utils.ts    # Utility functions
│   ├── pages/          # Top-level pages
│   └── main.tsx        # Entry point
├── .env.example        # Environment variables template
├── vite.config.ts      # Vite configuration
└── package.json        # Dependencies
```

### Testing

Run the test suite with:

```bash
npm test
```

For coverage report:

```bash
npm run test:coverage
```

### Building for Production

```bash
npm run build
```

The optimized build will be available in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- MolStar - for 3D molecular visualization
- Shadcn UI - for beautiful UI components
- The bioinformatics community for their invaluable resources


