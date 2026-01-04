-- Create progress_photos table for storing photo references
CREATE TABLE public.progress_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT NOT NULL,
  photo_date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  weight_at_time NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.progress_photos ENABLE ROW LEVEL SECURITY;

-- Create policy for all access (no auth for now)
CREATE POLICY "Allow all access to progress_photos" 
ON public.progress_photos 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Create app_settings table for storing user preferences
CREATE TABLE public.app_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for all access
CREATE POLICY "Allow all access to app_settings" 
ON public.app_settings 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert default settings
INSERT INTO public.app_settings (setting_key, setting_value) VALUES
  ('target_weight', '85'),
  ('rest_timer_duration', '90'),
  ('sound_enabled', 'true'),
  ('theme', 'dark');

-- Create index for faster queries
CREATE INDEX idx_progress_photos_date ON public.progress_photos(photo_date DESC);
CREATE INDEX idx_app_settings_key ON public.app_settings(setting_key);