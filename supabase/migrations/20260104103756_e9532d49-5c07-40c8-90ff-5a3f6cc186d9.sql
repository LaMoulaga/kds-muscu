-- Create storage bucket for progress photos
INSERT INTO storage.buckets (id, name, public) VALUES ('progress-photos', 'progress-photos', true);

-- Create storage policies for progress-photos bucket
CREATE POLICY "Anyone can view progress photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'progress-photos');

CREATE POLICY "Anyone can upload progress photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'progress-photos');

CREATE POLICY "Anyone can update progress photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'progress-photos');

CREATE POLICY "Anyone can delete progress photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'progress-photos');