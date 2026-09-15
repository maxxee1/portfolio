"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/** Comandos que la terminal "escribe" en bucle. Decorativos y cortos: caben en la barra
 *  y no ejecutan nada. Tema pentesting / hacking. */
const COMMANDS = [
  "nmap -sV 10.0.0.0/24",
  "hydra -L users.txt ssh",
  "arpspoof -t victim gw",
  "tcpdump -i eth0 -w cap",
  "wireshark cap.pcap",
  "sqlmap -u target --dbs",
  "msfconsole -q",
  "aircrack-ng handshake",
  "john --wordlist hash.txt",
] as const;

const TYPE_MS = 70;
const HOLD_MS = 1600;

/** Mini terminal de adorno en la cabecera de la barra lateral. */
export function SidebarTerminal() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  // Con movimiento reducido queda un comando fijo, sin escribir.
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const command = COMMANDS[index];
    const done = typed.length === command.length;
    const timer = setTimeout(
      () => {
        if (done) {
          setIndex((value) => (value + 1) % COMMANDS.length);
          setTyped("");
        } else {
          setTyped(command.slice(0, typed.length + 1));
        }
      },
      done ? HOLD_MS : TYPE_MS,
    );
    return () => clearTimeout(timer);
  }, [index, typed, reduceMotion]);

  const previous = COMMANDS[(index + COMMANDS.length - 1) % COMMANDS.length];
  const current = reduceMotion ? COMMANDS[index] : typed;

  return (
    <div aria-hidden className="bg-hero overflow-hidden rounded-xl">
      <div className="flex items-center gap-1.5 border-b border-hero-ring/25 px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[10px] text-hero-muted">zsh</span>
      </div>
      <div className="px-3 py-2 font-mono text-[11px] leading-[18px]">
        <p className="truncate text-hero-muted opacity-70">
          <span className="text-hero-str">$</span> {previous}
        </p>
        <p className="truncate text-hero-text">
          <span className="text-hero-str">$</span> {current}
          <span className="ml-px inline-block h-3 w-1.5 translate-y-0.5 animate-caret bg-hero-str" />
        </p>
      </div>
    </div>
  );
}
