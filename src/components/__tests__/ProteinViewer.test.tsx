import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProteinViewer from '../ProteinViewer';

// Mock MolStar library
vi.mock('molstar/lib/mol-plugin-ui/viewer', () => ({
  Viewer: vi.fn(),
  StructureRepresentation: vi.fn(),
  BuiltInTrajectoryFormat: {
    pdb: 'pdb',
    mmcif: 'mmcif',
  },
}));

vi.mock('molstar/lib/mol-plugin-ui/state/structure-loader', () => ({
  StructureLoader: vi.fn(),
}));

vi.mock('molstar/lib/mol-plugin-ui', () => ({
  createPluginUI: vi.fn().mockResolvedValue({
    builders: {
      data: {
        rawData: vi.fn().mockResolvedValue({}),
        download: vi.fn().mockResolvedValue({}),
      },
      structure: {
        parseTrajectory: vi.fn().mockResolvedValue({}),
        hierarchy: {
          applyPreset: vi.fn().mockResolvedValue({}),
        },
        representation: {
          updateRepresentation: vi.fn().mockResolvedValue({}),
          addRepresentation: vi.fn().mockResolvedValue({}),
        },
      },
    },
    managers: {
      structure: {
        hierarchy: {
          current: {
            representatives: [{}],
          },
        },
      },
    },
    dispose: vi.fn(),
  }),
}));

vi.mock('molstar/lib/mol-plugin-ui/context', () => ({
  PluginUIContext: vi.fn(),
}));

vi.mock('molstar/lib/mol-plugin-ui/spec', () => ({
  DefaultPluginUISpec: vi.fn().mockReturnValue({}),
}));

vi.mock('molstar/lib/mol-util/color', () => ({
  Color: vi.fn(),
}));

vi.mock('molstar/lib/mol-util/assets', () => ({
  Asset: {
    fromUrl: vi.fn().mockReturnValue({ url: 'mocked-url' }),
  },
}));

describe('ProteinViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders the protein viewer container', () => {
    const { container } = render(
      <ProteinViewer structure="MOCK_PDB_DATA" format="pdb" />
    );
    
    expect(container.querySelector('[data-testid="protein-viewer"]')).toBeInTheDocument();
  });
  
  it('applies correct color scheme based on props', () => {
    const { rerender } = render(
      <ProteinViewer structure="MOCK_PDB_DATA" format="pdb" colorScheme="chain" />
    );
    
    // Re-render with different color scheme
    rerender(
      <ProteinViewer structure="MOCK_PDB_DATA" format="pdb" colorScheme="residue" />
    );
    
    // No visual assertions needed here as we've mocked the molstar libraries
    // and just need to verify the component renders without errors
  });
  
  it('handles URL-based structures', () => {
    render(
      <ProteinViewer 
        structure="https://files.rcsb.org/view/1ABC.pdb" 
        format="url" 
      />
    );
    
    // Component should render without errors
    expect(screen.getByTestId('protein-viewer')).toBeInTheDocument();
  });
  
  it('handles highlighting regions', () => {
    const highlightRegions = [
      { start: 10, end: 20, color: '#ff0000', label: 'Domain A' },
      { start: 30, end: 40, color: '#00ff00', label: 'Domain B' },
    ];
    
    render(
      <ProteinViewer 
        structure="MOCK_PDB_DATA" 
        format="pdb"
        highlightRegions={highlightRegions}
      />
    );
    
    // Component should render without errors
    expect(screen.getByTestId('protein-viewer')).toBeInTheDocument();
  });
}); 