import { ownerEmail, socialLinks } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-black py-12 text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-serif text-2xl">Mom Hustle Tees</p>
          <p className="mt-3 text-sm text-zinc-300">
            Turn creativity into cash from home.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Legal</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href="/privacy" className="hover:text-[#ffd98f]">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-[#ffd98f]">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-[#ffd98f]">
              Contact
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Follow Us</p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="hover:text-[#ffd98f]">
              TikTok
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="hover:text-[#ffd98f]">
              Instagram
            </a>
            <a href={socialLinks.pinterest} target="_blank" rel="noreferrer" className="hover:text-[#ffd98f]">
              Pinterest
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="hover:text-[#ffd98f]">
              Facebook
            </a>
          </div>
          <p className="mt-4 text-sm text-zinc-300">{ownerEmail}</p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-zinc-500">
        © 2026 Mom Hustle Tees. All rights reserved.
      </p>
    </footer>
  );
}
