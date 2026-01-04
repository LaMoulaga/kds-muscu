import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Camera, Upload, Trash2, Calendar, Scale, X, ChevronLeft, ChevronRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ProgressPhoto {
  id: string;
  photo_url: string;
  photo_date: string;
  notes: string | null;
  weight_at_time: number | null;
  created_at: string;
}

export function PhotosTab() {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<ProgressPhoto | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPhotoDate, setNewPhotoDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [newPhotoNotes, setNewPhotoNotes] = useState("");
  const [newPhotoWeight, setNewPhotoWeight] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from("progress_photos")
      .select("*")
      .order("photo_date", { ascending: false });

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setPhotos(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `photos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("progress-photos")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Erreur upload", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("progress-photos")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase
      .from("progress_photos")
      .insert({
        photo_url: publicUrl,
        photo_date: newPhotoDate,
        notes: newPhotoNotes || null,
        weight_at_time: newPhotoWeight ? parseFloat(newPhotoWeight) : null,
      });

    if (insertError) {
      toast({ title: "Erreur", description: insertError.message, variant: "destructive" });
    } else {
      toast({ title: "Photo ajoutée ! 📸" });
      setIsAddDialogOpen(false);
      setNewPhotoNotes("");
      setNewPhotoWeight("");
      fetchPhotos();
    }
    setUploading(false);
  };

  const deletePhoto = async (photo: ProgressPhoto) => {
    // Extract file path from URL
    const urlParts = photo.photo_url.split("/");
    const filePath = urlParts.slice(-2).join("/");

    await supabase.storage.from("progress-photos").remove([filePath]);
    
    const { error } = await supabase
      .from("progress_photos")
      .delete()
      .eq("id", photo.id);

    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Photo supprimée" });
      setSelectedPhoto(null);
      fetchPhotos();
    }
  };

  const navigatePhoto = (direction: "prev" | "next") => {
    if (!selectedPhoto) return;
    const currentIndex = photos.findIndex((p) => p.id === selectedPhoto.id);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < photos.length) {
      setSelectedPhoto(photos[newIndex]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-display tracking-wider mb-2">
            📸 <span className="text-gradient">PHOTOS</span> PROGRESSION
          </h2>
          <p className="text-muted-foreground">Visualisez votre transformation</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary hover:opacity-90">
              <Camera className="w-5 h-5 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl">Nouvelle Photo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm text-muted-foreground">Date</label>
                <Input
                  type="date"
                  value={newPhotoDate}
                  onChange={(e) => setNewPhotoDate(e.target.value)}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Poids (optionnel)</label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="75.5"
                  value={newPhotoWeight}
                  onChange={(e) => setNewPhotoWeight(e.target.value)}
                  className="bg-muted/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Notes (optionnel)</label>
                <Textarea
                  placeholder="Ex: Fin de sèche, début prise de masse..."
                  value={newPhotoNotes}
                  onChange={(e) => setNewPhotoNotes(e.target.value)}
                  className="bg-muted/50"
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                {uploading ? (
                  "Upload en cours..."
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Sélectionner une photo
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      {photos.length > 0 && (
        <div className="glass rounded-2xl p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-display text-primary">{photos.length}</p>
            <p className="text-sm text-muted-foreground">Photos</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-display text-primary">
              {photos[0]?.photo_date ? format(parseISO(photos[0].photo_date), "MMM yyyy", { locale: fr }) : "-"}
            </p>
            <p className="text-sm text-muted-foreground">Dernière photo</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-display text-primary">
              {photos[photos.length - 1]?.photo_date ? format(parseISO(photos[photos.length - 1].photo_date), "MMM yyyy", { locale: fr }) : "-"}
            </p>
            <p className="text-sm text-muted-foreground">Première photo</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-display text-primary">
              {photos.filter(p => p.weight_at_time).length > 1 
                ? `${((photos.find(p => p.weight_at_time)?.weight_at_time || 0) - (photos.filter(p => p.weight_at_time).slice(-1)[0]?.weight_at_time || 0)).toFixed(1)} kg`
                : "-"
              }
            </p>
            <p className="text-sm text-muted-foreground">Évolution</p>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Chargement...</div>
      ) : photos.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-display text-2xl mb-2">Aucune photo</h3>
          <p className="text-muted-foreground mb-4">Commencez à documenter votre progression</p>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gradient-primary hover:opacity-90">
            <Camera className="w-5 h-5 mr-2" />
            Ajouter ma première photo
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative group cursor-pointer glass rounded-xl overflow-hidden aspect-[3/4]"
              onClick={() => setSelectedPhoto(photo)}
            >
              <img
                src={photo.photo_url}
                alt={`Progression ${photo.photo_date}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-white">
                  {format(parseISO(photo.photo_date), "d MMM yyyy", { locale: fr })}
                </p>
                {photo.weight_at_time && (
                  <p className="text-xs text-white/80">{photo.weight_at_time} kg</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setSelectedPhoto(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); navigatePhoto("prev"); }}
            disabled={photos.findIndex((p) => p.id === selectedPhoto.id) === 0}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 disabled:opacity-30"
            onClick={(e) => { e.stopPropagation(); navigatePhoto("next"); }}
            disabled={photos.findIndex((p) => p.id === selectedPhoto.id) === photos.length - 1}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="max-w-4xl max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.photo_url}
              alt={`Progression ${selectedPhoto.photo_date}`}
              className="max-h-[70vh] object-contain rounded-xl"
            />
            <div className="mt-4 glass rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{format(parseISO(selectedPhoto.photo_date), "d MMMM yyyy", { locale: fr })}</span>
                  </div>
                  {selectedPhoto.weight_at_time && (
                    <div className="flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary" />
                      <span>{selectedPhoto.weight_at_time} kg</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/20"
                  onClick={() => deletePhoto(selectedPhoto)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
              {selectedPhoto.notes && (
                <p className="mt-2 text-muted-foreground">{selectedPhoto.notes}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
