export enum AnimationStyle {
  DISNEY_PIXAR = '3D Disney/Pixar Style',
  CLAYMATION = 'Claymation/Stop Motion',
  VECTOR_FLAT = '2D Vector Flat Design',
  WATERCOLOR = 'Watercolor Storybook',
}

export enum CameraMovement {
  STATIC = 'Static Shot',
  SLOW_PAN = 'Slow Pan',
  ZOOM_IN = 'Slow Zoom In',
  DRONE = 'Drone Shot',
  LOW_ANGLE = 'Low Angle',
}

export enum LightingMood {
  SUNNY = 'Sunny Day',
  GOLDEN_HOUR = 'Golden Hour',
  MAGICAL = 'Magical Glowing',
  STUDIO = 'Soft Studio Lighting',
}

export interface PromptFormData {
  storyIdea: string;
  style: AnimationStyle;
  camera: CameraMovement;
  mood: LightingMood;
}

export interface GeneratedResult {
  finalPrompt: string;
  timestamp: number;
}