"use client";

import { motion } from "framer-motion";
import { Camera, X, Play, ImageIcon, ExternalLink } from "lucide-react";
import { galleryImages } from "@/lib/tournament-data";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "memes" | "videos">("photos");

  const memes = [
    {
      id: 1,
      title: "kad jāizšauj blue lagoon",
      caption: "Instagram reel",
      href: "https://www.instagram.com/reel/DWsa5-5kW5d/?igsh=MWJxeWlmcmxqZXI0dQ==",
      embedSrc: "https://www.instagram.com/reel/DWsa5-5kW5d/embed/captioned/",
    },
  ];

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
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Memes Grid */}
        {activeTab === "memes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                <div className="p-5 border-b border-border flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{meme.title}</h3>
                    <p className="text-sm text-muted-foreground">{meme.caption}</p>
                  </div>
                  <a
                    href={meme.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Instagram
                  </a>
                </div>

                <div className="p-4 flex justify-center bg-secondary/20">
                  <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                    <iframe
                      src={meme.embedSrc}
                      title={meme.title}
                      className="w-full aspect-[9/16]"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </motion.div>
            ))}
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

          </div>
        )}

        {/* Lightbox */}
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
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
