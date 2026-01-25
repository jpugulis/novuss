"use client";

import { motion } from "framer-motion";
import { MessageSquare, Quote, ChevronDown, MessageCircle, Send } from "lucide-react";
import { seasons } from "@/lib/tournament-data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Comment {
  id: number;
  author: string;
  text: string;
  timestamp: string;
}

export function CommentarySection() {
  const [expandedYear, setExpandedYear] = useState<number | null>(2025);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [newComment, setNewComment] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("");

  const addComment = (year: number) => {
    if (!newComment.trim() || !commentAuthor.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      author: commentAuthor,
      text: newComment,
      timestamp: new Date().toLocaleDateString('lv-LV'),
    };
    
    setComments(prev => ({
      ...prev,
      [year]: [...(prev[year] || []), comment],
    }));
    setNewComment("");
  };

  return (
    <section id="commentary" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-4">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sezonas analīze</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">APSKATNIEKA</span>
            <br />
            <span className="text-primary">KOMENTĀRS</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {seasons.map((season, index) => (
            <motion.div
              key={season.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setExpandedYear(expandedYear === season.year ? null : season.year)}
                className="w-full p-5 flex items-center justify-between hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="font-bold text-primary">{season.year}</span>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-foreground">{season.year}. gada sezona</h3>
                    <p className="text-sm text-muted-foreground">
                      Čempions: {season.players[0].name} ({season.players[0].top8} TOP8 punkti)
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground transition-transform duration-300",
                    expandedYear === season.year && "rotate-180"
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  expandedYear === season.year ? "max-h-[2000px]" : "max-h-0"
                )}
              >
                <div className="p-5 pt-0 border-t border-border">
                  {/* Season images if available */}
                  {season.images && season.images.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-6">
                      {season.images.map((img, imgIndex) => (
                        <div key={imgIndex} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border">
                          <Image
                            src={img.src || "/placeholder.svg"}
                            alt={img.caption}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
                            <p className="text-sm text-foreground font-medium">{img.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="relative bg-secondary/50 rounded-xl p-6 mt-4">
                    <Quote className="absolute top-4 left-4 w-8 h-8 text-primary/20" />
                    <div className="relative z-10 pl-8">
                      <p className="text-foreground whitespace-pre-line leading-relaxed">
                        {season.comment}
                      </p>
                    </div>
                    <Quote className="absolute bottom-4 right-4 w-8 h-8 text-primary/20 rotate-180" />
                  </div>

                  {/* Comments section */}
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <MessageCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Komentāri par sezonu ({comments[season.year]?.length || 0})
                      </span>
                    </div>
                    
                    {/* Existing comments */}
                    <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                      {(comments[season.year] || []).map((comment) => (
                        <div key={comment.id} className="bg-secondary/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm text-foreground">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{comment.text}</p>
                        </div>
                      ))}
                      {(!comments[season.year] || comments[season.year].length === 0) && (
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
                          placeholder="Raksti savu viedokli par sezonu..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && addComment(season.year)}
                          className="flex-1 px-3 py-2 bg-secondary rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                        <button
                          onClick={() => addComment(season.year)}
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
          ))}
        </div>
      </div>
    </section>
  );
}
