import { useEffect, useRef } from 'react';
import { Viewer, StructureRepresentation, BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-ui/viewer';
import { StructureLoader } from 'molstar/lib/mol-plugin-ui/state/structure-loader';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';
import { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context';
import { DefaultPluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { Color } from 'molstar/lib/mol-util/color';
import { Asset } from 'molstar/lib/mol-util/assets';

interface ProteinViewerProps {
  structure: string;
  format: 'pdb' | 'url';
  colorScheme?: 'chain' | 'residue' | 'element' | 'secondary-structure';
  highlightRegions?: Array<{
    start: number;
    end: number;
    color?: string;
    label?: string;
  }>;
}

const ProteinViewer = ({ 
  structure, 
  format, 
  colorScheme = 'chain', 
  highlightRegions = []
}: ProteinViewerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pluginRef = useRef<PluginUIContext | null>(null);

  // Initialize MolStar viewer
  useEffect(() => {
    let plugin: PluginUIContext | undefined;
    
    const initViewer = async () => {
      if (!containerRef.current) return;
      
      // Cleanup previous instance if it exists
      if (pluginRef.current) {
        pluginRef.current.dispose();
        pluginRef.current = null;
      }
      
      // Initialize new instance with custom spec
      const spec = {
        ...DefaultPluginUISpec(),
        layout: {
          initial: {
            isExpanded: false,
            showControls: false,
            controlsDisplay: 'reactive',
          },
        },
        components: {
          controls: { left: 'none', right: 'none', top: 'none', bottom: 'none' },
        },
      };
      
      plugin = await createPluginUI(containerRef.current, spec);
      pluginRef.current = plugin;
      
      // Load structure
      try {
        if (format === 'pdb') {
          // Load from text data
          const data = await plugin.builders.data.rawData({ data: structure }, { state: { isGhost: false } });
          const trajectory = await plugin.builders.structure.parseTrajectory(data, format as BuiltInTrajectoryFormat);
          await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
        } else {
          // Load from URL
          const asset = Asset.fromUrl(structure);
          const data = await plugin.builders.data.download({ url: asset.url }, { state: { isGhost: false } });
          const extension = structure.split('.').pop()?.toLowerCase() || 'pdb';
          const trajFormat = extension === 'cif' ? 'mmcif' : extension as BuiltInTrajectoryFormat;
          const trajectory = await plugin.builders.structure.parseTrajectory(data, trajFormat);
          await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default');
        }
        
        // Apply color scheme
        const representations = plugin.managers.structure.hierarchy.current.representatives;
        if (representations.length > 0) {
          const component = representations[0];
          
          // Apply color scheme based on user selection
          let colorTheme: string;
          switch (colorScheme) {
            case 'chain':
              colorTheme = 'chain-id';
              break;
            case 'residue':
              colorTheme = 'residue-type';
              break;
            case 'element':
              colorTheme = 'element-symbol';
              break;
            case 'secondary-structure':
              colorTheme = 'secondary-structure';
              break;
            default:
              colorTheme = 'chain-id';
          }
          
          await plugin.builders.structure.representation.updateRepresentation(
            component, 
            { type: 'cartoon', color: colorTheme, size: 'uniform' }
          );
          
          // Add surface representation with transparency
          await plugin.builders.structure.representation.addRepresentation(
            component, 
            { type: 'spacefill', color: colorTheme, size: 'vdw', alpha: 0.3 }
          );
        }
        
        // Apply highlight regions if available
        if (highlightRegions.length > 0 && representations.length > 0) {
          // TODO: Implement region highlighting
        }
        
      } catch (error) {
        console.error('Error loading protein structure:', error);
      }
    };
    
    initViewer();
    
    return () => {
      if (plugin) {
        plugin.dispose();
      }
    };
  }, [structure, format, colorScheme, highlightRegions]);

  return (
    <div 
      ref={containerRef} 
      className="h-full w-full" 
      data-testid="protein-viewer"
    />
  );
};

export default ProteinViewer; 