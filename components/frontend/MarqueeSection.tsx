"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface CredentialItem {
  _id?: string;
  title: string;
  issuer?: string;
  date?: string;
  imageUrl?: string;
}

interface MarqueeProps {
  certifications: CredentialItem[];
  achievements: CredentialItem[];
}

const codingProfiles = [
  { name: "LeetCode", handle: "@mynul47", href: "https://leetcode.com/u/mynul47/" },
  { name: "Codeforces", handle: "Sakil470004", href: "https://codeforces.com/profile/Sakil470004" },
  { name: "HackerRank", handle: "@mynul_sakil", href: "https://www.hackerrank.com/profile/mynul_sakil" },
];

export default function MarqueeSection({ certifications, achievements }: MarqueeProps) {
  const items = [...(certifications || []), ...(achievements || [])];
  if (!items.length) return null;

  return (
    <section className="py-20 bg-page border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
              Education &amp; Credentials
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
              Academic foundation &amp; problem solving.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {codingProfiles.map((profile) => (
              <a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-parchment text-xs font-mono text-ink hover:border-brass hover:text-brass transition-colors"
              >
                <span>{profile.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => {
            const isCert = Boolean(item.issuer);
            return (
              <div
                key={item._id || `${item.title}-${index}`}
                className="p-6 rounded-xl border border-line bg-parchment flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brass">
                    {isCert ? "Certification" : "Credential"}
                  </span>

                  {item.imageUrl && (
                    <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-line bg-surface-subtle my-4">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <h3 className="font-serif text-lg font-medium text-ink mt-2 leading-snug">
                    {item.title}
                  </h3>
                </div>

                {(item.issuer || item.date) && (
                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs text-slate font-mono">
                    <span>{item.issuer}</span>
                    <span>{item.date}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
