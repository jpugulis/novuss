"use client";

import { motion } from "framer-motion";
import { Camera, Upload, X, Play, ImageIcon, MessageCircle, Send } from "lucide-react";
import { galleryImages } from "@/lib/tournament-data";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "memes" | "videos">("photos");
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  const memes = [
    { id: 1, title: "Kad Rēpelis atkal uzvar", placeholder: true },
    { id: 2, title: "Dzintis reakcija", placeholder: true },
    { id: 3, title: "Novusa vakars 3am", placeholder: true },
  ];

  const addComment = (imageKey: string) => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: commentAuthor,
      text: newComment,
      timestamp: new Date().toLocaleDateString('lv-LV'),
    };
    
    setComments(prev => ({
      ...prev,
      [imageKey]: [...(prev[imageKey] || []), comment],
    }));
    setNewComment("");
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Atmiņas</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">GALERIJA</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mb-8"
        >
          {[
            { id: "photos", label: "Foto", icon: ImageIcon },
            { id: "memes", label: "MEMES", icon: Camera },
            { id: "videos", label: "Video", icon: Play },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Photos Grid */}
        {activeTab === "photos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border border-border"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-foreground font-medium text-sm">{image.caption}</p>
                  <p className="text-muted-foreground text-xs">{image.year}</p>
                  {comments[image.src]?.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                      <MessageCircle className="w-3 h-3" />
                      {comments[image.src].length} komentāri
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Upload placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Pievieno foto
              </p>
            </motion.div>
          </div>
        )}

        {/* Memes Grid */}
        {activeTab === "memes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-xl bg-card border border-border flex flex-col items-center justify-center gap-3"
              >
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-3xl">😂</span>
                </div>
                <p className="text-sm text-muted-foreground">{meme.title}</p>
                <span className="text-xs text-primary">Drīzumā...</span>
              </motion.div>
            ))}

            {/* Upload meme */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Augšupielādē MEME
              </p>
            </motion.div>
          </div>
        )}

        {/* Videos */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video rounded-xl bg-card border border-border flex flex-col items-center justify-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
              <p className="text-muted-foreground">Video drīzumā...</p>
            </motion.div>

            {/* Upload video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Augšupielādē video
              </p>
            </motion.div>
          </div>
        )}

        {/* Lightbox with comments */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-start justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-4xl my-8" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors z-10"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.caption}
                width={1200}
                height={800}
                className="w-full object-contain rounded-xl"
              />
              
              <div className="mt-4 p-4 bg-card rounded-xl border border-border">
                <h4 className="font-bold text-foreground mb-2">{selectedImage.caption}</h4>
                
                {/* Comments section */}
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Komentāri</span>
                  </div>
                  
                  {/* Existing comments */}
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {(comments[selectedImage.src] || []).map((comment) => (
                      <div key={comment.id} className="bg-secondary/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm text-foreground">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                      </div>
                    ))}
                    {(!comments[selectedImage.src] || comments[selectedImage.src].length === 0) && (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        Nav komentāru. Pievieno pirmo!
                      </p>
                    )}
                  </div>
                  
                  {/* Add comment form */}
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Tavs vārds..."
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      className="w-full px-3 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Raksti komentāru..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addComment(selectedImage.src)}
                        className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <button
                        onClick={() => addComment(selectedImage.src)}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
