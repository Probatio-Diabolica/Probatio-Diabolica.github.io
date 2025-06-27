document.addEventListener("DOMContentLoaded", () => {
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");

  const commands = {
    echo: (input) => {
  const parts = input.split(" ");
  parts.shift(); 
  return parts.join(" ");
},
    whoami: () => "Ayush Kaintura",
    "cat interests.txt": () => `
- Open Source Development
- Building cool stuff
- Arch Linux
- Minimalism in design
    `.trim(),
      neofetch: () => `
┌─────────────────────────────────────┐
│ ayush@Web                           │
├─────────────────────────────────────┤
│ OS: Arch Linux                      │
│ Host: Portfolio Terminal            │
│ Distro: Arch BTW                    │
│ Shell: zsh 5.9                      │
│ WM: hyprland                        │
│ Theme: catppuccin-mocha             │
│ Terminal: alacritty                 │
│ Editor: neovim                      │
│ Packages: ∞ (creativity)            │
│ Uptime: Always coding               │
│ Memory: Full of ideas               │
└─────────────────────────────────────┘`.trim(),
    help: () => `
Available commands:
- echo <text>           repeat the given text
- whoami               show current user
- cat interests.txt    display interests
- neofetch            system information
- pwd                 print working directory
- cat resume.txt      show resume summary
- clear               clear terminal
- help                show this help message
 `.trim(),
    pwd: () => "/home/ayush/portfolio",
    "cat resume.txt": () => `
AYUSH KAINTURA
Software Engineering Student

SKILLS:
- C++, Java, Python
- System Programming
- Database Design (Redis-like systems)
- Network Programming
- Language Design & Interpreters
- Open Source Contribution

PROJECTS:
- Violet: Redis-like server in C++
- Puck: Programming language interpreter
- 2Who: Multithreaded chat system

CONTRIBUTIONS:
- Mozilla Firefox (C++/Python)
    `.trim(),
    clear: () => {
      terminalOutput.innerHTML = "";
      return "";
    }
  };

  terminalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const input = terminalInput.value.trim();
      
      if (input === "") {
        terminalInput.value = "";
        return;
      }

      // Add the command to output
      const prompt = document.createElement("div");
      prompt.className = "prompt-line";
      prompt.innerHTML = `<span class="prompt-symbol">$</span> ${input}`;
      terminalOutput.appendChild(prompt);

      // Execute command
      let result;
      if (input.startsWith("echo ")) {
        result = commands.echo(input);
      } else {
        const handler = commands[input];
        result = handler ? handler() : `command not found: ${input}`;
      }
      if (result !== "") {
        const output = document.createElement("pre");
        output.className = "prompt-output";
        output.textContent = result;
        terminalOutput.appendChild(output);
      }

      terminalInput.value = "";
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  const terminalPrompt = document.querySelector('.terminal-prompt');
  if (terminalPrompt) {
    terminalPrompt.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  // Auto-focus on load
  terminalInput.focus();
});