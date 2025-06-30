# Roman Bust Dance Scene Replacement Ticket

Always start with the agent read me and the agent star guide create a ticket related to replacing the dance area in the firefly scene. Winnie replace it with a full screen Roman style bust and in the center of the bus is the Chinese symbol for dance that's glowing

### Title

**[Feature]**: Replace Firefly Dance Area with Full-Screen Roman Bust and Glowing Chinese Dance Symbol

### Description

- **User Story**: As a user exploring the site, I want to see a stunning Roman-style bust with a glowing Chinese dance symbol instead of the current firefly scene, so that I experience a more dramatic and visually striking representation of the dance theme.

- **Problem Statement**: The current dance area uses a firefly scene that, while aesthetically pleasing, doesn't provide the dramatic visual impact and cultural fusion that could better represent the artistic vision. The fireflies lack the monumental presence and symbolic depth that a Roman bust with Chinese cultural elements could provide.

- **Proposed Solution**: Replace the existing Three.js firefly scene with a full-screen Roman-style bust ("La Divina Techno") featuring:
  - A large-scale 3D Roman/Greco-Roman bust model
  - Chrome/marble material with physical-based rendering
  - A glowing Chinese dance symbol (舞) positioned at the center of the bust's chest
  - Starfield background to create an ethereal atmosphere
  - Subtle floating animation and rotation
  - Post-processing effects for bloom and glow
  - Music-reactive elements that respond to audio analysis
  - Proper lighting setup with rim lights and spotlights

### Acceptance Criteria

- [ ] Replace FirefliesScene component with new RomanBustScene component
- [ ] Implement Three.js scene with starfield background (dark space theme)
- [ ] Load and render a 3D Roman/Greco-Roman bust model (GLB/OBJ format)
- [ ] Apply chrome/marble material with high metalness, low roughness, and clearcoat
- [ ] Create glowing Chinese dance symbol (舞) as an emissive plane positioned on the bust's chest
- [ ] Implement ethereal lighting setup with ambient, spot, and rim lighting
- [ ] Add subtle floating animation (vertical sine wave motion) and slow rotation
- [ ] Integrate post-processing with UnrealBloomPass for glow effects
- [ ] Maintain audio reactivity by connecting to existing audio analysis system
- [ ] Preserve existing fullscreen, mobile responsive, and expansion behaviors
- [ ] Ensure proper cleanup and performance optimization for the 3D scene
- [ ] Update DanceArea component to use new RomanBustScene instead of FirefliesScene
- [ ] Maintain compatibility with existing audio controls and status indicators

### Technical Implementation Notes

**Scene Setup Requirements:**

- Dark starry background (0x000014)
- 1000+ procedurally generated stars using THREE.Points
- Scene scale optimized for full-screen presentation

**Model and Materials:**

- Support for GLB/OBJ model loading via GLTFLoader
- Physical material with metalness: 0.9, roughness: 0.2, clearcoat: 0.6
- Reflectivity: 1.0 with subtle blue tint (#aaaaff)

**Glow Panel Specifications:**

- PlaneGeometry (1x1.4 ratio) positioned at bust chest
- MeshBasicMaterial with pink/magenta glow (0xff00cc)
- Double-sided, transparent, 0.8 opacity
- Chinese character 舞 rendered as texture or geometry

**Animation System:**

- Continuous Y-axis rotation at 0.001 rad/frame
- Vertical floating motion using Math.sin(time) \* 0.5
- Audio-reactive intensity scaling for glow panel

**Lighting Configuration:**

- AmbientLight: 0x404040, intensity 2
- SpotLight: 0xccccff, intensity 4, positioned at (10,20,10)
- DirectionalLight (rim): 0xff00ff, intensity 2, positioned at (-10,5,5)

### Additional Notes

- **Context**: This replaces the current firefly particle system with a more dramatic and culturally significant visual element that combines Western classical aesthetics with Eastern symbolism
- **Dependencies**:
  - Three.js GLTFLoader for model loading
  - Post-processing composer with UnrealBloomPass
  - Existing audio analysis system integration
  - Roman bust 3D model asset (to be sourced from Sketchfab or similar)
- **Related Tickets**:
  - `dance-area-border-color-ticket.md` - Border styling may need updates for new scene
  - `remove-touch-mouse-firefly-events.md` - Touch interaction system will need adaptation
  - Audio-related tickets for maintaining music reactivity
- **Performance Considerations**: Optimize model polycount and texture sizes for web performance, especially on mobile devices
- **Asset Requirements**: Source appropriate Roman bust 3D model with commercial usage rights
