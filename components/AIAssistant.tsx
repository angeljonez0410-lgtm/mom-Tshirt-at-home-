"use client";

import { useMemo, useState } from "react";
import { aiPlatforms } from "@/data/content";

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");
  const [selected, setSelected] = useState(aiPlatforms[0]?.name || "Claude");
  const [copied, setCopied] = useState(false);

  const selectedPlatform = useMemo(
    () => aiPlatforms.find((platform) => platform.name === selected),
    [selected],
  );

  async function copyTask() {
    if (!task.trim()) return;

    try {
      await navigator.clipboard.writeText(task.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function openPlatform() {
    if (!selectedPlatform) return;
    window.open(selectedPlatform.url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open ? (
        <section className="w-[min(92vw,22rem)] rounded-3xl border border-black/10 bg-white p-4 shadow-2xl shadow-black/15">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#191616]">AI Assistant</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-black/15 px-3 py-1 text-xs font-semibold"
            >
              Close
            </button>
          </div>

          <p className="mt-2 text-xs text-[#4b4545]">
            Write your task, copy it, and launch in Claude, Gemini, ChatGPT, or
            Perplexity.
          </p>

          <label htmlFor="assistant-platform" className="mt-4 block text-xs font-semibold text-[#2c2727]">
            Platform
          </label>
          <select
            id="assistant-platform"
            value={selected}
            onChange={(event) => setSelected(event.target.value)}
            className="mt-1 min-h-11 w-full rounded-xl border border-black/15 px-3 text-sm"
          >
            {aiPlatforms.map((platform) => (
              <option key={platform.name} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>

          <label htmlFor="assistant-task" className="mt-3 block text-xs font-semibold text-[#2c2727]">
            Your task
          </label>
          <textarea
            id="assistant-task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            placeholder="Example: Write 5 TikTok hooks for mom T-shirt sellers..."
            className="mt-1 min-h-28 w-full rounded-xl border border-black/15 p-3 text-sm"
          />

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={copyTask}
              className="min-h-11 flex-1 rounded-full border border-black/15 px-4 text-sm font-semibold"
            >
              {copied ? "Copied" : "Copy Task"}
            </button>
            <button
              type="button"
              onClick={openPlatform}
              className="min-h-11 flex-1 rounded-full bg-[#d6ab42] px-4 text-sm font-bold text-black"
            >
              Launch AI
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="min-h-11 rounded-full bg-[#d6ab42] px-5 py-3 text-sm font-bold text-black shadow-lg shadow-black/20"
        >
          Open AI Assistant
        </button>
      )}
    </div>
  );
}
